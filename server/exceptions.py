class DuplicateObjectError(Exception):
    """
    This error tells the caller of an SQL execute function that a duplicate entry MySQL error was thrown,
    allowing them to return 409 'Conflict'.
    """
    pass
