from flask_restplus import Resource, reqparse, cors, fields, marshal_with, marshal
from flask import make_response
import json
from ..database.db import add_user
from ..database.db import get_user

user_fields = {
    'user_id': fields.Integer,
    'foreign_id': fields.String,
    'first_name': fields.String,
    'last_name': fields.String,
    'disabled': fields.Boolean,
    'privileged': fields.Boolean,
    'created_time': fields.DateTime,
    'modified_time': fields.DateTime
}

# validate the input load for post request
user_parser_post = reqparse.RequestParser()
user_parser_get = reqparse.RequestParser()
user_parser_post.add_argument('foreign_id', required=True, location=['json'], help='foreign_id is required.')
user_parser_post.add_argument('first_name', type=str, required=True, location=['json'], help='first_name is required.')
user_parser_post.add_argument('last_name', type=str, required=True, location=['json'], help='last_name is required.')
user_parser_post.add_argument('disabled', type=int, required=True, location=['json'], help='disabled is required.')
user_parser_post.add_argument('privileged', type=int, required=True, location=['json'], help='privileged is required.')
user_parser_post.add_argument('created_time', type=str, required=True, location=['json'],
                              help='created_time is required.')
user_parser_post.add_argument('modified_time', type=str, required=True, location=['json'],
                              help='modified_time is required.')

# Used to handle the GET request
user_parser_get.add_argument('user_id', type=int, required=True, location=['args'], help='user id is required')


class UsersResource(Resource):

    @marshal_with(user_fields)
    def get(self):
        user_id = user_parser_get.parse_args()['user_id']
        # pass the query parameters by using tuple
        # Note when creating a tuple with only one element, ',' is required otherwise tuple will be recognized as string
        res = get_user((user_id,))
        # return the query result as dictionary format
        return res

    def post(self):
        print(user_parser_post)
        args = user_parser_post.parse_args()
        error = add_user(args)
        if not error:
            return {'message': 'Insert user data successfully!'}, 200
        else:
            return {'errors': {"error_id":error.errno,'msg':error.msg}, 'message': 'Insert Fail!'}, 400
