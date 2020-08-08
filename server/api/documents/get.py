from db.neo4j import get_document, get_document_anchor
from db.mysql import execute_one_result_set_permission
import json


def get(document_id):
    # First, get the document from the SQL DB
    args = (document_id, "abc123", 0)   # NB: Hardcoded user ID for now
    (document, permission) = execute_one_result_set_permission("read_document", args)
    print(document)
    print(permission)
    return 200

    nodes = get_document(document_id)
    root = None
    for node in nodes:
        properties = node[0]._properties
        if 'children' not in properties:
            properties['children'] = []

        if 'parent' not in properties:
            root = properties
        else:
            parent = [node for node in nodes if node[0]._properties['id'] == properties['parent']][0][0]._properties
            if 'children' in parent:
                parent['children'].append(properties)
            else:
                parent['children'] = [properties]

        # this is hacky, a better solution will be to ensure json is stored double quoted
        # a recommended TODO :)
        if 'entry' in properties:
            properties['entry'] = json.loads(properties['entry'].replace("'", "\""))
        if 'component' in properties:
            properties['component'] = json.loads(properties['component'].replace("'", "\""))
        # handle forest

    # TODO: Add forest to document if root is not None
    # TODO: Differentiate between exception and document ID not found

    # Ensure forest is an empty array if it has no nodes
    forest = [] if root is None else [root]

    # Get name and description from anchor node
    anchor = get_document_anchor(document_id)
    name = anchor[0].get('name')
    description = anchor[0].get('description')

    return document, 200
