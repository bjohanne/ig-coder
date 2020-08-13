from db.neo4j_db import get_document
from db.mysql_db import execute_one_result_set_permission
import json


def get(document_id):
    # First, get the document from the SQL DB
    args = (document_id, "abc123", 0)   # NB: Hardcoded user ID for now
    res = execute_one_result_set_permission("read_document", args)

    root = None
    if res and res.permission:
        # Second, retrieve the document's forest from Neo4j
        nodes = get_document(document_id)
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

    # TODO: Catch 404

    # Ensure forest is an empty array if it has no nodes
    forest = [] if root is None else [root]

    if res:
        if res.permission:
            # Add the forest, which may be empty
            res.result_set["forest"] = forest
            return res.result_set, 201
        else:
            return 'Permission not granted', 403
