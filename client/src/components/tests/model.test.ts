import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Document from "../../core/model/document";
import {
    BaseNode,
    ComponentJunctionNode,
    ComponentNode,
    PropertyJunctionNode, PropertyNode,
    RegulativeStatementNode
} from "../../core/model/nodes";
import {Arg, ComponentType, JunctionType} from "../../core/model/enums";

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

//------------------------------------------------------------------------------
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
    1. Make a Document and an Entry within it.
    2. Make a RegulativeStatementNode as the Entry's root and feed it the raw statement.
        This will automatically make its fixed children.
    3. For each of Attribute, Aim and Deontic, add text content. (Also enable the Deontic.)
    4. Enable the direct object and make a ComponentJunction node under it.
    5. Set the ComponentJunctionNode's Junction type.
    6. Make leaf Component nodes for the direct objects.
    7. Enable the indirect object and make a leaf Component node under it.
    8. Add text content to the nodes from steps 6 and 7.
    */

    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative, statement) as RegulativeStatementNode;

    let attr = root.getAttribute() as ComponentNode;
    attr.setText("Program Manager", "The");

    let deontic = root.createDeontic() as ComponentNode;
    deontic.setText("may");

    let aim = root.getAim() as ComponentNode;
    aim.setText("initiate");

	let directObject = root.createDirectObject() as ComponentNode;

    let dirJunction = directObject.createComponentJunctionNode() as ComponentJunctionNode;
    dirJunction.setJunction(JunctionType.xor);
    dirJunction.createComponentNode(ComponentType.directobject, Arg.left);
    dirJunction.createComponentNode(ComponentType.directobject, Arg.right);

    let directA = dirJunction.getLeft() as ComponentNode;
    directA.setText("suspension");

    let directB = dirJunction.getRight() as ComponentNode;
    directB.setText("revocation proceedings");

    let indirectObject = root.createIndirectObject() as ComponentNode;
    indirectObject.setText("certified operation", "a");

});

//------------------------------------------------------------------------------

it('Statement with properties', () => {
    // Setup
    const statement = "The Program Manager may initiate suspension or revocation proceedings against a certified operation";
    const document = new Document("Program Manager Policy", "Description", documentId);

    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative, statement) as RegulativeStatementNode;

    let attr = root.getAttribute() as ComponentNode;
    attr.setText("Program Manager", "The");

    let deontic = root.createDeontic() as ComponentNode;
    deontic.setText("may");

    let aim = root.getAim() as ComponentNode;
    aim.setText("initiate");

    let directObject = root.createDirectObject() as ComponentNode;
    directObject.setText("proceedings");

    let dirPropJunction = directObject.createPropertyJunctionNode() as PropertyJunctionNode;
    dirPropJunction.setJunction(JunctionType.xor);

    let dirPropA = dirPropJunction.createPropertyNode(Arg.left) as PropertyNode;
    dirPropA.setText("suspension");

    let dirPropB = dirPropJunction.createPropertyNode(Arg.right) as PropertyNode;
    dirPropB.setText("revocation");

    let indirectObject = root.createIndirectObject() as ComponentNode;
    indirectObject.setText("operation");

    let indirProp = indirectObject.createPropertyNode() as PropertyNode;
    indirProp.setText("certified");
});

//------------------------------------------------------------------------------

it("Set and unset text content", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    let attr = root.getAttribute() as ComponentNode;
    expect(attr.text.content).toBeUndefined();

    attr.setText("two", "one", "three");				// Setting content first time
    expect(attr.text.content.main).toEqual("two");
    expect(attr.text.content.prefix).toEqual("one");
    expect(attr.text.content.suffix).toEqual("three");

    attr.setText(undefined, "ONE");					// A new value for content
    expect(attr.text.content.main).toEqual("two");
    expect(attr.text.content.prefix).toEqual("ONE");

    attr.unsetText();								// Unsetting content
    expect(attr.text.content).toBeUndefined();
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
    expect(() => { attr.getChild(Arg.only) }).toThrow("no children");
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

it('Elevate isFunctionallyDependent', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);

    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    // Create a chain of PropertyJunction nodes followed by a leaf Property node
    let attr = root.getAttribute() as ComponentNode;
    let propJun1 = attr.createPropertyJunctionNode() as PropertyJunctionNode;
    let propJun2 = propJun1.createPropertyJunctionNode(Arg.left) as PropertyJunctionNode;
    let prop1 = propJun2.createPropertyNode(Arg.left) as PropertyNode;

    // Set the isFD flag of prop1 to true and test elevateFunctionallyDependent() with prop1's values
    prop1.makeFunctionallyDependent();
    attr.elevateFunctionallyDependent(prop1.parent, prop1.isFunctionallyDependent);

    // Both ancestor PropertyJunction nodes should have their isFD flag set to true
    expect(propJun1.isFunctionallyDependent).toBeTruthy();
    expect(propJun2.isFunctionallyDependent).toBeTruthy();
});

//------------------------------------------------------------------------------


it('Throw a specific error', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);

    expect(() => { document.getRoot(-1)}).toThrow("index out of bounds");
});


//------------------------------------------------------------------------------
