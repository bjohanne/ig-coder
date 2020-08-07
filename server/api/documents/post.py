from db.neo4j import get_next_doc_id, create_document_anchor
from db.mysql import execute_no_result_set


def post(document_data):
    args = list(document_data.values())
    args.append("abc123")   # NB: Hardcoded user ID for now
    args.append(0)  # Placeholder for the procedure's out parameter
    print(args)
    error = execute_no_result_set("create_document", args)
    print(args)
    return 200

    next_id = get_next_doc_id()
    # Create an "anchor" node for the document
    create_document_anchor(next_id, document_data.name, document_data.description)

    if not error:
        return 201
    else:
        return 400
