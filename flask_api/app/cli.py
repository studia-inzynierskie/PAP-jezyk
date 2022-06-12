import click
from flask import current_app
from flask.cli import with_appcontext

from .model import *


@click.command('init-db')
@click.option('--reset/--no-reset', default=False)
@click.option('--populate/--no-populate', default=False)
@with_appcontext
def init_db(reset, populate):
    print(f'Initialising database {current_app.config["SQLALCHEMY_DATABASE_URI"]}')
    if reset:
        print('Clearing the database...')
        db.drop_all()
    db.create_all()
    print('Database initialised')
    if populate:
        db.session.add_all((
            Game(name='Wojna', description='Throwing cards at each other', min_players=2, max_players=2),
            Achievement(name='Hello!', description='Log in for the first time'),
            Achievement(name='PAP', description='End a game at the correct time'),
            Achievement(name='Emotional damage', description='Lose 6 games'),
            Achievement(name='Well done!', description='Win 3 games'),
            Achievement(name='Destroyer', description='Win 20 games'),
            Achievement(name='You simply the best', description='Take first position on the leaderboards'),
            Achievement(name='You simply the worst', description='You are the worst player on the world'),
            Achievement(name='Almost there', description='Take second position on the leaderboards'),
            Achievement(name='The worst place', description='Take fourth position on the leaderboards'),
        ))
        db.session.commit()
        print('Database populated')
        


@click.command('add-game')
@click.argument('name')
@click.argument('description')
@click.argument('min_players', type=click.IntRange(2))
@click.argument('max_players', type=click.IntRange(2))
@with_appcontext
def add_game(name, description, min_players, max_players):
    if min_players > max_players:
        print('Minimum number of players must be smaller than the maximum number of players.')
    else:
        game = Game(name=name, description=description, min_players=min_players, max_players=max_players)
        db.session.add(game)
        db.session.commit()
        print('Game added!')


@click.command('add-achievement')
@click.argument('name')
@click.argument('description')
@with_appcontext
def add_achievement(name, description):
    achievement = Achievement(name=name, description=description)
    db.session.add(achievement)
    db.session.commit()
    print('Achievement added!')
