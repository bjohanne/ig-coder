from api_version import api_v

doc_base_path = '/' + api_v + '/documents'


def test_post(client):
    """ Creating a document """

    # Successful request
    res1 = client.post(doc_base_path, json=dict(
        name="My New Document",
        description="",
        project_id=1,
        visibility_id=1
    ))
    assert res1.status_code == 201

    # Invalid request
    res2 = client.post(doc_base_path, json=dict(
        name="My New Document",
        projectid=1,
        visibility_id=1
    ))
    assert res2.status_code == 400

    # Permission not granted
    res3 = client.post(doc_base_path, json=dict(
        name="My New Document",
        description="",
        project_id=2,   # In the DB test data, user abc123 does not have permission on project 2
        visibility_id=1
    ))
    assert res3.status_code == 403


def test_get(client):
    """ Getting a document """

    # Successful request
    res1 = client.get(doc_base_path + '/1')
    assert res1.status_code == 200

    # Permission not granted
    res3 = client.get(doc_base_path + '/2')
    assert res3.status_code == 403

    # Document ID not found
    res4 = client.get(doc_base_path + '/abc')
    assert res4.status_code == 404


def test_patch(client):
    """ Updating a document """

    # Successful request
    res1 = client.patch(doc_base_path + '/1', json=dict(
        name="My New Updated Document",
        description="",
        visibility_id=2
    ))
    assert res1.status_code == 200

    # Document ID and/or data invalid
    res2 = client.patch(doc_base_path + '/1', json=dict(
        name=None
    ))
    assert res2.status_code == 400

    # Permission not granted
    res3 = client.patch(doc_base_path + '/2', json=dict(
        name="My New Updated Document",
        description="",
        visibility_id=2
    ))
    assert res3.status_code == 403

    # Document ID not found
    res4 = client.patch(doc_base_path + '/abc', json=dict(
        name="My New Updated Document",
        description="",
        visibility_id=2
    ))
    assert res4.status_code == 404
