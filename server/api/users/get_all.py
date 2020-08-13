from db.mysql_db import execute_multi_result_set_no_permission


def get_all():
    users = execute_multi_result_set_no_permission("get_all_users", ())
    if users:
        return users, 200
    else:
        return 'No users exist', 204
