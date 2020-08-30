from flask_restplus import Resource, reqparse, fields, marshal_with
from flask import make_response, request
from db.neo4j_db import create_graph, get_next_doc_id, get_document, create_document_anchor, get_document_anchor

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

        # Ensure forest is an empty array if it has no nodes
        forest = [] if root is None else [root]

        # Get name and description from anchor node
        anchor = get_document_anchor(document_id)
        name = anchor[0].get('name')
        description = anchor[0].get('description')
        return {"id": document_id, "name": name, "description": description, "forest": forest}

    #@marshal_with(document_fields)
    def post(self):
        """
        Adds a new document to the list
        """
        args = document_parser.parse_args()
        next_doc = get_next_doc_id()
        doc = {
            "document": next_doc,
            "id": next_doc,
            "name": args.name,
            "description": args.description,
            "forest": []
        }
        self.documents.append(doc)

        # Create an "anchor" node for the document
        create_document_anchor(next_doc, args.name, args.description)

        return make_response(doc)

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
