import mysql.connector
from mysql.connector import errorcode
import sys

config = {
    'user': 'user',
    'password': 'RV%6Ywfp6S&bf@',
    'host': '10.212.137.212',
    'database': 'mgmt',
    'port': '5000',
    'raise_on_warnings': True
}

sql_add_user = "CALL create_user(%(foreign_id)s,%(first_name)s,%(last_name)s)"
sql_get_user = "CALL get_user(%s)"


def get_user(user_id):
    return get_db_execute(sql_get_user, user_id)


def get_db_execute(sql, data):
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        cursor.execute(sql, data)
        # Make sure data is committed to the database
        # extract row headers
        row_headers = [x[0] for x in cursor.description]
        rv = cursor.fetchall()
        res = []
        for result in rv:
            res.append(dict(zip(row_headers, result)))
        return res[0]
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your username or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    except:
        e = sys.exc_info()[0]
        print(e)
    finally:
        cursor.close()
        cnx.close()


def add_user(data_user):
    return add_db_execute(sql_add_user, data_user)


def add_db_execute(sql, data):
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        cursor.execute(sql, data)
        # Make sure data is committed to the database
        cnx.commit()
        return None
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your username or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
        return err
    finally:
        cursor.close()
        cnx.close()
