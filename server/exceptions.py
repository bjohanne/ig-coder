class DuplicateObjectError(Exception):
    """
    This error tells the caller of an SQL execute function that a duplicate entry MySQL error was thrown,
    allowing it to return 409 'Conflict'.
    """
    pass


class ObjectNotFoundError(Exception):
    """
    This error tells the caller of an SQL execute function that no record with the requested ID was found,
    allowing it to return 404 'Not Found'.
    """
    pass
