from flask import Blueprint, jsonify, request, g
from .model import db, User, UserRoom, Room, Game, Achievement, UserAchievement
from .auth import login_required
from sqlalchemy import func


bp = Blueprint('user', __name__, url_prefix='/user')


@bp.route('/profile')
@login_required
def user_profile():
    all_achievements = Achievement.query.all()
    achieved = Achievement.query.join(Achievement.users).filter(UserAchievement.user_id == g.user.id).all()
    achievements = [{'name': a.name, 'description': a.description, 'achieved': a in achieved}
                    for a in all_achievements]
    stats = []
    stats.append({'name': 'Games Played', 'value': UserRoom.query.filter(UserRoom.user_id == g.user.id).count()})
    stats.append({'name': 'Games Won', 'value': Room.query.filter(Room.winner_id == g.user.id).count()})
    stats.append({'name': 'Games Lost', 'value': stats[0]['value'] - stats[1]['value']})
    most_played = Game.query.join(Game.rooms).join(Room.players).filter(UserRoom.user_id == g.user.id) \
                      .group_by(Game.id, Game.name).order_by(func.count(Room.id).desc()).first()
    stats.append({'name': 'Most Played Game',
                  'value': most_played.name if most_played is not None else "N/A"})
    least_played = Game.query.join(Game.rooms).join(Room.players).filter(UserRoom.user_id == g.user.id) \
                      .group_by(Game.id, Game.name).order_by(func.count(Room.id)).first()
    stats.append({'name': 'Least Played Game',
                  'value': least_played.name if most_played is not None else "N/A"})
    return jsonify({
        'username': g.user.name,
        'email': g.user.email,
        'achievements': achievements,
        'stats': stats,
        'exp': g.user.exp,
        'max_exp': g.user.lvl * 10,
        'lvl': g.user.lvl,
    }), 200


@bp.route('/update_email', methods=('POST',))
@login_required
def update_email():
    match request.json:
        case {'email': str() as email}:
            g.user.email = email
            db.session.commit()
            return '', 200
        case _:
            return 'Invalid request', 400


@bp.route('/update_username', methods=('POST',))
@login_required
def update_username():
    match request.json:
        case {'username': str() as username}:
            g.user.name = username
            db.session.commit()
            return '', 200
        case _:
            return 'Invalid request', 400


@bp.route('/update_password', methods=('POST',))
@login_required
def update_password():
    match request.json:
        case {'password': str() as password}:
            g.user.password = password
            db.session.commit()
            return '', 200
        case _:
            return 'Invalid request', 400

