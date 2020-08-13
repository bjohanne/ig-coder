from db.mysql_db import execute_one_result_set_permission


def post(document_data):
    # Construct arguments for the DB procedure. The 0 is a placeholder for the output parameter.
    args = (document_data["name"], document_data["description"], document_data["project_id"],
            document_data["visibility_id"], "abc123", 0)    # NB: Hardcoded user ID for now
    res = execute_one_result_set_permission("create_document", args)

    if res:
        if res.permission:
            # Create an empty forest
            res.result_set["forest"] = []
            return res.result_set, 201
        else:
            return 'Permission not granted', 403
