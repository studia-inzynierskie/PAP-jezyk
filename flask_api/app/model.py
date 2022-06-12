from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column('id', db.Integer, primary_key=True)
    _name = db.Column('name', db.String, nullable=False)
    email = db.Column('email', db.String, nullable=False)
    exp = db.Column('exp', db.Integer, default=0)
    lvl = db.Column('lvl', db.Integer, default=1)
    room = db.Column('room', db.Integer, db.ForeignKey('room.id', ondelete='SET NULL', use_alter=True))
    _password = db.Column('password', db.String)
    history = db.relationship('UserRoom', back_populates='user')
    wins = db.relationship('Room', back_populates='winner', foreign_keys='Room.winner_id')
    achievements = db.relationship('UserAchievement', back_populates='user')
    current_game = db.relationship('Room', foreign_keys=room)

    @hybrid_property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        if not (3 <= len(name) <= 20 and sum(1 for c in name if (c.isalnum() or c == '_')) == len(name)):
            raise ValueError(f'Illegal username: {name}')
        else:
            self._name = name
        
    @property
    def password(self):
        raise AttributeError("Can't read password!")

    @password.setter
    def password(self, password):
        self._password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self._password, password)


class Room(db.Model):
    __tablename__ = 'room'
    id = db.Column('id', db.Integer, primary_key = True)
    winner_id = db.Column('winner_id', db.Integer, db.ForeignKey('user.id', ondelete='SET NULL', use_alter=True), default=None)
    game_id = db.Column('game_id', db.Integer, db.ForeignKey('game.id'))
    name = db.Column('name', db.String, nullable=False)
    password = db.Column('password', db.String)
    state = db.Column('state', db.Text, nullable=False)
    max_players = db.Column('max_players', db.Integer)
    players = db.relationship('UserRoom', back_populates='room')
    winner = db.relationship('User', back_populates='wins', foreign_keys=winner_id)
    game = db.relationship('Game', back_populates='rooms')


class UserRoom(db.Model):
    __tablename__ = 'userroom'
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key = True)
    room_id = db.Column('room_id', db.Integer, db.ForeignKey('room.id'), primary_key = True)
    internal_id = db.Column('internal_id', db.Integer)
    user = db.relationship('User', back_populates='history')
    room = db.relationship('Room', back_populates='players')


class Game(db.Model):
    __tablename__ = 'game'
    id = db.Column('id', db.Integer, primary_key = True)
    description = db.Column('description', db.Text)
    name = db.Column('name', db.String, unique=True)
    min_players = db.Column('min_players', db.Integer)
    max_players = db.Column('max_players', db.Integer)
    rooms = db.relationship('Room', back_populates='game')


class Achievement(db.Model):
    __tablename__ = 'achievement'
    id = db.Column('id', db.Integer, primary_key = True)
    name = db.Column('name', db.Text, unique=True)
    description = db.Column('description', db.Text)
    users = db.relationship('UserAchievement', back_populates='achievement')

class UserAchievement(db.Model):
    __tablename__ = 'userachievement'
    achievement_id = db.Column('achievement_id', db.Integer, db.ForeignKey('achievement.id'), primary_key = True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key = True)
    achievement = db.relationship('Achievement', back_populates='users')
    user = db.relationship('User', back_populates='achievements')

    def grant(user, achievement_name):
        achievement = Achievement.query.filter(Achievement.name == achievement_name).one()
        achieved = UserAchievement.query.filter(UserAchievement.achievement_id == achievement.id) \
                                        .filter(UserAchievement.user_id == user.id).one_or_none()
        if achieved is None:
            db.session.add(UserAchievement(user_id=user.id, achievement_id=achievement.id))
            db.session.commit()
