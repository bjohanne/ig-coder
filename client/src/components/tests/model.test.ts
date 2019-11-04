import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Document from '../../core/model/document';
import { NormNode, ConventionNode, JunctionNode, SanctionNode, NegationNode, ComponentNode, SubcomponentNode } from '../../core/model/nodes'
import { JunctionType, ComponentType, SubcomponentType } from '../../core/model/enums';
import { Component } from '../../core/model/component';
import { Entry } from "../../core/model/entry";

Enzyme.configure({ adapter: new Adapter() });

it('works', () => {
    const statement = "The Program Manager may initiate suspension or revocation proceedings against a certified operation";
    const document = new Document("Program Manager Policy", "description is missing", 9);
    const documentId = document.documentId;
    document.createTree(statement, true);
    const root = document.getRoot() as NormNode;

    /*
    Here are the steps to build the tree for this statement:
    1. Make the NormNode. Making a NormNode should automatically make its fixed children. Same with Convention.
    2. One at a time, make Components with data for the children. Done on each of the child nodes, except Object and Conditions.
    3. Make a Junction node for the indirect object, as child of the Object node.
    4. Set the JNode's Junction.
    5. One at a time, make Subcomponent nodes for the indirect and direct object.
    6. Make Subcomponents with data for the indirect and direct objects.

    Note that we always type assert the node type when getting a node.
    This is to ensure that we're allowed to call specific functions.
    */

    let attr = root.getAttributes() as ComponentNode;
    attr.setContent("Program Manager", "The");

    let deontic = root.getDeontic() as ComponentNode;
    deontic.setContent("may");

    let aim = root.getAim() as ComponentNode;
    aim.setContent("initiate");

    let obj = root.getObject() as ComponentNode;
    obj.createJunctionNode(0);

    let objLeft = obj.getLeft() as JunctionNode;
    objLeft.setJunction(JunctionType.xor);
    objLeft.createSubcomponentNode(SubcomponentType.direct, 0);
    objLeft.createSubcomponentNode(SubcomponentType.direct, 1);

    let dir1 = objLeft.getLeft() as SubcomponentNode;
    dir1.setContent("suspension");

    let dir2 = objLeft.getRight() as SubcomponentNode;
    dir2.setContent("revocation proceedings");

    obj.createSubcomponentNode(SubcomponentType.indirect, 1);

    let indir = obj.getRight() as SubcomponentNode;
    indir.setContent("certified operation", "a");

    let act = root.getConditions().getLeft() as SubcomponentNode;
    act.setContent("*");

    let exe = root.getConditions().getRight() as SubcomponentNode;
    exe.setContent("*");

    // console.log(JSON.stringify(root, null, 2));

    expect(root).toBeDefined();
    expect(`${root.entry.content}`).toEqual(statement);
  });
