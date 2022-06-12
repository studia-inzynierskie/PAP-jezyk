import functools
from flask import Blueprint, jsonify, session, g, request
from .model import db, User, UserAchievement


bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.before_app_request
def load_user():
    if 'user_id' in session and session['user_id'] is not None:
        g.user = User.query.get(session['user_id'])
    else:
        g.user = None


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return '', 401
        return view(**kwargs)
    return wrapped_view


@bp.route('/login', methods=('POST',))
def login():
    match request.json:
        case {'username': str() as username, 'password': str() as password}:
            user = User.query.filter(User.name == username).one_or_none()
            if user is None or not user.verify_password(password):
                return ('Invalid credentials', 401)
            else:
                session['user_id'] = user.id
                UserAchievement.grant(user, 'Hello!')
                return '', 200
        case _:
            return 'Invalid request', 400


@bp.route('/logged_in')
def logged_in():
    if g.user is not None:
        return jsonify(True), 200
    else:
        return jsonify(False), 200


@bp.route('/logout')
def logout():
    session['user_id'] = None
    return '', 200 


@bp.route('/register', methods=('POST',))
def register():
    # Rejestrowanie użytkownika:
    match request.json:
        case {'username': str() as username, 'password': str() as password, 'email': str() as email}:
            try:
                old_user = User.query.filter(User.name == username).one_or_none()
                if old_user is not None:
                    return 'Username already taken', 400
                else:
                    new_user = User(name=username, email=email)
                    new_user.password = password
                    db.session.add(new_user)
                    db.session.commit()
                    return '', 200
            except ValueError:
                return 'Invalid username', 400
        case _:
            return 'Invalid request', 400
