def test_get(client):
    """Getting a user"""

    res = client.get('/v1/users/abc123')
    assert res.status_code == 200
