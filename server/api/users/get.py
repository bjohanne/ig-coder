from db.mysql import execute_get_single_result_set


def get(user_id):
    user = execute_get_single_result_set("get_user", (user_id,))
    if user:
        return user, 200
    else:
        return 400
