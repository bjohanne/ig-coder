import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Document from "../../core/model/document";
import {
    ComponentJunctionNode,
    ComponentNode,
    ConstitutiveStatementNode,
    PropertyNode,
    RegulativeStatementNode
} from "../../core/model/nodes";
import {Entry} from "../../core/model/entry";
import {
    Arg,
    ComponentType,
    ContextType,
    JunctionType
} from "../../core/model/enums";
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
it("Template for tests", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);

    // Test here
});

//------------------------------------------------------------------------------
*/

/** Generator for the test document */
it("TEST DOCUMENT GENERATOR", () => {
    // Setup
    const document = new Document("Program Manager Policy", "", 1);

    /* ------------------------1------------------------ */

    const statement = "The Program Manager may initiate suspension or revocation proceedings against a certified operation: (1) When the Program Manager has reason to believe that a certified operation has violated or is not in compliance with the Act or regulations in this part; or (2) When a certifying agent or a State organic program's governing State official fails to take appropriate action to enforce the Act or regulations in this part.";
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative, statement) as RegulativeStatementNode;
    root.setContextType(ContextType.temporal);
    entry.setRephrased("This is a rephrased version of Program Manager policy.");

    root.getAttribute().setText("Program Manager", "The");
    root.createDeontic().setText("may");
    root.getAim().setText("initiate");

    let directObject = root.createDirectObject();
    directObject.setText("proceedings");

    let dirPropJunction = directObject.createPropertyJunctionNode(JunctionType.xor);
    dirPropJunction.setText("or");

    dirPropJunction.createPropertyNode(Arg.left).setText("suspension");

    dirPropJunction.createPropertyNode(Arg.right).setText("revocation");

    let indirectObject = root.createIndirectObject();
    indirectObject.setText("operation", "against a");

    indirectObject.createPropertyNode().setText("certified");

    let actConds = root.getActivationConditions();
    let lvl2StmtJunction = actConds.createStatementJunctionNode(JunctionType.or);
    lvl2StmtJunction.setText("or");

    let lvl2Stmt1 = lvl2StmtJunction.createStatementNode(Arg.regulative, Arg.left) as RegulativeStatementNode;

    lvl2Stmt1.getAttribute().setText("Program Manager", "the");
    lvl2Stmt1.getAim().setText("has reason to believe", undefined, "that","suspects");
    let lvl2Stmt1DirObj = lvl2Stmt1.createDirectObject();

    let lvl3Stmt = lvl2Stmt1DirObj.createStatementNode(Arg.regulative) as RegulativeStatementNode;

    let lvl3StmtAttr = lvl3Stmt.getAttribute();
    lvl3StmtAttr.setText("operation", "a");
    lvl3StmtAttr.createPropertyNode().setText("certified");

    let lvl3StmtDirJunction = lvl3Stmt.createDirectObject().createComponentJunctionNode(JunctionType.or);
    lvl3StmtDirJunction.setText("or");
    lvl3StmtDirJunction.createComponentNode(ComponentType.directobject, Arg.left).setText("Act", "the");

    let lvl3StmtDirRight = lvl3StmtDirJunction.createComponentNode(ComponentType.directobject, Arg.right);
    lvl3StmtDirRight.setText("regulations");
    lvl3StmtDirRight.createPropertyNode().setText("in this part");

    let lvl3StmtAimJunction = lvl3Stmt.getAim().createComponentJunctionNode(JunctionType.or);
    lvl3StmtAimJunction.setText("or");
    lvl3StmtAimJunction.createComponentNode(ComponentType.aim, Arg.left).setText("has violated");

    let lvl3StmtAimRight = lvl3StmtAimJunction.createComponentNode(ComponentType.aim, Arg.right);
    lvl3StmtAimRight.setText("is not in compliance");
    lvl3StmtAimRight.turnNegationOn();

    let lvl2Stmt2 = lvl2StmtJunction.createStatementNode(Arg.regulative, Arg.right) as RegulativeStatementNode;

    let lvl2Stmt2AttrJunction = lvl2Stmt2.getAttribute().createComponentJunctionNode(JunctionType.or);
    lvl2Stmt2AttrJunction.setText("or");

    let lvl2Stmt2AttrLeft = lvl2Stmt2AttrJunction.createComponentNode(ComponentType.attribute, Arg.left);
    lvl2Stmt2AttrLeft.setText("agent", "a");
    let lvl2Stmt2AttrRight = lvl2Stmt2AttrJunction.createComponentNode(ComponentType.attribute, Arg.right);
    lvl2Stmt2AttrRight.setText("State official", "a");

    lvl2Stmt2AttrLeft.createPropertyNode().setText("certifying");
    lvl2Stmt2AttrRight.createPropertyNode().setText("State organic program's");
    lvl2Stmt2AttrRight.createPropertyNode().setText("governing");

    let lvl2Stmt2DirJunction = lvl2Stmt2.createDirectObject().createComponentJunctionNode(JunctionType.or);
    lvl2Stmt2DirJunction.setText("or");
    lvl2Stmt2DirJunction.createComponentNode(ComponentType.directobject, Arg.left).setText("Act", "the");

    let lvl2Stmt2DirRight = lvl2Stmt2DirJunction.createComponentNode(ComponentType.directobject, Arg.right);
    lvl2Stmt2DirRight.setText("regulations");
    lvl2Stmt2DirRight.createPropertyNode().setText("in this part");

    let lvl2Stmt2Aim = lvl2Stmt2.getAim();
    lvl2Stmt2Aim.setText("fails to take appropriate action to enforce", undefined, undefined, "fails to enforce");
    lvl2Stmt2Aim.turnNegationOn();

    /* ------------------------2------------------------ */

    const statement2 = "From 1st of January onward, food preparation guidelines must adhere to national standards, in addition to communal provisions.";
    let entry2 = document.createEntry();
    let root2 = entry2.createRoot(Arg.constitutive, statement2) as ConstitutiveStatementNode;

    root2.getConstitutedEntity().setText("food preparation guidelines");
    root2.createModal().setText("must");
    root2.getConstitutiveFunction().setText("adhere", undefined, "to");
    root2.createConstitutingProperties().setText("national standards");
    let actconds = root2.getActivationConditions();
    actconds.createComponentNode(ComponentType.simplecontext).setText("From 1st of January onward");
    let execstrts = root2.getExecutionConstraints();
    execstrts.createComponentNode(ComponentType.simplecontext).setText("communal provisions", "in addition to");

    /* ------------------------3------------------------ */

    const statement3 = "Organic farmers must comply with organic farming regulations, or else certifiers must revoke the organic farming certification.";
    let entry3 = document.createEntry();
    let root3 = entry3.createRoot(Arg.regulative, statement3) as RegulativeStatementNode;

    root3.getAttribute().setText("Organic farmers");
    root3.createDeontic().setText("must");
    root3.getAim().setText("comply", undefined, "with");
    root3.createDirectObject().setText("organic farming regulations");
    let orelse = root3.createOrElse();

    let nestedStmt = orelse.createStatementNode(Arg.regulative) as RegulativeStatementNode;
    nestedStmt.getAttribute().setText("certifiers");
    nestedStmt.createDeontic().setText("must");
    nestedStmt.getAim().setText("revoke");
    nestedStmt.createDirectObject().setText("organic farming certification", "the");

    //console.log(JSON.stringify(document, null, 2));

});

/**
 * This test verifies that a complete tree is built without any errors being thrown. (NB: Does not test Or else.)
 */
it("Full statement with properties", () => {
    // Setup
    const statement = "The Program Manager may initiate suspension or revocation proceedings against a certified operation: (1) When the Program Manager has reason to believe that a certified operation has violated or is not in compliance with the Act or regulations in this part; or (2) When a certifying agent or a State organic program's governing State official fails to take appropriate action to enforce the Act or regulations in this part.";
    const document = new Document("Program Manager Policy", "", documentId);

    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative, statement) as RegulativeStatementNode;
    root.setContextType(ContextType.temporal);
    entry.setRephrased("This is a rephrased version of Program Manager policy.");

    root.getAttribute().setText("Program Manager", "The");

    root.createDeontic().setText("may");

    root.getAim().setText("initiate");

    let directObject = root.createDirectObject();
    directObject.setText("proceedings");

    let dirPropJunction = directObject.createPropertyJunctionNode(JunctionType.xor);
    dirPropJunction.setText("or");

    dirPropJunction.createPropertyNode(Arg.left).setText("suspension");

    dirPropJunction.createPropertyNode(Arg.right).setText("revocation");

    let indirectObject = root.createIndirectObject();
    indirectObject.setText("operation", "against a");

    indirectObject.createPropertyNode().setText("certified");

    let actConds = root.getActivationConditions();
    let lvl2StmtJunction = actConds.createStatementJunctionNode(JunctionType.or);
    lvl2StmtJunction.setText("or");

    let lvl2Stmt1 = lvl2StmtJunction.createStatementNode(Arg.regulative, Arg.left) as RegulativeStatementNode;

    lvl2Stmt1.getAttribute().setText("Program Manager", "the");
    lvl2Stmt1.getAim().setText("has reason to believe", undefined, "that","suspects");
    let lvl2Stmt1DirObj = lvl2Stmt1.createDirectObject();

    let lvl3Stmt = lvl2Stmt1DirObj.createStatementNode(Arg.regulative) as RegulativeStatementNode;

    let lvl3StmtAttr = lvl3Stmt.getAttribute();
    lvl3StmtAttr.setText("operation", "a");
    lvl3StmtAttr.createPropertyNode().setText("certified");

    let lvl3StmtDirJunction = lvl3Stmt.createDirectObject().createComponentJunctionNode(JunctionType.or);
    lvl3StmtDirJunction.setText("or");
    lvl3StmtDirJunction.createComponentNode(ComponentType.directobject, Arg.left).setText("Act", "the");

    let lvl3StmtDirRight = lvl3StmtDirJunction.createComponentNode(ComponentType.directobject, Arg.right);
    lvl3StmtDirRight.setText("regulations");
    lvl3StmtDirRight.createPropertyNode().setText("in this part");

    let lvl3StmtAimJunction = lvl3Stmt.getAim().createComponentJunctionNode(JunctionType.or);
    lvl3StmtAimJunction.setText("or");
    lvl3StmtAimJunction.createComponentNode(ComponentType.aim, Arg.left).setText("has violated");

    let lvl3StmtAimRight = lvl3StmtAimJunction.createComponentNode(ComponentType.aim, Arg.right);
    lvl3StmtAimRight.setText("is not in compliance");
    lvl3StmtAimRight.turnNegationOn();

    let lvl2Stmt2 = lvl2StmtJunction.createStatementNode(Arg.regulative, Arg.right) as RegulativeStatementNode;

    let lvl2Stmt2AttrJunction = lvl2Stmt2.getAttribute().createComponentJunctionNode(JunctionType.or);
    lvl2Stmt2AttrJunction.setText("or");

    let lvl2Stmt2AttrLeft = lvl2Stmt2AttrJunction.createComponentNode(ComponentType.attribute, Arg.left);
    lvl2Stmt2AttrLeft.setText("agent", "a");
    let lvl2Stmt2AttrRight = lvl2Stmt2AttrJunction.createComponentNode(ComponentType.attribute, Arg.right);
    lvl2Stmt2AttrRight.setText("State official", "a");

    lvl2Stmt2AttrLeft.createPropertyNode().setText("certifying");
    lvl2Stmt2AttrRight.createPropertyNode().setText("State organic program's");
    lvl2Stmt2AttrRight.createPropertyNode().setText("governing");

    let lvl2Stmt2DirJunction = lvl2Stmt2.createDirectObject().createComponentJunctionNode(JunctionType.or);
    lvl2Stmt2DirJunction.setText("or");
    lvl2Stmt2DirJunction.createComponentNode(ComponentType.directobject, Arg.left).setText("Act", "the");

    let lvl2Stmt2DirRight = lvl2Stmt2DirJunction.createComponentNode(ComponentType.directobject, Arg.right);
    lvl2Stmt2DirRight.setText("regulations");
    lvl2Stmt2DirRight.createPropertyNode().setText("in this part");

    let lvl2Stmt2Aim = lvl2Stmt2.getAim();
    lvl2Stmt2Aim.setText("fails to take appropriate action to enforce", undefined, undefined, "fails to enforce");
    lvl2Stmt2Aim.turnNegationOn();
});

//------------------------------------------------------------------------------

/**
 * This test creates a complete constitutive statement tree.
 */
it("Constitutive statement", () => {
    // Setup
    const statement = "From 1st of January onward, food preparation guidelines must adhere to national standards, in addition to communal provisions.";
    const document = new Document("Test Policy", "", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.constitutive, statement) as ConstitutiveStatementNode;

    root.getConstitutedEntity().setText("food preparation guidelines");
    root.createModal().setText("must");
    root.getConstitutiveFunction().setText("adhere", undefined, "to");
    root.createConstitutingProperties().setText("national standards");
    let actconds = root.getActivationConditions();
    actconds.createComponentNode(ComponentType.simplecontext).setText("From 1st of January onward");
    let execstrts = root.getExecutionConstraints();
    execstrts.createComponentNode(ComponentType.simplecontext).setText("communal provisions", "in addition to");
});

//------------------------------------------------------------------------------

it("Regulative statement with Or else", () => {
    // Setup
    const statement = "Organic farmers must comply with organic farming regulations, or else certifiers must revoke the organic farming certification.";
    const document = new Document("Test Policy", "", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative, statement) as RegulativeStatementNode;

    root.getAttribute().setText("Organic farmers");
    root.createDeontic().setText("must");
    root.getAim().setText("comply", undefined, "with");
    root.createDirectObject().setText("organic farming regulations");
    let orelse = root.createOrElse();

    let nestedStmt = orelse.createStatementNode(Arg.regulative) as RegulativeStatementNode;
    nestedStmt.getAttribute().setText("certifiers");
    nestedStmt.createDeontic().setText("must");
    nestedStmt.getAim().setText("revoke");
    nestedStmt.createDirectObject().setText("organic farming certification", "the");
});

//------------------------------------------------------------------------------

it("Set and unset text content", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    let attr = root.getAttribute();
    expect(attr.text).toBeDefined();
    expect(attr.text.main).toBeDefined();
    expect(attr.text.main).toEqual("");

    attr.setText("two", "one", "three");		// Setting content first time
    expect(attr.text.main).toEqual("two");
    expect(attr.text.prefix).toEqual("one");
    expect(attr.text.suffix).toEqual("three");

    attr.setText(undefined, "ONE");					// A new value for content
    expect(attr.text.main).toEqual("two");
    expect(attr.text.prefix).toEqual("ONE");

    attr.unsetText();								        // Unsetting content
    expect(attr.text.isSet()).toBeFalsy();

    attr.setText(undefined, "one");				// Setting prefix only
    expect(attr.text.prefix).toEqual("one");
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

    attr.setText("", "one", "three", "TWO");    // Inferred/Rephrased
    expect(text.getString()).toBe("one TWO three");

});

//------------------------------------------------------------------------------

it("Check if text content is empty for Junction nodes", () => {
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

it("Pass down component type of Context node", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    let actconds = root.getActivationConditions();
    let junction = actconds.createComponentJunctionNode();
    expect(junction.componentType).toEqual(ComponentType.activationconditions);
    junction.createComponentNode(ComponentType.simplecontext, Arg.left);
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

    // Without entry index
    let node1 = document.find(7);
    expect(node1).toBeDefined();
    expect(node1.id).toEqual(7);

    // With entry index
	let node2 = document.find(2, 0);
    expect(node2).toBeDefined();
    expect(node2.id).toEqual(2);

    // Throw if not found
    expect(() => { document.find(999) }).toThrow();
});

//------------------------------------------------------------------------------

it("Find child index of a node by ID", () => {
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

it("Elevate isFunctionallyDependent", () => {
    // Setup
    const document = new Document("Test Policy", "Description", documentId);
    let entry = document.createEntry();
    let root = entry.createRoot(Arg.regulative) as RegulativeStatementNode;

    // Create a chain of PropertyJunction nodes followed by a leaf Property node
    let attr = root.getAttribute();
    let propJun1 = attr.createPropertyJunctionNode(JunctionType.and);
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

it("Rebuild a tree", () => {
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
    let dirObjJun = dirobj.createComponentJunctionNode(JunctionType.xor);
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
    expect((newDirObjJun as ComponentJunctionNode).junctionType).toBeDefined();
    expect((newDirObjJun as ComponentJunctionNode).junctionType).toEqual(JunctionType.xor);

    let newActConds = newRoot.getActivationConditions();
    expect(newActConds instanceof ComponentNode).toBeTruthy();
    let newContext1 = newActConds.getChild(0);
    expect(newContext1 instanceof RegulativeStatementNode).toBeTruthy();
    let newContext2 = newActConds.getChild(1);
    expect(newContext2 instanceof ComponentNode).toBeTruthy();
});
