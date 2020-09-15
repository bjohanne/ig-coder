from flask import abort, request
from flask_restplus import Resource
import spacy

nlp = spacy.load("en_core_web_sm")


class NamedEntityRecognitionResource(Resource):

    def post(self):
        """
        locate named entities in an entry using spacy ner
        """
        content = request.get_json()
        response_data = {}

        if content is None:
            return abort(400)
        else:
            doc = nlp(content['entry'])
            response_data["ent"] = {}
            response_data["pos"] = {}
            for token in doc:
                if token.ent_type_:
                    if token.ent_type_ in response_data["ent"]:
                        response_data["ent"][token.ent_type_].append(str(token))
                    else:
                        response_data["ent"][token.ent_type_] = [str(token)]
                    response_data["ent"][token.ent_type_] = list(set(response_data["ent"][token.ent_type_]))

                if not token.is_stop:
                    if token.pos_ in response_data["pos"]:
                        response_data["pos"][token.pos_].append(str(token))
                    else:
                        response_data["pos"][token.pos_] = [str(token)]
                    response_data["pos"][token.pos_] = list(set(response_data["pos"][token.pos_]))

        return response_data
