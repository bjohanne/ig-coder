from models.user import add_user
from mysql.connector import errorcode


def post(user_data):
    error = add_user(user_data)
    if not error:
        return 201
    else:
        if error.errno == errorcode.ER_DUP_ENTRY:
            return 409
        else:
            return 400
