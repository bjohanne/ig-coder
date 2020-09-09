def test_get(client):
    """Getting a user"""

    rv = client.get('/users/abc123')
    assert rv.status_code == 200
