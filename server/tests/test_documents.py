def test_post(client):
    """Creating a document"""

    rv = client.post('/documents', data=dict(
        name="My New Document",
        description="",
        project_id=1,
        visibility_id=1
    ))
    assert rv.status_code == 201
