from flask import jsonify
from flask_restplus import Resource, reqparse, fields, marshal_with
from nltk import WhitespaceTokenizer

document_parser = reqparse.RequestParser()
document_parser.add_argument('document', type=str, required=True, location=['json'], help='Document name is required')


class WordTokenizerResource(Resource):

    def post(self):
        """
        Word tokenize a policy based on the WhitespaceTokenizer.
        Return an array of tokens
        """
        args = document_parser.parse_args()
        tokenized = WhitespaceTokenizer().tokenize(text=args.document)
        return tokenized
