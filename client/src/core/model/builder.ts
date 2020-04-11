import { INode } from "./interfaces";

import { ComponentType, NodeType } from "./enums";
import { NormNode, ComponentNode } from "./nodes";

export const buildEntrySubTree = (node: INode, atoms: any, conditions: any, orElse: any, action: Function) => {
    let conventionNode = node as NormNode;
    if(atoms.Aim) {
        let aimNode = conventionNode.children.find((child: INode) => child.nodeType === NodeType.component && (child as ComponentNode).componentType === ComponentType.aim);
        (aimNode as ComponentNode).setContent(atoms.Aim);        
    }
    if(atoms.Deontics) {
        let deonticNode = conventionNode.children.find((child: INode) => child.nodeType === NodeType.component && (child as ComponentNode).componentType === ComponentType.deontic);
        (deonticNode as ComponentNode).setContent(atoms.Deontics)
    }

    if(atoms.Attributes) {
        let attributesNode = conventionNode.children.find((child: INode) => child.nodeType === NodeType.component && (child as ComponentNode).componentType === ComponentType.attributes);
        (attributesNode as ComponentNode).setContent(atoms.Attributes);
    }

    if(atoms.DirectObject) {
        let objectNode = conventionNode.children.find((child: INode) => child.nodeType === NodeType.component && (child as ComponentNode).componentType === ComponentType.object);
        if (objectNode) {
            (objectNode as ComponentNode).setContent(atoms.DirectObject);
        }
        
    }

    if(atoms.IndirectObject) {

    }
    action(node);
}