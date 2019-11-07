import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Document from '../../core/model/document';
import { NormNode, ConventionNode, JunctionNode, SanctionNode, NegationNode, ComponentNode, SubcomponentNode } from '../../core/model/nodes'
import { NodeType, JunctionType, ComponentType, SubcomponentType } from '../../core/model/enums';
import { Component } from '../../core/model/component';
import { Entry } from "../../core/model/entry";

Enzyme.configure({adapter: new Adapter()});

/*
Notes and guidelines for the data model
- Always type assert the node type when getting a node.
  This is to ensure that specific functions exist on the node.
- All child creation functions will overwrite any existing descendants (in the given index) without warning.
- Delete nodes with either Document.deleteTree() or BaseNode.deleteChild().
  This will delete them in the tree structure, but variables pointing to them will still be valid.
  The actual data the variables point to will not be deleted until they all go out of scope.
- Several node types are created with dummy children. These children are of the BaseNode class
  and can be identified by not having a NodeType. All getter functions check for dummy nodes,
  and throw an error if one is found.
- Component and Subcomponent nodes with a dummy child are considered leaf nodes.

  To print the tree structure:
  console.log(JSON.stringify(document, null, 2));
*/

/**
 * This test verifies that a simple tree is built without any errors being thrown.
 */
it('Basic statement test', () => {
    // Setup
    const statement = "The Program Manager may initiate suspension or revocation proceedings against a certified operation";
    const document = new Document("Program Manager Policy", "description is missing", 101);
    const id = document.id;
    document.createTree(statement, true);
    let root = document.getRoot() as NormNode;

    /*
    Here are the steps to build the tree for this statement:
    1. Make the NormNode. Making a NormNode should automatically make its fixed children. Same with Convention.
    2. One at a time, make Components with data for the children. Done on each of the child nodes, except Object and Conditions.
        Object and Conditions nodes should automatically get fixed children.
    3. Make a Junction node for the direct object, under the Object node's left child.
    4. Set the JNode's Junction.
    5. One at a time, make Subcomponent nodes for the indirect and direct object.
    6. Make Subcomponents with data for the indirect and direct objects.
    */

    let attr = root.getAttributes() as ComponentNode;
    attr.setContent("Program Manager", "The");

    let deontic = root.getDeontic() as ComponentNode;
    deontic.setContent("may");

    let aim = root.getAim() as ComponentNode;
    aim.setContent("initiate");

    let obj = root.getObject() as ComponentNode;
    let dir = obj.getLeft() as SubcomponentNode;
    let indir = obj.getRight() as SubcomponentNode;
    dir.createJunctionNode();

    let dirJunction = dir.getChild() as JunctionNode;
    dirJunction.setJunction(JunctionType.xor);
    dirJunction.createSubcomponentNode(SubcomponentType.direct, 0);
    dirJunction.createSubcomponentNode(SubcomponentType.direct, 1);

    let dir1 = dirJunction.getLeft() as SubcomponentNode;
    dir1.setContent("suspension");

    let dir2 = dirJunction.getRight() as SubcomponentNode;
    dir2.setContent("revocation proceedings");

    indir.createSubcomponentNode(SubcomponentType.indirect);

    let dirChild = indir.getChild() as SubcomponentNode;
    dirChild.setContent("certified operation", "a");
  });

  /**
   * Tests miscellaneous functionality like node deletion and adding and deleting Sanction nodes.
   */
  it('Test for miscellaneous functionality', () => {
      // Setup
      const document = new Document("Test Policy", "description is missing", 102);
      const id = document.id;
      document.createTree("", true);

      // Deleting a tree
      let root = document.getRoot();
      expect(root).toBeDefined();
      if (typeof root !== "undefined") {
          document.deleteTree(root.id);
      }
      root = document.getRoot();
      expect(root).toBeUndefined();

      // Adding and deleting a Sanction node to a tree
      document.createTree("", false);
      root = document.getRoot() as ConventionNode;
      expect(root.nodeType).toEqual(NodeType.convention);
      document.addSanctionNodeToTree(root.id);
      root = document.getRoot() as SanctionNode;
      expect(root.nodeType).toEqual(NodeType.sanction);
      document.deleteSanctionNodeFromTree(root.id);

      // Nested children of the same node type; child deletion
      let root2 = document.getRoot() as ConventionNode; // New root variable for correct type assertion
      let attr = root2.getAttributes() as ComponentNode;
      attr.createJunctionNode();
      let junction1 = attr.getChild() as JunctionNode;
      junction1.createJunctionNode(0);
      let junction2 = junction1.getLeft() as JunctionNode;
      attr.deleteChild(junction1.id);
      expect(() => { attr.getChild() }).toThrow("dummy"); // Newly deleted child should be a dummy node
  });
