import connexion
from flask_cors import CORS


def create_app():
    app = connexion.FlaskApp(__name__, specification_dir='.')
    app.add_api('api_spec.yaml', validate_responses=True, strict_validation=True)

    CORS(app.app)
    flask_app = app.app

    return flask_app
