import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Document from "../../core/model/document";
import {
    BaseNode,
    ComponentJunctionNode,
    ComponentNode,
    PropertyJunctionNode,
    PropertyNode,
    RegulativeStatementNode
} from "../../core/model/nodes";
import {Entry} from "../../core/model/entry";
import {Arg, ComponentType, JunctionType} from "../../core/model/enums";
import {TextContent} from "../../core/model/textcontent";
import {Component} from "react";

Enzyme.configure({ adapter: new Adapter() });

let documentId = 0; // ID to be incremented for each Document created in the tests

beforeEach(() => {
  documentId++;
});

/*
Some guidelines for the data model
- Always type assert the node type when getting a node (`get() as <NodeType>`).
  It's to be able to access class-specific properties on the node.
- Delete Component nodes with <parent>.deleteChild() and optional Statement children with <statement>.delete*().
  This will delete them in the tree structure, but variables pointing to them will still be valid.
  The actual data the variables point to will not be deleted until they all go out of scope.
- Several node types are created with dummy children. These children are of the BaseNode class
  and can be checked for using BaseNode.isDummy(). All getter functions check for dummy nodes,
  and throw an error if one is found.

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
    expect(attr.text).toBeDefined();
    expect(attr.text.content).toBeUndefined();

    attr.setText("two", "one", "three");		// Setting content first time
    expect(attr.text.content.main).toEqual("two");
    expect(attr.text.content.prefix).toEqual("one");
    expect(attr.text.content.suffix).toEqual("three");

    attr.setText(undefined, "ONE");					// A new value for content
    expect(attr.text.content.main).toEqual("two");
    expect(attr.text.content.prefix).toEqual("ONE");

    attr.unsetText();								        // Unsetting content
    expect(attr.text.content).toBeUndefined();

    attr.setText(undefined, "one");				// Setting prefix only
    expect(attr.text.content.main).toEqual("");
    expect(attr.text.content.prefix).toEqual("one");
    expect(attr.text.content.suffix).toEqual("");
});

//------------------------------------------------------------------------------

it("Concatenate text content", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;
    let attr = root.getAttribute() as ComponentNode;
    let text = attr.getText();

    attr.setText("two", "one", "three"); // Main, prefix and suffix
    expect(text.getString()).toBe("one two three");

    attr.setText("two", "", "three");    // Main and suffix
    expect(text.getString()).toBe("two three");

    attr.setText("two", "one", "");      // Main and prefix
    expect(text.getString()).toBe("one two");

    attr.setText("", "one", "three");    // Prefix and suffix
    expect(text.getString()).toBe("one three");
});

//------------------------------------------------------------------------------

it("Delete an entry", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();

    document.deleteEntry(0);
    expect(document.entries.length).toEqual(0);
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

    attr.createPropertyNode();
    attr.deleteChild(Arg.only)
    expect(() => { attr.getChild(Arg.only) }).toThrow("no children");
});

//------------------------------------------------------------------------------

it("Find a node by ID in a Document", () => {
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

it("Find a child of a node by ID", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    // Multiple Execution Constraints
    let execstrts = root.getExecutionConstraints() as ComponentNode;
    let context1 = execstrts.createComponentNode(ComponentType.simplecontext) as ComponentNode;
    let context2 = execstrts.createComponentNode(ComponentType.simplecontext) as ComponentNode;
    let context3 = execstrts.createComponentNode(ComponentType.simplecontext) as ComponentNode;

    let contextIdx = execstrts.getChildIndexById(context3.id);
    expect(contextIdx).toEqual(2);

    // Multiple Properties
    let attr = root.getAttribute() as ComponentNode;
    let prop1 = attr.createPropertyNode() as PropertyNode;
    let prop2 = attr.createPropertyNode() as PropertyNode;

    let propIdx = attr.getChildIndexById(prop2.id);
    expect(propIdx).toEqual(1);
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

it('Rebuild a tree', () => {
    // Setup
    let document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    // Flesh out the tree with features
    let attr = root.getAttribute() as ComponentNode;
    attr.setText("Main Attribute");
    let attrProp1 = attr.createPropertyNode() as PropertyNode;
    attrProp1.setText("proposed");

    let dirobj = root.createDirectObject() as ComponentNode;
    let dirObjJun = dirobj.createComponentJunctionNode() as ComponentJunctionNode;
    let dirObjJunLeft = dirObjJun.createComponentNode(ComponentType.directobject, Arg.left) as ComponentNode;
    dirObjJunLeft.setText("left");

    let actconds = root.getActivationConditions() as ComponentNode;
    let context1 = actconds.createStatementNode(Arg.regulative) as RegulativeStatementNode;
    let context2 = actconds.createComponentNode(ComponentType.simplecontext) as ComponentNode;
    context2.setText("always");

    // Turn the document into a string then back into JSON to lose object classes
    let jsonStr = JSON.stringify(document);
    let jsonObj = JSON.parse(jsonStr) as Document;  // Narrow to Document in order to access Document.entries

    let newDocument = new Document("Test Policy", "Description", documentId, jsonObj.entries);

    // Check for object classes. Note that we are not type asserting on get*() functions unless necessary.
    expect(newDocument instanceof Document).toBeTruthy();
    let newEntry = newDocument.getEntry(0);
    expect(newEntry instanceof Entry).toBeTruthy();
    let newRoot = newEntry.getRoot() as RegulativeStatementNode;
    expect(newRoot instanceof RegulativeStatementNode).toBeTruthy();

    let newAttr = newRoot.getAttribute();
    expect(newAttr instanceof ComponentNode).toBeTruthy();
    let attrText = newAttr.getText();
    expect(attrText instanceof TextContent).toBeTruthy();
    expect(attrText.isSet()).toBeTruthy();
    expect(attrText.getString()).toBe("Main Attribute");

    let newProp = newAttr.getChild(Arg.only) as PropertyNode;
    expect(newProp instanceof PropertyNode).toBeTruthy();
    let propText = newProp.getText();
    expect(propText instanceof TextContent).toBeTruthy();
    expect(propText.isSet()).toBeTruthy();
    expect(propText.getString()).toBe("proposed");

    let newDirObj = newRoot.getDirectObject() as ComponentNode;
    expect(newDirObj instanceof ComponentNode).toBeTruthy();
    let newDirObjJun = newDirObj.getChild(Arg.only);
    expect(newDirObjJun instanceof ComponentJunctionNode).toBeTruthy();

    let newActConds = newRoot.getActivationConditions();
    expect(newActConds instanceof ComponentNode);
    let newContext1 = newActConds.getChild(0);
    expect(newContext1 instanceof RegulativeStatementNode);
    let newContext2 = newActConds.getChild(1);
    expect(newContext2 instanceof ComponentNode);
});

//------------------------------------------------------------------------------
