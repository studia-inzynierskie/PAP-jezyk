from flask import Blueprint, jsonify, request, g
from .model import db, Room, Game, UserRoom, User, UserAchievement
from .auth import login_required
from random import shuffle
from json import loads, dumps
import functools
from datetime import datetime


bp = Blueprint('room', __name__, url_prefix='/room')


def game_required(view):
    @functools.wraps(view)
    @login_required
    def wrapped_view(**kwargs):
        if g.user.room is None:
            return 'No game found for user', 400
        g.room = Room.query.get(g.user.room)
        g.game = Game.query.get(g.room.game_id)
        g.iid = UserRoom.query.filter(UserRoom.room_id == g.room.id).filter(UserRoom.user_id == g.user.id).one().internal_id
        return view(**kwargs)
    return wrapped_view


@bp.route('/', methods=('POST', 'GET'))
@game_required
def index():
    if request.method == 'POST':
        match request.json:
            case str() as move:
                if move not in valid_moves(g):
                    return 'Invalid move', 400
                match g.game.name:
                    case 'Wojna':
                        card = move.split()[0]
                        state = loads(g.room.state)
                        state['players'][g.iid]['hand'].remove(card)
                        state['players'][g.iid]['choice'] = card
                        state['players'][g.iid]['seen'] = False
                        state['players'][g.iid-1]['seen'] = False
                    case _:
                        raise ValueError(g.game)
                g.room.state = dumps(state)
            case _:
                return 'Invalid request', 400
    match g.game.name:
        case 'Wojna':
            state = loads(g.room.state)
            opponent = User.query.join(User.history).filter(UserRoom.room_id == g.room.id).filter(User.id != g.user.id).one_or_none()
            if not state['state'] == 'finished' and all(p['seen'] and p['choice'] is not None for p in state['players']):
                if compare_cards(state['players'][0]['choice'], state['players'][1]['choice']):
                    state['players'][1]['points'] += 1
                else:
                    state['players'][0]['points'] += 1
                state['players'][0]['choice'] = None
                state['players'][1]['choice'] = None
                state['players'][0]['seen'] = False
                state['players'][1]['seen'] = False
            if not state['state'] == 'finished' and all(len(p['hand']) == 0 and p['choice'] is None for p in state['players']):
                state['state'] = 'finished'
                if state['players'][g.iid]['points'] > state['players'][g.iid - 1]['points']:
                    g.room.winner_id = g.user.id
                else:
                    g.room.winner_id = opponent.id
                check_endgame_achievements(g.user, g.room.winner_id)
                if opponent is not None:
                    check_endgame_achievements(opponent, g.room.winner_id)
            state['players'][g.iid]['seen'] = True
            g.room.state = dumps(state)
            db.session.commit()
            oiid = (g.iid + 1) % 2
            both_chosen = all(p['choice'] is not None for p in state['players'])
            return jsonify({
                'cards': {f'H{g.iid}': {'shown': state['players'][g.iid]['hand'],
                                        'hidden': 0, 'draggable': True, 'name': f'{g.user.name}\'s hand'},
                          f'T{g.iid}': {'shown': [state['players'][g.iid]['choice']]
                                                 if state['players'][g.iid]['choice'] is not None else [],
                                        'hidden': 0, 'draggable': False, 'name': f'{g.user.name}\'s choice'},
                          f'H{oiid}': {'shown': [], 'hidden': len(state['players'][oiid]['hand']),
                                       'draggabe': False,
                                       'name': f'{opponent.name}\'s hand' if opponent is not None else 'opponent\'s hand'},
                          f'T{oiid}': {'shown': [state['players'][oiid]['choice']] if both_chosen else [],
                                       'hidden': 0 if both_chosen else 1 if state['players'][oiid]['choice'] is not None else 0,
                                       'draggable': False,
                                       'name': f'{opponent.name}\'s choice' if opponent is not None else 'opponent\'s choice'}},
                'moves': valid_moves(g)
            }), 200
        case _:
            raise ValueError(g.game)


def compare_cards(a, b):
    vals = list('23456789TQKA')
    cols = list('CDHS')
    if vals.index(a[0]) < vals.index(b[0]): return True
    elif vals.index(a[0]) > vals.index(b[0]): return False
    elif cols.index(a[1]) < cols.index(b[1]): return True
    else: return False


def valid_moves(g):
    match g.game.name:
        case 'Wojna':
            state = loads(g.room.state)
            if state['state'] == 'playing' and state['players'][g.iid]['choice'] is None:
                return [f'{c} T{g.iid}' for c in state['players'][g.iid]['hand']]
            else:
                return []
        case _:
            raise ValueError(g.game)


def check_endgame_achievements(user, winner_id):
    if user.id == winner_id:
        user.exp += 30
    else:
        user.exp += 10
    while user.exp >= 10 * user.lvl:
        user.exp -= 10 * user.lvl
        user.lvl += 1
    db.session.commit()
    wins = Room.query.join(Room.winner).filter(User.id == user.id).count()
    if wins >= 3:
        UserAchievement.grant(user, 'Well done!')
    if wins >= 20:
        UserAchievement.grant(user, 'Destroyer')
    if datetime.now().hour == 21 and datetime.now().minute == 37:
        UserAchievement.grant(user, 'PAP')
    losses = User.query.join(User.history).filter(User.id == user.id).count() - wins
    if losses >= 6:
        UserAchievement.grant(user, 'Emotional damage')
    print(wins, losses)


@bp.route('/create', methods=('POST',))
@login_required
def create():
    match request.json:
        case {'table_name': str() as room_name, 'max_players': int() as max_players,
              'password': str() as password, 'game_name': str() as game_name}:
            match game_name:
                case 'Wojna':
                    if max_players != 2:
                        return 'Wrong number of players', 401 
                    deck = random_deck()
                    starting_state = dumps({'players': [
                                                {'hand': deck[:11],
                                                 'choice': None,
                                                 'points': 0,
                                                 'seen': False},
                                                {'hand': deck[11:22],
                                                 'choice': None,
                                                 'points': 0,
                                                 'seen': False}],
                                              'state': 'waiting'})
                    game = Game.query.filter(Game.name == 'Wojna').one()
                    if password == '':
                        password = None
                    room = Room(game_id=game.id, name=room_name, password=password, state=starting_state, max_players=2)
                    db.session.add(room)
                    db.session.commit()
                case _:
                    return 'Wrong game name', 404
            db.session.add(UserRoom(user_id=g.user.id, room_id=room.id, internal_id=0))
            if g.user.room is not None:
                leave_room(g.user)
            g.user.room = room.id
            db.session.commit()
            return '', 200
        case _:
            return 'Invalid request', 400


def leave_room(user):
    room = Room.query.get(user.room)
    state = loads(room.state)
    game = Game.query.get(room.game_id)
    match game.name:
        case 'Wojna':
            if state['state'] != 'finished':
                state['state'] = 'finished'
                other = User.query.join(User.current_game).filter(Room.id == room.id).filter(User.id != user.id) \
                                  .one_or_none()
                if other is not None:
                    room.winner_id = other.id
                    u_id = UserRoom.query.filter(UserRoom.user_id == user.id) \
                                         .filter(UserRoom.room_id == room.id).one().internal_id
                    o_id = (u_id - 1) % 2
                    state['players'][o_id]['points'] += len(state['players'][u_id]['hand'])
                    state['players'][u_id]['hand'] = []
                    check_endgame_achievements(user, other.id)
                    check_endgame_achievements(other, other.id)
        case _:
            raise ValueError(game)
    user.room = None
    room.state = dumps(state)
    db.session.commit()


def random_deck():
    deck = [v + c for v in '23456789TKQA' for c in 'DCHS']
    shuffle(deck)
    return deck


@bp.route('/structure')
@login_required
def structure():
    if g.user.room is None:
        return 'No game found for user', 400
    room = Room.query.get(g.user.room)
    game = Game.query.get(room.game_id)
    match game.name:
        case 'Wojna':
            return jsonify({'H0': {'is_deck': False},
                            'H1': {'is_deck': False},
                            'T0': {'is_deck': True},
                            'T1': {'is_deck': True}}), 200
        case _:
            raise ValueError(game)


@bp.route('/join', methods=('POST',))
@login_required
def join():
    match request.json:
        case {'password': str() as password, 'id': int() as id}:
            room = Room.query.get(id)
            if g.user.room == room.id:
                return '', 200
            if room.password is None or room.password == password:
                game = Game.query.get(room.game_id)
                match game.name:
                    case 'Wojna':
                        state = loads(room.state)
                        match state['state']:
                            case 'waiting':
                                if g.user.room is not None:
                                    leave_room(g.user)
                                g.user.room = room.id
                                db.session.add(UserRoom(user_id=g.user.id, room_id=room.id, internal_id=1))
                                state['state'] = 'playing'
                                room.state = dumps(state)
                                db.session.commit()
                                return '', 200
                            case _:
                                return 'Room is full', 402
                    case _:
                        raise ValueError(game)
            else:
                return 'Invalid password', 401
        case _:
            return 'Invalid request', 400
