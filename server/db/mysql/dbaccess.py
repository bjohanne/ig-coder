import mysql.connector
from mysql.connector import errorcode

config = {
    'user': 'user',
    'password': 'RV%6Ywfp6S&bf@',
    'host': '10.212.137.212',
    'database': 'mgmt',
    'port': '5000',
    'raise_on_warnings': True
}

access_denied_msg = "Something is wrong with your username or password"
bad_db_msg = "Database does not exist"


def execute_get_user(sql, data):
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    try:
        cursor.execute(sql, (data,))
        # extract column names (keys)
        columns = [x[0] for x in cursor.description]
        values = cursor.fetchall()
        res = []
        for result in values:
            res.append(dict(zip(columns, result)))
        return res[0]
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print(access_denied_msg)
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print(bad_db_msg)
        else:
            print(err)
        return None
    finally:
        cursor.close()
        cnx.close()


def execute_add_user(sql, data):
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    try:
        cursor.execute(sql, data)
        cnx.commit()
        return None
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print(access_denied_msg)
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print(bad_db_msg)
        else:
            print(err)
        return err
    finally:
        cursor.close()
        cnx.close()
