import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Document from '../../core/model/document';
import { BaseNode, NormNode, ConventionNode, JunctionNode, SanctionNode, NegationNode, ComponentNode, SubcomponentNode } from '../../core/model/nodes'
import { NodeType, JunctionType, ComponentType, SubcomponentType, Arg } from '../../core/model/enums';
import { Component } from '../../core/model/component';
import { Entry } from "../../core/model/entry";

Enzyme.configure({ adapter: new Adapter() });

let documentId = 0; // ID to be incremented for each Document created in the tests

beforeEach(() => {
  documentId++;
});

/*
Notes and guidelines for the data model
- Always type assert the node type when getting a node. This is to ensure that specific functions exist on the node.
  It's also because many getters (getLeft(), getRight()) are agnostic about the type of the child.
  Do it with "get() as <nodetype>".
- All child creation functions will overwrite any existing descendants (in the given position) without warning.
- Delete nodes with BaseNode.deleteChild().
  This will delete them in the tree structure, but variables pointing to them will still be valid.
  The actual data the variables point to will not be deleted until they all go out of scope.
- Several node types are created with dummy children. These children are of the BaseNode class
  and can be checked for using BaseNode.isDummy(). All getter functions check for dummy nodes,
  and throw an error if one is found.
- Component and Subcomponent nodes with a dummy child are considered leaf nodes.

  To print the entire document structure:
  console.log(JSON.stringify(document, null, 2));
*/

/*
it('Template for tests', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);

    // Test here
});
*/

/**
 * This test verifies that a simple tree is built without any errors being thrown.
 */
it('Basic statement test', () => {
    // Setup
    const statement = "The Program Manager may initiate suspension or revocation proceedings against a certified operation";
    const document = new Document("Program Manager Policy", "Description", documentId);
    document.createTree(Arg.norm, statement);
    let root = document.getRoot() as NormNode;

    /*
    Here are the steps to build the tree for this statement:
    1. Make the NormNode. Making a NormNode will automatically make its fixed children. Same with Convention.
    2. One at a time, make Components with data for the children. Done on each of the child nodes, except Object and Conditions.
        Object and Conditions nodes will automatically get fixed children.
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

	root.createObject();
    let obj = root.getObject() as ComponentNode;
    let dir = obj.getLeft() as SubcomponentNode;
    let indir = obj.getRight() as SubcomponentNode;
    dir.createJunctionNode();

    let dirJunction = dir.getChild() as JunctionNode;
    dirJunction.setJunction(JunctionType.xor);
    dirJunction.createSubcomponentNode(SubcomponentType.direct, Arg.left);
    dirJunction.createSubcomponentNode(SubcomponentType.direct, Arg.right);

    let dir1 = dirJunction.getLeft() as SubcomponentNode;
    dir1.setContent("suspension");

    let dir2 = dirJunction.getRight() as SubcomponentNode;
    dir2.setContent("revocation proceedings");

    indir.createSubcomponentNode(SubcomponentType.indirect);

    let dirChild = indir.getChild() as SubcomponentNode;
    dirChild.setContent("certified operation", "a");
});

//------------------------------------------------------------------------------

it('Set and unset text content', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createTree(Arg.norm);

    let root = document.getRoot() as NormNode;
    let attr = root.getAttributes() as ComponentNode;
    expect(attr.component.content).toBeUndefined();
    attr.setContent("two", "one", "three");				// Setting content first time
    expect(attr.component.content.main).toEqual("two");
    expect(attr.component.content.prefix).toEqual("one");
    expect(attr.component.content.suffix).toEqual("three");
    attr.setContent(undefined, "ONE");					// A new value for content
    expect(attr.component.content.main).toEqual("two");
    expect(attr.component.content.prefix).toEqual("ONE");
    attr.unsetContent();								// Unsetting content
    expect(attr.component.content).toBeUndefined();
});

//------------------------------------------------------------------------------

it('Delete a tree', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createTree(Arg.norm);

    let root1 = document.getRoot() as NormNode;
    expect(root1).toBeDefined();
    document.deleteTree(0);
    let root2 = document.getRoot() as NormNode;
    expect(root2).toBeUndefined();
});

//------------------------------------------------------------------------------

it('Add and delete a Sanction node to/from a tree', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createTree(Arg.convention);

    let root1 = document.getRoot() as ConventionNode;
    expect(root1.nodeType).toEqual(NodeType.convention);
    document.addSanctionNodeToTree(0);
    let root2 = document.getRoot() as SanctionNode;
    expect(root2.nodeType).toEqual(NodeType.sanction);

    document.deleteSanctionNodeFromTree(0);
    let root3 = document.getRoot() as ConventionNode;
    expect(root3.nodeType).toEqual(NodeType.convention);
});

//------------------------------------------------------------------------------

it('The subtree rule: no Component nodes outside of a Norm/Convention subtree', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createTree(Arg.norm);

    document.addSanctionNodeToTree(0);
    let root = document.getRoot() as SanctionNode;

    root.createJunctionNode(Arg.right);
    let junction = root.getRight() as JunctionNode;
    expect(() => { junction.createComponentNode(ComponentType.object, Arg.left) }).toThrow("subtree");
});

//------------------------------------------------------------------------------

it('Create nested children of the same type', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createTree(Arg.convention);

    let root = document.getRoot() as ConventionNode;
    let attr = root.getAttributes() as ComponentNode;
    attr.createJunctionNode();
    let junction1 = attr.getChild() as JunctionNode;
    junction1.createJunctionNode(Arg.left);
    let junction2 = junction1.getLeft() as JunctionNode;
});

//------------------------------------------------------------------------------

it('Delete a node', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createTree(Arg.convention);

    let root = document.getRoot() as ConventionNode;
    let attr = root.getAttributes() as ComponentNode;
    attr.createJunctionNode();
    attr.deleteChild(Arg.only);
    expect(() => { attr.getChild() }).toThrow("dummy"); // Newly deleted child should be a dummy node
});

//------------------------------------------------------------------------------

it('Find a node by ID', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createTree(Arg.norm);

	// Without tree index
    let node1 = document.find(9) as BaseNode;
    expect(node1).toBeDefined();
    expect(node1.id).toEqual(9);

	// With tree index
	let node2 = document.find(4, 0) as BaseNode;
    expect(node2).toBeDefined();
    expect(node2.id).toEqual(4);
});

//------------------------------------------------------------------------------

it('Toggle negation of a root node', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createTree(Arg.norm);

	// Toggling negation of a root node
    let root = document.getRoot() as NormNode;
	document.turnOnNegation(root, 0);
	expect(document.getRoot().nodeType === NodeType.negation);
	document.turnOffNegation(root, 0);
	expect(document.getRoot().nodeType === NodeType.norm);
});

//------------------------------------------------------------------------------

it('Toggle negation of a non-root node', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createTree(Arg.norm);

	// Toggling negation of a non-root node
	let root = document.getRoot() as NormNode;
	let attr = root.getAttributes() as ComponentNode;
	attr.createJunctionNode();
    let junction = attr.getChild() as JunctionNode;
	document.turnOnNegation(junction, 0);
	let child = attr.getChild() as BaseNode;
	expect(child.nodeType === NodeType.negation);
	// Attempting to turn on negation of a Negation node, which is forbidden
	expect(() => { document.turnOnNegation(child, 0) }).toThrow();
	document.turnOffNegation(junction, 0);
	expect(attr.getChild().nodeType === NodeType.junction);
});
