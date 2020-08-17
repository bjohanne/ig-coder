from db.mysql_db import execute_no_result_set_no_permission
from exceptions import DuplicateObjectError


def post(user_data):
    args = list(user_data.values())
    try:
        res = execute_no_result_set_no_permission("create_user", args)
        if res:
            return 'User created', 201
        else:
            return 'Something went wrong', 500
    except DuplicateObjectError:
        return 'User ID already exists', 409
