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
    documents = []  # Temporary storage for documents until database is set up

    @marshal_with(document_fields)
    def get(self, document_id=None):
        """
        Displays a document's details
        """
        if document_id:
            document = self.documents[document_id - 1];
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
        document = {
            "id": id,
            "name": args.name,
            "description": args.description
        }
        self.documents.append(document)
        return document

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
