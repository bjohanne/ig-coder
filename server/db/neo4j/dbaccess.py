from neo4j import GraphDatabase
from datetime import datetime


class DataAccess(object):
    def __init__(self, uri, user, password):
        self._driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self._driver.close()

    def get_next_doc_id(self):
        q = """MATCH (n) WHERE EXISTS(n.document) RETURN n.document ORDER BY n.document DESC LIMIT 1"""
        with self._driver.session() as session:
            response = session.run(q)
            record = response.single()
            if record is not None:
                return int(record[0])+1
            else:
                return 1

    def create_nodes(self, nodes):
        now = datetime.now()
        now_str = now.strftime("%d.%m.%Y %H:%M:%S")
        statements = []
        nodes = list(nodes)

        for item in nodes:
            if "nodeType" not in item:
                continue

            if "children" in item:
                for child in item["children"]:
                    if "nodeType" not in child:
                        continue

                    statements.append("MERGE (Document{4}{0})-[:child_of]->(Document{4}{1})".format(child["id"], item["id"], child["nodeType"], item["nodeType"], item["document"]))
                del item["children"]

            dict_args_list = []
            for key in item:
                dict_args_list.append("{0}:\"{1}\"".format(key, item[key]))
            dict_args = "{0}".format(",".join(dict_args_list))
            statements.insert(0, """ MERGE (Document{0}{1}:{2} {3}) ON CREATE SET Document{0}{1}.createdAt = '{4}' ON MATCH SET Document{0}{1}.updatedAt = '{4}' """.format(item["document"], item["id"], item["nodeType"], "{" + dict_args + "}", now_str))

        create_nodes_statement = "{0} ".format(" ".join(statements))
        with self._driver.session() as session:
            session.run(create_nodes_statement.strip())

    def get_document(self, id):
        q = """ MATCH (n) WHERE n.document = "{0}" AND NOT n:Anchor RETURN n """.format(id)
        with self._driver.session() as session:
            return [node for node in session.run(q)]

    def create_document_anchor(self, id, name, description):
        q = """ CREATE (n:Anchor {{ document: '{}', name: '{}', description: '{}' }}) """.format(id, name, description)
        with self._driver.session() as session:
            response = session.run(q)

    def get_document_anchor(self, id):
        q = """ MATCH (n:Anchor) WHERE n.document = "{0}" RETURN n """.format(id)
        with self._driver.session() as session:
            response = session.run(q)
            record = response.single()
            return record
