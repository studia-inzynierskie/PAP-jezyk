import os
import os.path

from flask import Flask


from app import auth, user, leaderboard, game, room
from app.model import db
from app.cli import init_db, add_game, add_achievement


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    # load config and overwrite if testing
    app.config.from_pyfile('config.py', silent=True)
    if test_config is not None:
        app.config.from_mapping(test_config)


    # ensure the instance folder exists
    if not os.path.exists(app.instance_path):
        os.mkdir(app.instance_path)

    # connect to database
    app.config['SQLALCHEMY_DATABASE_URI'] = app.config['SQLALCHEMY_DATABASE_URI'] \
        .format(instance=app.instance_path)
    db.init_app(app)

    # henlo!
    @app.route('/hello')
    def hello():
        return 'Henlo ,warld!'

    # blueprints
    app.register_blueprint(auth.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(leaderboard.bp)
    app.register_blueprint(game.bp)
    app.register_blueprint(room.bp)

    # commandline arguments
    app.cli.add_command(init_db)
    app.cli.add_command(add_game)
    app.cli.add_command(add_achievement)

    return app


app = create_app()
