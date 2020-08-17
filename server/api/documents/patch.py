from db.neo4j_db import create_graph
from db.mysql_db import execute_no_result_set_permission
from exceptions import ObjectNotFoundError


def patch(document_id, document_data):
    arg_name = document_data["name"] if "name" in document_data else None
    arg_description = document_data["description"] if "description" in document_data else None
    arg_visibility_id = document_data["visibility_id"] if "visibility_id" in document_data else None

    # Even if none of name, description and visibility_id is to be modified,
    # calling this procedure will check if the user has permission before they can modify the document's forest.
    args = (arg_name, arg_description, arg_visibility_id,
            document_id, "abc123", 0)  # NB: Hardcoded user ID for now
    try:
        res = execute_no_result_set_permission("update_document", args)
    except ObjectNotFoundError:
        return 'Document ID not found', 404

    if res:
        if res.permission:
            if "forest" in document_data:
                create_graph(document_data["forest"])
            return 'OK', 200
        else:
            return 'Permission not granted', 403
    else:
        return 'Something went wrong', 500
