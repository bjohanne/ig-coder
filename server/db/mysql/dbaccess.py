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


# NB: Ensure args is a list or tuple. If the procedure only takes one argument, pass it as `(arg,)`.
def execute_get_single_result_set(proc_name, args):
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    try:
        cursor.callproc(proc_name, args)
        # get the result set
        result_sets = []
        for result_set in cursor.stored_results():
            result_sets.append(result_set)
        # extract column names and values
        columns = [x[0] for x in result_sets[0].description]   # Single result set - index 0
        values = result_sets[0].fetchall()   # Single result set - index 0
        # zip the columns and values together into a dict
        results = []
        for value in values:
            results.append(dict(zip(columns, value)))
        return results[0]
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


def execute_no_result_set(proc_name, args):
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    try:
        cursor.callproc(proc_name, args)
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
