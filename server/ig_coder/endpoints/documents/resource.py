from flask_restplus import Resource, reqparse, cors, fields, marshal_with, marshal
from flask import make_response, request, jsonify, Response
from db.traverse import create_graph, get_next_doc_id, create_document_anchor, get_document

import json

document_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'forest': fields.List
}

document_parser = reqparse.RequestParser()
document_parser.add_argument('name', type=str, required=True, location=['json'], help='Document name is required')
document_parser.add_argument('description', type=str, required=False, location=['json'], help='Description must be a string')
document_parser.add_argument('forest', type=str, required=False, location=['json'], help='Forest must be a string')

class DocumentsResource(Resource):
    documents = []  # Temporary storage for documents until database is set up

    def get(self, document_id=None):
        """
        Displays a document's details
        """
        nodes = get_document(document_id)
        root = None
        for node in nodes:
            properties = node[0]._properties
            if 'children' not in properties:
                properties['children'] = []

            if 'parent' not in properties:
                root = properties
            else:
                parent = [node for node in nodes if node[0]._properties['id'] == properties['parent']][0][0]._properties
                if 'children' in parent:
                    parent['children'].append(properties)
                else:
                    parent['children'] = [properties]

            # this is hacky, a better solution will be to ensure json is stored double quoted
            # a recommended TODO :)
            if 'entry' in properties:
                properties['entry'] = json.loads(properties['entry'].replace("'", "\""))
            if 'component' in properties:
                properties['component'] = json.loads(properties['component'].replace("'", "\""))
            # handle forest
        return {"id": document_id, "name": "dummy", "description": "dummy", "forest": [root] }


    #@marshal_with(document_fields)
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
            "forest": []
        }
        self.documents.append(document)

        # Create an "anchor" node for the document
        create_document_anchor(next_doc)

        return document


    #@marshal_with(document_fields)
    def patch(self):
        data = request.json        
        # save the document                
        # save the document, including forest
        # Forest: From the client, get it as a string (JSON.stringify()).
        # Here, use json.loads() to make it a Dictionary.
        # Maybe make a custom type for the forest.
        # return true if successful
        resp = create_graph(data)
        return make_response({"message": "Collection updated"}, 200)

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
