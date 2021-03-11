import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Document from "../../core/model/document";
import {
    ComponentJunctionNode,
    ComponentNode,
    PropertyNode,
    RegulativeStatementNode
} from "../../core/model/nodes";
import {Entry} from "../../core/model/entry";
import {Arg, ComponentType, JunctionType} from "../../core/model/enums";
import {TextContent} from "../../core/model/textcontent";
import {IPropertyNode, IRegulativeStatementNode} from "../../core/model/interfaces";

Enzyme.configure({ adapter: new Adapter() });

let documentId = 0; // ID to be incremented for each Document created in the tests

beforeEach(() => {
  documentId++;
});

/*
Some guidelines for the data model
- For some functions you need to type assert the node type of the return value (some of get*(), find() and create*()).
  If you need to do so, this is specified in the function's JSDoc.
  To do so, append " as <NodeClass>" to the function call, e.g. "let leftChild = junctionNode.getLeft() as ComponentNode".
- Ways to delete a child node, based on the type of the parent:
    - Statement: delete*()
    - Junction: deleteLeft(), deleteRight()
    - Component: deleteChild()
    - Property: deleteChild()
  This will delete them in the tree structure, but variables pointing to them will still be valid.
  The actual data the variables point to will not be deleted until they all go out of scope.
- Several node types are created with dummy children. These children are of the BaseNode class
   and can be checked for using BaseNode.isDummy(). All getter functions of nodes that can have dummy children
   check for dummy nodes, and throw an error if one is found.

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
it('Basic statement with properties', () => {
    /*
    Here are the steps to build the tree for this statement:
    1. Make a Document and an Entry within it.
    2. Make a RegulativeStatement node as the Entry's root and feed it the raw statement.
        This will automatically make its fixed children.
    3. For each of Attribute, Aim and Deontic, add text content. (Also enable the Deontic.)
    4. Enable the direct object, add text content to it and make a PropertyJunction node under it.
    5. Set the PropertyJunction node's Junction type.
    6. Make Property nodes for the direct object.
    7. Enable the indirect object and make a Property node under it.
    8. Add text content to the nodes from steps 6 and 7.
    */

    // Setup
    const statement = "The Program Manager may initiate suspension or revocation proceedings against a certified operation";
    const document = new Document("Program Manager Policy", "Description", documentId);

    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative, statement) as RegulativeStatementNode;

    let attr = root.getAttribute();
    attr.setText("Program Manager", "The");

    let deontic = root.createDeontic();
    deontic.setText("may");

    let aim = root.getAim();
    aim.setText("initiate");

    let directObject = root.createDirectObject();
    directObject.setText("proceedings");

    let dirPropJunction = directObject.createPropertyJunctionNode();
    dirPropJunction.setJunction(JunctionType.xor);

    let dirPropA = dirPropJunction.createPropertyNode(Arg.left);
    dirPropA.setText("suspension");

    let dirPropB = dirPropJunction.createPropertyNode(Arg.right);
    dirPropB.setText("revocation");

    let indirectObject = root.createIndirectObject();
    indirectObject.setText("operation", "against a");

    let indirProp = indirectObject.createPropertyNode();
    indirProp.setText("certified");
});

//------------------------------------------------------------------------------

it("Set and unset text content", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    let attr = root.getAttribute();
    expect(attr.text).toBeDefined();
    expect(attr.text.main).toBeUndefined();

    attr.setText("two", "one", "three");		// Setting content first time
    expect(attr.text.main).toEqual("two");
    expect(attr.text.prefix).toEqual("one");
    expect(attr.text.suffix).toEqual("three");

    attr.setText(undefined, "ONE");					// A new value for content
    expect(attr.text.main).toEqual("two");
    expect(attr.text.prefix).toEqual("ONE");

    attr.unsetText();								        // Unsetting content
    expect(attr.text.main).toBeUndefined();

    attr.setText(undefined, "one");				// Setting prefix only
    expect(attr.text.main).toBeUndefined();
    expect(attr.text.prefix).toEqual("one");
    expect(attr.text.suffix).toBeUndefined();
});

//------------------------------------------------------------------------------

it("Concatenate text content", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;
    let attr = root.getAttribute();
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

it('Check if text content is empty for Junction nodes', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;
    let attr = root.getAttribute();
    let text = attr.getText();

    expect(text.isEmptyOrJunctionDefault()).toBeTruthy(); // Should return true if text content is unset

    attr.setText("abc", "def", "ghi");
    expect(text.isEmptyOrJunctionDefault()).toBeFalsy();  // Should return false if text content is set and not empty

    attr.setText("and", "def", "ghi");
    expect(text.isEmptyOrJunctionDefault()).toBeTruthy(); // Should return true if text content is set and the main slot is "and" or "or"
});

//------------------------------------------------------------------------------

it("Delete an entry", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    document.createEntry();

    document.deleteEntry(0);
    expect(document.entries.length).toEqual(0);
});

//------------------------------------------------------------------------------

it("Create nested children of the same type", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    let attr = root.getAttribute();
    let junction1 = attr.createComponentJunctionNode();
    junction1.createComponentJunctionNode(Arg.left);
});

//------------------------------------------------------------------------------

it("Delete a node", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    let attr = root.getAttribute();
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
    let node1 = document.find(7);
    expect(node1).toBeDefined();
    expect(node1.id).toEqual(7);

    // With tree index
	let node2 = document.find(2, 0);
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
    let execstrts = root.getExecutionConstraints();
    execstrts.createComponentNode(ComponentType.simplecontext);
    execstrts.createComponentNode(ComponentType.simplecontext);
    let context3 = execstrts.createComponentNode(ComponentType.simplecontext);

    let contextIdx = execstrts.getChildIndexById(context3.id);
    expect(contextIdx).toEqual(2);

    // Multiple Properties
    let attr = root.getAttribute();
    attr.createPropertyNode();
    let prop2 = attr.createPropertyNode();

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
    let attr = root.getAttribute();
    let propJun1 = attr.createPropertyJunctionNode();
    let propJun2 = propJun1.createPropertyJunctionNode(Arg.left);
    let prop1 = propJun2.createPropertyNode(Arg.left);

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
    let attr = root.getAttribute();
    attr.setText("Main Attribute");
    let attrProp1 = attr.createPropertyNode();
    attrProp1.setText("proposed");

    let dirobj = root.createDirectObject();
    let dirObjJun = dirobj.createComponentJunctionNode();
    let dirObjJunLeft = dirObjJun.createComponentNode(ComponentType.directobject, Arg.left);
    dirObjJunLeft.setText("left");

    let actConds = root.getActivationConditions();
    actConds.createStatementNode(Arg.regulative);
    let context2 = actConds.createComponentNode(ComponentType.simplecontext);
    context2.setText("always");

    // Turn the document into a string then back into JSON to lose object classes
    let jsonStr = JSON.stringify(document);
    let jsonObj = JSON.parse(jsonStr);

    let newDocument = Document.fromData(jsonObj);   // Kick off the Document rebuilding process

    // Check for object classes. Note that we are not type asserting on get*() functions unless necessary.
    expect(newDocument instanceof Document).toBeTruthy();
    let newEntry = newDocument.getEntry(0);
    expect(newEntry instanceof Entry).toBeTruthy();
    let newRoot = newEntry.getRoot() as IRegulativeStatementNode;
    expect(newRoot instanceof RegulativeStatementNode).toBeTruthy();

    let newAttr = newRoot.getAttribute();
    expect(newAttr instanceof ComponentNode).toBeTruthy();
    let attrText = newAttr.getText();
    expect(attrText instanceof TextContent).toBeTruthy();
    expect(attrText.isSet()).toBeTruthy();
    expect(attrText.getString()).toBe("Main Attribute");

    let newProp = newAttr.getChild(Arg.only) as IPropertyNode;
    expect(newProp instanceof PropertyNode).toBeTruthy();
    let propText = newProp.getText();
    expect(propText instanceof TextContent).toBeTruthy();
    expect(propText.isSet()).toBeTruthy();
    expect(propText.getString()).toBe("proposed");

    let newDirObj = newRoot.getDirectObject();
    expect(newDirObj instanceof ComponentNode).toBeTruthy();
    let newDirObjJun = newDirObj.getChild(Arg.only);
    expect(newDirObjJun instanceof ComponentJunctionNode).toBeTruthy();

    let newActConds = newRoot.getActivationConditions();
    expect(newActConds instanceof ComponentNode).toBeTruthy();
    let newContext1 = newActConds.getChild(0);
    expect(newContext1 instanceof RegulativeStatementNode).toBeTruthy();
    let newContext2 = newActConds.getChild(1);
    expect(newContext2 instanceof ComponentNode).toBeTruthy();
});

//------------------------------------------------------------------------------

it('Set text content on Junction nodes', () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;
    let attr = root.getAttribute();
    let junction = attr.createComponentJunctionNode();
    let text = junction.getText();

    // Set junction type and check default text
    junction.setJunction(JunctionType.and);
    expect(text.getString()).toBe("and");

    // Set to custom text, then set junction type, then check for custom text
    junction.setText("either or");
    junction.setJunction(JunctionType.xor);
    expect(text.getString()).toBe("either or");

});

//------------------------------------------------------------------------------
