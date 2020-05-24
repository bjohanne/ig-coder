import json
from db.dbaccess import DataAccess

neo4j_bolt_uri = "bolt://10.212.137.212:7687"

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
    db_access = DataAccess(uri=neo4j_bolt_uri, user="neo4j", password="igcoder")
    return db_access.get_next_doc_id()

def create_graph(json: dict):
    data = json
    db_access = DataAccess(uri=neo4j_bolt_uri, user="neo4j", password="igcoder")
    for tree in data["forest"]:
        db_access.create_nodes(traversal(tree))

def create_document_anchor(id: int, name: str, description: str):
    db_access = DataAccess(uri=neo4j_bolt_uri, user="neo4j", password="igcoder")
    return db_access.create_document_anchor(id, name, description)

def get_document(id: int):
    db_access = DataAccess(uri=neo4j_bolt_uri, user="neo4j", password="igcoder")
    return db_access.get_document(id)


