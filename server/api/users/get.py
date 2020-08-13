from db.mysql_db import execute_one_result_set_no_permission


def get(user_id):
    user = execute_one_result_set_no_permission("get_user", (user_id,))
    # TODO: Differentiate between exception and user ID not found (catch 404)
    if user:
        return user, 200
