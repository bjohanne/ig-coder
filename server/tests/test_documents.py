def test_post(client):
    """Creating a document"""

    res = client.post('/v1/documents', json=dict(
        name="My New Document",
        description="",
        project_id=1,
        visibility_id=1
    ))
    assert res.status_code == 201
