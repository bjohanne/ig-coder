from flask import jsonify
from flask_restplus import Resource, reqparse, cors, fields, marshal_with, marshal

document_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String
}

document_parser = reqparse.RequestParser()
document_parser.add_argument('name', type=str, required=True, location=['json'], help='Document name is required')
document_parser.add_argument('description', type=str, required=False, location=['json'], help='Description must be a string')

class DocumentsResource(Resource):
    documents = []  # Temporary storage for all documents until database is set up

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
            return jsonify(self.documents)

    @marshal_with(document_fields)
    def post(self):
        """
        Adds a new document to the list
        TODO: Find out why marshal_with makes the values in the response null
        """
        args = document_parser.parse_args()
        id = len(self.documents) + 1    # Temporary solution for incrementing - does not work with deletion of documents!
        document = {
            "id": id,
            "name": args.name,
            "description": args.description
        }
        self.documents.append(document)
        return jsonify(document) # Return the newly created document

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
