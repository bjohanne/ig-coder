from mysql.connector import errorcode
from db.mysql import execute_no_result_set


def post(user_data):
    args = list(user_data.values())
    error = execute_no_result_set("create_user", args)
    if not error:
        return 201
    else:
        if error.errno == errorcode.ER_DUP_ENTRY:
            return 409
        else:
            return 400
