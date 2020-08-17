from db.mysql_db import execute_multi_result_set_no_permission


def get_all():
    res = execute_multi_result_set_no_permission("get_all_users", ())
    if res:
        if len(res.result_set):
            return res.result_set, 200
        else:
            return 'No users exist', 204
    else:
        return 'Something went wrong', 500
