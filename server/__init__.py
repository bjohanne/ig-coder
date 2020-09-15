import os
import connexion
from connexion.apps.flask_app import FlaskJSONEncoder
from flask_cors import CORS


def create_app():
    if "SPEC_PATH" in os.environ:
        openapi_path = os.environ["SPEC_PATH"]
    else:
        abs_file_path = os.path.abspath(os.path.dirname(__file__))
        openapi_path = os.path.join(abs_file_path, "openapi")
    app = connexion.FlaskApp(__name__, specification_dir=openapi_path)
    app.add_api('swagger.yaml', validate_responses=True, strict_validation=True)

    flask_app = app.app
    flask_app.json_encoder = FlaskJSONEncoder
    CORS(flask_app)

    return flask_app
