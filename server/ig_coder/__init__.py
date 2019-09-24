from flask import Flask, jsonify
from flask_restplus import Api
from werkzeug.exceptions import HTTPException
from werkzeug.exceptions import default_exceptions

from .endpoints.tests.resource import TestsResource
from .endpoints.documents.resource import DocumentsResource


def create_app():
    app = Flask(__name__)

    @app.errorhandler(Exception)
    def handle_error(e):
        code = 500
        if isinstance(e, HTTPException):
            code = e.code
        return jsonify(error=str(e)), code

    for ex in default_exceptions:
        app.register_error_handler(ex, handle_error)

    api = Api(app)

    api.add_resource(TestsResource, '/tests', '/tests/<int:test_id>')
    api.add_resource(DocumentsResource, '/documents', '/documents/<int:document_id>')

    return app
