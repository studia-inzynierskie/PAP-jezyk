from flask import Blueprint, jsonify, request
from .model import db, Game, Room, UserRoom
from sqlalchemy import func


bp = Blueprint('game', __name__, url_prefix='/game')

@bp.route('/')
def all_games():
    games = Game.query.all()
    return jsonify([{'name': game.name, 
                     'description': game.description, 'min_players': game.min_players, 
                     'max_players': game.max_players} for game in games]), 200

@bp.route('/<string:name>/rooms')
def matches(name):
    game = Game.query.filter(Game.name == name).one()
    rooms = db.session.query(Room, func.count(UserRoom.user_id)).select_from(Room).outerjoin(Room.players) \
                      .filter(Room.game_id == game.id).group_by(Room.id) \
                      .having(func.count(UserRoom.user_id) < Room.max_players).all()
    return jsonify([{'name': room.name, 'max_players': room.max_players,
                     'players': players, 'id': room.id} for room, players in rooms]), 200
