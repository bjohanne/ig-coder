from flask import Flask, jsonify
from flask_cors import CORS
from flask_restplus import Api
from werkzeug.exceptions import HTTPException
from werkzeug.exceptions import default_exceptions
import firebase_admin

from .endpoints.tests.resource import TestsResource
from .endpoints.documents.resource import DocumentsResource
from .endpoints.nlp.resource import WordTokenizerResource
from .endpoints.nlp_ner.resource import NamedEntityRecognitionResource
from .endpoints.users.resource import UsersResource


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

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
    api.add_resource(WordTokenizerResource, '/tokenize', '/tokenize')
    api.add_resource(UsersResource, '/users', '/users')
    api.add_resource(NamedEntityRecognitionResource, '/entities', '/entities')

    # Firebase Admin SDK
    firebase_admin.initialize_app()

    return app
