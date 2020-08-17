from db.mysql_db import execute_one_result_set_no_permission
from exceptions import ObjectNotFoundError


def get(user_id):
    try:
        res = execute_one_result_set_no_permission("get_user", (user_id,))
        if res:
            return res.result_set, 200
        else:
            return 'Something went wrong', 500
    except ObjectNotFoundError:
        return 'User ID not found', 404
