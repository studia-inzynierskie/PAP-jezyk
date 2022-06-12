import pytest
from flask import g, session
from app.model import db, User


def test_user_profile(client, auth):
    assert client.get('/user/profile').status_code == 401
    auth.login()
    response = client.get('/user/profile')
    assert response.status_code == 200
    match response.json:
        case {'username': str() as username,
              'email': str() as email,
              'achievements': list() as achievements,
              'stats': list() as stats,
              'exp': int() as exp,
              'lvl': int() as lvl,
              'max_exp': int() as max_lvl}:
            assert username == 'test'
            assert email == 'test'
            assert {'name': 'Hello!', 'description': 'Log in for the first time', 'achieved': True} \
                   in achievements
            assert {'name': 'Games Played', 'value': 0} in stats
            assert exp == 0
            assert lvl == 1
            assert max_lvl == 10
        case e:
            raise Exception(e)


def test_update_password(client, auth):
    auth.login()
    assert client.post('/user/update_password', json={}).status_code == 400
    assert client.post('/user/update_password', json={'password': 'test2'}).status_code == 200
    assert client.post('/auth/login', json={'username': 'test', 'password': 'test2'}).status_code == 200
    assert client.post('/auth/login', json={'username': 'test', 'password': 'test'}).status_code == 401


def test_update_email(client, app, auth):
    auth.login()
    assert client.post('/user/update_email', json={}).status_code == 400
    assert client.post('/user/update_email', json={'email': 'test2'}).status_code == 200
    with app.app_context():
        assert User.query.filter(User.name == 'test').one().email == 'test2'


def test_update_username(client, app, auth):
    auth.login()
    with app.app_context():
        user_id = User.query.filter(User.name == 'test').one().id
    assert client.post('/user/update_username', json={}).status_code == 400
    assert client.post('/user/update_username', json={'username': 'test2'}).status_code == 200
    with app.app_context():
        assert User.query.get(user_id).name == 'test2'
