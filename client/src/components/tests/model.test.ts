import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Document from '../../core/model/document';
import {CompositeNode, AtomicNode} from '../../core/model/typenodes'
import { JunctionType, ComponentType } from '../../core/model/enums';
import { Component } from '../../core/model/typecomponents';
import Entry from "../../core/model/entry";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  // Mock all props the component needs
  const content = "The Program Manager may initiate suspension or revocation proceedings against a certified operation";
  return {content};
}


it('works', () => {
    const {content} = setup();
    const obj = new Document("Program Manager Policy", "description is missing", 9);
    obj.createRoot(content);
    const root = obj.documentRoot as CompositeNode;

    // mock data
    let entry = "initiate suspension or revocation proceedings against a certified operation";
    let attrs = "The Program Manager";
    let or1 = "suspension";
    let or2 = "revocation proceedings";
    let cert = "a certified operation";
    let aim = "initiate";
    let deontic = "may";    
    let object = "against";

    
    root.createAtomicNode(obj.documentId, Component.createComponent(ComponentType.attributes, [], attrs));
    let objectAgainst = root.createAtomicNode(obj.documentId, Component.createComponent(ComponentType.object, [], entry));
    objectAgainst.create(obj.documentId, Component.createComponent(ComponentType.attributes, [], cert));
    objectAgainst.createJunction(
        obj.documentId,
        JunctionType.or, 
        AtomicNode.create(obj.documentId, Component.createComponent(ComponentType.direct, [], or1)),
        AtomicNode.create(obj.documentId, Component.createComponent(ComponentType.direct, [], or2)));
    root.createAtomicNode(obj.documentId, Component.createComponent(ComponentType.deontic, [], deontic));
    root.createAtomicNode(obj.documentId, Component.createComponent(ComponentType.aim, [], aim));
    //root.createJunction(JunctionType.orelse, );
    //console.log(JSON.stringify(obj));
    expect(root).toBeDefined();
    expect(`${root.entry.content}`).toEqual(content);
  });