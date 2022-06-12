from flask import Blueprint, jsonify
from .model import db, User, Room, UserAchievement
from sqlalchemy import func


bp = Blueprint('leaderboard', __name__, url_prefix='/leaderboard')


@bp.route('/by_level')
def level_leaderboards():
    users = list(User.query.order_by(User.exp.desc(), User.lvl.desc()).all())
    check_leaderboard_achievements(users)
    return jsonify([{'username': user.name, 'score': user.lvl}
                    for user in users]), 200


@bp.route('/by_wins')
def wins_leaderboards():
    users = list(db.session.query(User, func.count(Room.id)).select_from(User).outerjoin(User.wins) \
                      .group_by(User.id, User.name).all())
    check_leaderboard_achievements([u for u, _ in users])
    return jsonify([{'username': user.name, 'score': score}
                    for user, score in users]), 200


@bp.route('/by_achievements')
def achievements_leaderboards():
    users = list(db.session.query(User, func.count(UserAchievement.achievement_id)).select_from(User) \
                      .outerjoin(User.achievements).group_by(User.id, User.name).all())
    check_leaderboard_achievements([u for u, _ in users])
    return jsonify([{'username': user.name, 'score': score}
                    for user, score in users]), 200


def check_leaderboard_achievements(users):
    if len(users) > 0:
        UserAchievement.grant(users[0], 'You simply the best')
        UserAchievement.grant(users[-1], 'You simply the worst')
    if len(users) > 1:
        UserAchievement.grant(users[1], 'Almost there')
    if len(users) > 3:
        UserAchievement.grant(users[3], 'The worst place')
