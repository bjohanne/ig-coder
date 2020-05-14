from flask import abort, request
from flask_restplus import Resource, reqparse
import spacy

nlp = spacy.load("en_core_web_sm")

class NamedEntityRecognitionResource(Resource):

    def post(self):
        """
        locate named entities in an entry using spacy ner
        """
        content = request.get_json()
        if content is None:
            return abort(400)
        else:
            doc = nlp(content['entry'])
            return { ent.label_: str(ent) for ent in doc.ents }
