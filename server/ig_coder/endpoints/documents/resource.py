from flask import jsonify
from flask_restplus import Resource, reqparse, cors
from flask_restplus import fields, marshal_with, marshal

document_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String
}

document_parser = reqparse.RequestParser()
document_parser.add_argument('name', type=str, required=True, location=['json'],
                             help='Document name is required')


class DocumentsResource(Resource):
    @cors.crossdomain(origin='*')
    def get(self, document_id=None):
        """
        Displays a conference's details
        """
        print(document_id)
        document = {
            "id": document_id,
            "name": "Document {}".format(document_id),
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
                           "ut labore et dolore magna aliqua. Ut... "
        }

        return jsonify(document)

    @marshal_with(document_fields)
    def post(self):
        """
        Adds a new conference to the list
        """

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
