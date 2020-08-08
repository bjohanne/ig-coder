from db.neo4j import get_next_doc_id, create_document_anchor
from db.mysql import execute_no_result_set_permission


def post(document_data):
    args = (document_data["name"], document_data["description"], document_data["project_id"],
            document_data["visibility_id"], "abc123", 0)    # NB: Hardcoded user ID for now
    permission = execute_no_result_set_permission("create_document", args)
    print(permission)
    return 200

    next_id = get_next_doc_id()
    # Create an "anchor" node for the document
    create_document_anchor(next_id, document_data.name, document_data.description)

    if not error:
        return 'Document created', 201
    else:
        return 'Bad request. Document data invalid.', 400
