from api_version import api_v
import uuid

user_base_path = '/'+api_v+'/users'


def test_post(client):
    """ Creating a user """

    # Successful request
    res1 = client.post(user_base_path, json=dict(
        foreign_id=uuid.uuid4(),
        first_name="John",
        last_name="Smith"
    ))
    assert res1.status_code == 201

    # User data invalid
    res2 = client.post(user_base_path, json=dict(
        firstname="John",
        lastname="Smith"
    ))
    assert res2.status_code == 400

    # User ID already exists
    res3 = client.post(user_base_path, json=dict(
        foreign_id="abc123",
        first_name="John",
        last_name="Smith"
    ))
    assert res3.status_code == 409


def test_get(client):
    """ Getting a user """

    # Successful request
    res1 = client.get(user_base_path+'/abc123')
    assert res1.status_code == 200

    # User ID not found
    res3 = client.get(user_base_path+'/abc')
    assert res3.status_code == 404


def test_get_all(client):
    """ Getting all users """

    # Successful request
    res = client.get(user_base_path)
    assert res.status_code == 200
