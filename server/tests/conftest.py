import pytest
import connexion

flask_app = connexion.FlaskApp(__name__)
flask_app.add_api('../api_spec.yaml', validate_responses=True, strict_validation=True)


@pytest.fixture(scope='module')
def client():
    with flask_app.app.test_client() as c:
        yield c
