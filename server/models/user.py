from db.mysql.dbaccess import execute_get_user, execute_add_user


def get_user(user_id):
    sql_get_user = "CALL get_user(%s)"
    return execute_get_user(sql_get_user, user_id)


def add_user(data_user):
    sql_add_user = "CALL create_user(%(foreign_id)s,%(first_name)s,%(last_name)s)"
    return execute_add_user(sql_add_user, data_user)


class User:
    def __init__(self):
        print("User")
