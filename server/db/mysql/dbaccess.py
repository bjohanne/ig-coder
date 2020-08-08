import mysql.connector
from mysql.connector import errorcode
from exceptions import DuplicateObjectError

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


def handle_error(error):
    if error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print(access_denied_msg)
    elif error.errno == errorcode.ER_BAD_DB_ERROR:
        print(bad_db_msg)
    elif error.errno == errorcode.ER_DUP_ENTRY:
        raise DuplicateObjectError
    else:
        print(error)
    return False


# NB for all execute functions:
# Ensure args is a list or tuple. If the procedure only takes one argument, pass it as `(arg,)`.
# If it takes no arguments, pass `()`.


def execute_no_result_set_no_permission(proc_name, args):
    """
    Calls a procedure that does not select a result set and does not produce a permission boolean.
    Returns True if successful, False if error. (This is for consistency with the other execute functions.)
    """
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    try:
        cursor.callproc(proc_name, args)
        cnx.commit()
        return True
    except mysql.connector.Error as err:
        return handle_error(err)
    finally:
        cursor.close()
        cnx.close()


def execute_no_result_set_permission(proc_name, args):
    """
    Calls a procedure that does not select a result set and produces a permission boolean.
    Returns the permission boolean if successful, False if error.
    """
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    try:
        cursor.callproc(proc_name, args)
        # Get output parameter
        cursor.execute("SELECT " + "@_" + proc_name + "_arg" + str(len(args)))
        permission = cursor.fetchone()
        cnx.commit()
        return permission[0]
    except mysql.connector.Error as err:
        return handle_error(err)
    except IndexError:
        return False
    finally:
        cursor.close()
        cnx.close()


def execute_one_result_set_no_permission(proc_name, args):
    """
    Calls a procedure that selects one result set and does not produce a permission boolean.
    Returns the result set if successful, False if error.
    """
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
        return handle_error(err)
    except IndexError:
        return False
    finally:
        cursor.close()
        cnx.close()


def execute_one_result_set_permission(proc_name, args):
    """
    Calls a procedure that selects one result set and produces a permission boolean.
    Returns a list consisting of [0] the result set and [1] the permission boolean if successful,
    False if error.
    """
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
        # Get output parameter
        cursor.execute("SELECT " + "@_" + proc_name + "_arg" + str(len(args)))
        permission = cursor.fetchone()
        return results[0], permission[0]
    except mysql.connector.Error as err:
        return handle_error(err)
    except IndexError:
        return False
    finally:
        cursor.close()
        cnx.close()


def execute_multi_result_set_no_permission(proc_name, args):
    """
    Calls a procedure that selects multiple result sets and does not produce a permission boolean.
    Returns a list of result sets if successful, False if error.
    """
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    try:
        cursor.callproc(proc_name, args)
        # get the result sets
        result_sets = []
        for result_set in cursor.stored_results():
            result_sets.append(result_set)
        column_lists = []
        value_lists = []
        results = []
        # extract column names and values per result set
        for index, result_set in enumerate(result_sets):
            column_lists.append([x[0] for x in result_set.description])
            value_lists.append(result_set.fetchall())
            # zip the columns and values together into a dict
            for value in value_lists[index]:
                results.append(dict(zip(column_lists[index], value)))
        return results
    except mysql.connector.Error as err:
        return handle_error(err)
    except IndexError:
        return False
    finally:
        cursor.close()
        cnx.close()
