import Entry from "./entry";
import {IComponent, INode} from "./interfaces";
import {JunctionType, NodeType} from "./enums";
import {Component} from "./typeComponents";
import {NodeCounter} from "./document";

/**
 * The base node has the implementation of INode
 */
abstract class BaseNode implements INode {
    document!: number;
    id!: number;
    origin!: number | null;
    parent!: number | null;
    children: INode[] = [];
    createdAt!: Date;
    updatedAt!: Date;
    nodeType!: NodeType;

    /**
     * Creates and returns a JunctionNode that has been appended to this.children
     * The children parameter passed in will be appended to this new junction's children
     *
     * @param document
     * @param junctionType
     * @param children Any children to add; i.e n nodes
     */
    createJunction(document: number, junctionType: JunctionType, ...children: INode[]): JunctionNode {
        let node = JunctionNode.createStandalone(document, junctionType, ...children);
        node.parent = this.id;
        this.children.push(node);
        return node;
    }
}

/**
 * This is the Node that holds an Entry. A policy that is fully processed in ig-coder
 * will only have empty Composite nodes left since everything is decomposed into child nodes.
 */
export class CompositeNode extends BaseNode {
    entry!: Entry;
    nodeType: NodeType = NodeType.composite;

    /**
     * Creates and returns a new standalone Composite node, not yet attached to any node
     * based on the entry passed in
     *
     * @param document the document id where the node belongs
     * @param entry The entry of the CompositeNode
     * @param origin null if the entry is not referencing another entry in the tree
     */
    public static createStandalone(document: number, entry: Entry, origin?: number): CompositeNode {
        return Object.assign(new CompositeNode(), {
            id: NodeCounter.getInstance().getNextNodeId(document),
            document,
            entry,
            origin
        });
    }

    /**
     * Creates and returns a new Composite node that has been appended to this.children
     * TODO: Composite nodes are not components.
     * @param document the document id where the node belongs
     * @param component a nADICO component
     * @param origin if a reference
     */
    createAndAttach(document: number, component: Component, origin?: number): ComponentNode {
        if (this.entry.content.indexOf(component.content) > -1) {
            let node = ComponentNode.createStandalone(document, component, origin);
            node.parent = this.id;
            this.children.push(node);
            return node;
        } else {
            throw new Error("The text is not present in this entry!");
        }
    }
}

/**
 *
 */
export class NestedCompositeNode extends BaseNode {
    entry!: Entry;
    nodeType: NodeType = NodeType.nestedComposite;
}

/**
 * This type of node holds an ABDICO component: Attributes, Object, Deontic, Aim or Conditions.
 */
export class ComponentNode extends BaseNode {
    component!: IComponent;
    nodeType: NodeType = NodeType.component;

    /**
     * Creates and returns a new standalone Component node, not yet attached to any node
     * based on the component passed in
     *
     * @param document the document id where the node belongs
     * @param component a nADICO component
     * @param origin if for reference
     */
    static createStandalone(document: number, component: IComponent, origin?: number): ComponentNode {
        return Object.assign(new ComponentNode(), {
            id: NodeCounter.getInstance().getNextNodeId(document),
            document,
            component,
            origin
        });
    }

    /**
     * Creates and returns a new Component node that has been appended to this.children
     *
     * @param document the document id where the node belongs
     * @param component a nADICO component
     * @param origin if for reference
     */
    createAndAttach(document: number, component: IComponent, origin?: number): ComponentNode {
        let node = ComponentNode.createStandalone(document, component, origin);
        node.parent = this.id;
        this.children.push(node);
        return node;
    }
}

/**
 * The Junction node is the main building block of horizontal nesting.
 * It is used to combine nodes with logical operators.
 */
export class JunctionNode extends BaseNode {
    junctionType!: JunctionType;
    nodeType: NodeType = NodeType.junction;

    /**
     * Creates and returns a new standalone Junction node, not yet attached to any node,
     * with the passed in nodes as children
     *
     * @param document the document id where the node belongs
     * @param junctionType
     * @param children the children of the junction-node
     */
    static createStandalone(document: number, junctionType: JunctionType, ...children: INode[]): JunctionNode {
        let junction: JunctionNode = Object.assign(new JunctionNode(), {
            id: NodeCounter.getInstance().getNextNodeId(document),
            document,
            junctionType
        });

        children.forEach((node: INode) => {
            junction.children.push(node);
            node.parent = junction.id;
        });
        return junction;
    }
}

/**
 *
 */
export class SanctionNode extends BaseNode {
    nodeType: NodeType = NodeType.sanction;
    leftChild!: INode;
    rightChild!: INode;
}
