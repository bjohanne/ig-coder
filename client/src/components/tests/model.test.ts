import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Document from "../../core/model/document";
import { BaseNode, ComponentNode, RegulativeStatementNode, ComponentJunctionNode } from "../../core/model/nodes";
import { JunctionType, ComponentType, Arg } from "../../core/model/enums";
import { DataErrorType } from "../../core/model/errors";

Enzyme.configure({ adapter: new Adapter() });

let documentId = 0; // ID to be incremented for each Document created in the tests

beforeEach(() => {
  documentId++;
});

/*
Notes and guidelines for the data model
- Always type assert the node type when getting a node (`get() as <NodeType>`).
  It's because many getters (getLeft(), getRight()) are agnostic about the type of the child.
- Delete nodes with <NodeClass>.deleteChild().
  This will delete them in the tree structure, but variables pointing to them will still be valid.
  The actual data the variables point to will not be deleted until they all go out of scope.
- Several node types are created with dummy children. These children are of the BaseNode class
  and can be checked for using BaseNode.isDummy(). All getter functions check for dummy nodes,
  and throw an error if one is found.
- Component nodes with a dummy child are considered leaf nodes.

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
it("Basic statement test", () => {
    // Setup
    const statement = "The Program Manager may initiate suspension or revocation proceedings against a certified operation";
    const document = new Document("Program Manager Policy", "Description", documentId);

    /*
    Here are the steps to build the tree for this statement:
    1. Make a Document and an Entry within it. Mark the Entry as Regulative and feed it the raw statement.
    2. Make a RegulativeStatementNode as the Entry's root. This will automatically make its fixed children.
    3. For each of Attribute, Aim and Deontic, add component text.
    4. For the direct object (Object's left child), make a ComponentJunction node.
    5. Set the ComponentJunctionNode's Junction type.
    6. One at a time, make leaf Component nodes for the direct and indirect objects.
    7. Add component text to the nodes from step 6.
    */

    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative, statement) as RegulativeStatementNode;

    let attr = root.getAttribute() as ComponentNode;
    attr.setContent("Program Manager", "The");

    let deontic = root.createDeontic() as ComponentNode;
    deontic.setContent("may");

    let aim = root.getAim() as ComponentNode;
    aim.setContent("initiate");

	let obj = root.createObject() as ComponentNode;

    let dirJunction = obj.createComponentJunctionNode(Arg.left) as ComponentJunctionNode;
    dirJunction.setJunction(JunctionType.xor);
    dirJunction.createComponentNode(ComponentType.directobject, Arg.left);
    dirJunction.createComponentNode(ComponentType.directobject, Arg.right);

    let dir1 = dirJunction.getLeft() as ComponentNode;
    dir1.setContent("suspension");

    let dir2 = dirJunction.getRight() as ComponentNode;
    dir2.setContent("revocation proceedings");

    let indirect = obj.createComponentNode(ComponentType.indirectobject, Arg.right) as ComponentNode;
    indirect.setContent("certified operation", "a");
});

//------------------------------------------------------------------------------

it("Set and unset text content", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    let attr = root.getAttribute() as ComponentNode;
    expect(attr.primitive.content).toBeUndefined();
    attr.setContent("two", "one", "three");				// Setting content first time
    expect(attr.primitive.content.main).toEqual("two");
    expect(attr.primitive.content.prefix).toEqual("one");
    expect(attr.primitive.content.suffix).toEqual("three");
    attr.setContent(undefined, "ONE");					// A new value for content
    expect(attr.primitive.content.main).toEqual("two");
    expect(attr.primitive.content.prefix).toEqual("ONE");
    attr.unsetContent();								// Unsetting content
    expect(attr.primitive.content).toBeUndefined();
});

//------------------------------------------------------------------------------

it("Delete a tree", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();

    expect(entry).toBeDefined();
    document.deleteEntry(0);
    expect(document.entries[0]).toBeUndefined();
});

//------------------------------------------------------------------------------

it("Create nested children of the same type", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    let attr = root.getAttribute() as ComponentNode;
    let junction1 = attr.createComponentJunctionNode() as ComponentJunctionNode;
    junction1.createComponentJunctionNode(Arg.left);
});

//------------------------------------------------------------------------------

it("Delete a node", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    let attr = root.getAttribute() as ComponentNode;
    attr.createComponentJunctionNode();
    attr.deleteChild(Arg.only);
    expect(() => { attr.getChild(Arg.only) }).toThrow(DataErrorType.CMP_GET_DUM); // Newly deleted child should be a dummy node
});

//------------------------------------------------------------------------------

it("Find a node by ID", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    entry.createRoot(Arg.regulative);

    // Without tree index
    let node1 = document.find(7) as BaseNode;
    expect(node1).toBeDefined();
    expect(node1.id).toEqual(7);

    // With tree index
	let node2 = document.find(2, 0) as BaseNode;
    expect(node2).toBeDefined();
    expect(node2.id).toEqual(2);
});

//------------------------------------------------------------------------------

it("Rebuild dates", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    entry.createRoot(Arg.constitutive);

    document.rebuildDates(0);
});

//------------------------------------------------------------------------------
