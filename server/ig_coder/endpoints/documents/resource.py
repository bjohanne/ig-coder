from flask import jsonify
from flask_restplus import Resource, reqparse, cors, fields, marshal_with, marshal

document_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String
}

document_parser = reqparse.RequestParser()
document_parser.add_argument('name', type=str, required=True, location=['json'],
                             help='Document name is required')

"""
TODO: Store this globally in the document resource:
DOCUMENTS = [{document1}, {document2}]
"""

class DocumentsResource(Resource):
    @cors.crossdomain(origin='*')
    def get(self, document_id=None):
        """
        Displays a document's details
        TODO: Get from the global variable.
        """
        if document_id:
            document = {
                "id": document_id,
                "name": "Document {}".format(document_id),
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
                               "ut labore et dolore magna aliqua. Ut... "
            }
            return jsonify(document)
        else:
            # TODO: Return a list of documents
            documents = []
            return jsonify(documents)

    @marshal_with(document_fields)
    def post(self):
        """
        Adds a new document to the list
        TODO: Increment ID, set name and description and append to global.
        """
        document = {
            "id": 999,
            "name": "Document {}".format(document_id),
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
                           "ut labore et dolore magna aliqua. Ut... "
        }

    @marshal_with(document_fields)
    def put(self, document_id):
        """
        :param document_id:
        :return:
        """

    @marshal_with(document_fields)
    def delete(self, document_id):
        """
        :param document_id:
        :return:
        """
