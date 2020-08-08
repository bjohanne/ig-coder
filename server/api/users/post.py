from db.mysql import execute_no_result_set_no_permission
from exceptions import DuplicateObjectError


def post(user_data):
    try:
        args = list(user_data.values())
        is_success = execute_no_result_set_no_permission("create_user", args)
        if is_success:
            return 'User created', 201
        else:
            return 'Bad request. User data invalid.', 400
    except DuplicateObjectError:
        return 'User ID already exists', 409
