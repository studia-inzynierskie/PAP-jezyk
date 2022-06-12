def test_by_level(client):
    response = client.get('/leaderboard/by_level')
    assert response.status_code == 200
    assert response.json == [{
        'username': 'test', 'score': 1
    }]


def test_by_wins(client):
    response = client.get('/leaderboard/by_wins')
    assert response.status_code == 200
    assert response.json == [{
        'username': 'test', 'score': 0
    }]


def test_by_achievements(client):
    response = client.get('/leaderboard/by_achievements')
    assert response.status_code == 200
    assert response.json == [{
        'username': 'test', 'score': 0
    }]
