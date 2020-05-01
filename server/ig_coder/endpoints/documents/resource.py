from flask_restplus import Resource, reqparse, cors, fields, marshal_with, marshal
from flask import make_response, request
from db.traverse import create_graph, get_next_doc_id
import json

document_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'forest': fields.String
}

document_parser = reqparse.RequestParser()
document_parser.add_argument('name', type=str, required=True, location=['json'], help='Document name is required')
document_parser.add_argument('description', type=str, required=False, location=['json'], help='Description must be a string')
document_parser.add_argument('forest', type=str, required=False, location=['json'], help='Forest must be a string')

class DocumentsResource(Resource):
    documents = []  # Temporary storage for documents until database is set up

    @marshal_with(document_fields)
    def get(self, document_id=None):
        """
        Displays a document's details
        """
        if document_id:
            document = self.documents[document_id - 1];
            # handle forest
            return document
        else:
            return self.documents

    @marshal_with(document_fields)
    def post(self):
        """
        Adds a new document to the list
        """
        args = document_parser.parse_args()
        id = len(self.documents) + 1    # Temporary solution for incrementing - does not work with deletion of documents!
        next_doc = get_next_doc_id()
        document = {
            "document": next_doc,
            "id": next_doc,
            "name": args.name,
            "description": args.description,
            "forest": json.loads(args.forest)
        }
        self.documents.append(document)
        return document


    @marshal_with(document_fields)
    def patch(self):
        data = request.json        
        # save the document                
        # save the document, including forest
        # Forest: From the client, get it as a string (JSON.stringify()).
        # Here, use json.loads() to make it a Dictionary.
        # Maybe make a custom type for the forest.
        # return true if successful
        resp = create_graph(data)
        return make_response({"message": "Collection updated"}, 204)

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
