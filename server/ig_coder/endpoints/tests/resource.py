from flask_restplus import Resource, reqparse, cors
from flask_restplus import fields, marshal_with, marshal

test_fields = {
    id: fields.Integer
}

test_parser = reqparse.RequestParser()


class TestsResource(Resource):
    def get(self, test_id=None):
        """
        returns a list of conferences
        """
        return "Get some data from the server!"

    @marshal_with(test_fields)
    def post(self):
        """
        Adds a new conference to the list
        """

    @marshal_with(test_fields)
    def put(self, test_id):
        """
        :param test_id:
        :return:
        """

    @marshal_with(test_fields)
    def delete(self, test_id):
        """
        :param test_id:
        :return:
        """
