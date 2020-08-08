from db.mysql import execute_one_result_set_no_permission


def get(user_id):
    user = execute_one_result_set_no_permission("get_user", (user_id,))
    # TODO: Differentiate between exception and user ID not found
    if user:
        return user, 200
    else:
        return 'Bad request. User ID invalid.', 400
