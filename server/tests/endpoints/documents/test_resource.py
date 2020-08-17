import requests

URL = "http://127.0.0.1:5060/documents"


def test_get_without_id():
    r = requests.get(URL)
    document = r.json()
    assert r.status_code == 200
    assert document == []


def test_get_with_id():
    r = requests.get(URL + '/1')
    document = r.json()
    assert r.status_code == 200
    assert document['id'] == 1

