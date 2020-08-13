from db.neo4j_db import DataAccess

neo4j_bolt_uri = "bolt://10.212.137.212:7687"
neo4j_user = "neo4j"
neo4j_pass = "igcoder"


def traversal(tree: dict):
    stack = []
    sub_stack = []
    stack.append(tree)

    while stack:
        node = stack.pop()
        sub_stack.append(node)
        if "children" in node:
            stack.extend(node["children"])
    sub_stack.reverse()
    return iter([_visit_node(node) for node in sub_stack])


def _visit_node(node: dict):
    return node


def get_next_doc_id():
    db_access = DataAccess(uri=neo4j_bolt_uri, user=neo4j_user, password=neo4j_pass)
    return db_access.get_next_doc_id()


def create_graph(json: dict):
    data = json
    db_access = DataAccess(uri=neo4j_bolt_uri, user=neo4j_user, password=neo4j_pass)
    for tree in data["forest"]:
        db_access.create_nodes(traversal(tree))


def get_document(document_id: int):
    db_access = DataAccess(uri=neo4j_bolt_uri, user=neo4j_user, password=neo4j_pass)
    return db_access.get_document(document_id)
