from flask_restplus import Resource, reqparse, fields, marshal_with
from flask import make_response
from sql_db.dbaccess import add_user, get_user

user_fields = {
    'user_uuid': fields.String,
    'foreign_id': fields.String,
    'first_name': fields.String,
    'last_name': fields.String
}

# validate the input load for post request
user_parser_post = reqparse.RequestParser()
user_parser_post.add_argument('foreign_id', type=str, required=True, location=['json'], help='foreign_id is required.')
user_parser_post.add_argument('first_name', type=str, required=True, location=['json'], help='first_name is required.')
user_parser_post.add_argument('last_name', type=str, required=True, location=['json'], help='last_name is required.')

# Used to handle the GET request
user_parser_get = reqparse.RequestParser()
user_parser_get.add_argument('user_uuid', type=str, required=True, location=['args'], help='user_uuid is required')


class UsersResource(Resource):

    @marshal_with(user_fields)
    def get(self):
        user_uuid = user_parser_get.parse_args()['user_uuid']
        res = get_user(user_uuid)
        return make_response(res)

    @marshal_with(user_fields)
    def post(self):
        args = user_parser_post.parse_args()
        error = add_user(args)
        if not error:
            return make_response({'message': 'Insert user data successful!'}, 200)
        else:
            return make_response({'errors': {"error_id": error.errno, 'msg': error.msg}, 'message': 'Insert Fail!'},
                                 400)
