import pytest
from flask import g, session
from app.model import db, User


@pytest.mark.parametrize(('username', 'email', 'password'), (('a', 'a', 'a'), ('aa$', 'a', 'a')))
def test_incorrect_username_register(client, username, email, password):
    assert client.post('/auth/register', json={'username': username,
                                               'email': email,
                                               'password': password}).status_code == 400


def test_register(client, app):
    assert client.post('/auth/register', json={}).status_code == 400
    assert client.post('/auth/register', json={'username': 'aaa',
                                               'email': 'aaa',
                                               'password': 'aaa'}).status_code == 200
    with app.app_context():
        assert User.query.filter(User.name == 'aaa').one_or_none() is not None
    assert client.post('/auth/register', json={'username': 'aaa',
                                               'email': 'aaa',
                                               'password': 'aaa'}).status_code == 400


def test_logged_in(client, auth):
    response = client.get('/auth/logged_in')
    assert response.status_code == 200
    assert response.json == False
    auth.login()
    response = client.get('/auth/logged_in')
    assert response.status_code == 200
    assert response.json == True
    auth.logout()
    response = client.get('/auth/logged_in')
    assert response.status_code == 200
    assert response.json == False


def test_login(client):
    assert client.post('/auth/login', json={}).status_code == 400
    assert client.post('/auth/login', json={'username': 'aaa', 'password': 'aaa'}).status_code == 401
    assert client.post('/auth/login', json={'username': 'test', 'password': 'test'}).status_code == 200

