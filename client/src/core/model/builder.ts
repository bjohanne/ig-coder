import { INode } from "./interfaces";
import ConventionNode from "./nodes/convention";

import { ComponentType, NodeType } from "./enums";
import { NormNode, ComponentNode } from "./nodes";

export const buildEntrySubTree = (node: INode, atoms: any, conditions: any, orElse: any, action: Function) => {
    let conventionNode = <NormNode>node;
    if(atoms.Aim) {
        let aimNode = conventionNode.children.find((child: INode) => child.nodeType == NodeType.component && (<ComponentNode>child).componentType == ComponentType.aim);
        (<ComponentNode>aimNode).setContent(atoms.Aim);        
    }
    if(atoms.Deontics) {
        let deonticNode = conventionNode.children.find((child: INode) => child.nodeType == NodeType.component && (<ComponentNode>child).componentType == ComponentType.deontic);
        (<ComponentNode>deonticNode).setContent(atoms.Deontics)
    }

    if(atoms.Attributes) {
        let attributesNode = conventionNode.children.find((child: INode) => child.nodeType == NodeType.component && (<ComponentNode>child).componentType == ComponentType.attributes);
        (<ComponentNode>attributesNode).setContent(atoms.Attributes);
    }

    if(atoms.DirectObject) {
        let objectNode = conventionNode.children.find((child: INode) => child.nodeType == NodeType.component && (<ComponentNode>child).componentType == ComponentType.object);
        if (objectNode) {
            (<ComponentNode>objectNode).setContent(atoms.DirectObject);
        }
        
    }

    if(atoms.IndirectObject) {

    }
    action(node);
}