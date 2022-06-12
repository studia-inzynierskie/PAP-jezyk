from app.model import Game, Achievement


def test_add_game(runner, app):
    result = runner.invoke(args=['add-game', 'test', 'test_desc', '3', '2'])
    assert 'Minimum number of players must be smaller than the maximum number of players.' in result.output
    with app.app_context():
        assert Game.query.filter(Game.name == 'test').one_or_none() is None

    result = runner.invoke(args=['add-game', 'test', 'test_desc', '2', '3'])
    assert 'Game added!' in result.output
    with app.app_context():
        game = Game.query.filter(Game.name == 'test').one()
    assert game.name == 'test' and game.description == 'test_desc' \
       and game.min_players == 2 and game.max_players == 3


def test_add_achievement(runner, app):
    result = runner.invoke(args=['add-achievement', 'test', 'test_desc'])
    assert 'Achievement added!' in result.output
    with app.app_context():
        achievement = Achievement.query.filter(Achievement.name == 'test').one()
        assert achievement.name == 'test'
        assert achievement.description == 'test_desc'
