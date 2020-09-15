import os
import pytest
from .. import create_app


@pytest.fixture(scope="session")
def app():
    abs_file_path = os.path.abspath(os.path.dirname(__file__))
    openapi_path = os.path.join(abs_file_path, "../", "openapi")
    os.environ["SPEC_PATH"] = openapi_path

    app = create_app()
    return app
