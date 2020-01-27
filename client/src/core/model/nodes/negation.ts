import { BaseNode } from "./base";
import { INode, IOneChild } from "../interfaces";
import { NodeType } from "../enums";

import NormNode from "./norm";
import ConventionNode from "./convention";
import JunctionNode from "./junction";

/**
 * The Negation node has exactly one child and is placed above a node
 * to signify that the node's meaning should be negated.
 */
export default class NegationNode extends BaseNode implements IOneChild {
    nodeType: NodeType = NodeType.negation;
    children!: [INode]; // One child

    /**
     * Creates a new Negation node with a dummy child.
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     */
    constructor(document: number, parent?: number) {
        super(document, parent);
        this.children = [ new BaseNode(document, this.id) ]; // Dummy child
    }

    // Getter for the child
    getChild() : INode {
        if (typeof this.children[0].nodeType === "undefined") {
            throw new Error("The child of this Negation node is a dummy node");
        }
        return this.children[0];
    }

    /**
     * Creates a Norm or Convention node as child of this node.
     * @param deontic Whether to create a Norm or Convention node
     *               (whether the statement contains a Deontic)
     * @param origin (Optional) The ID of the node the new node is a reference to
     */
    createNormOrConventionNode(deontic: boolean, origin?: number) {
        this.children = [(deontic) ? new NormNode(this.document, this.id, origin)
            : new ConventionNode(this.document, this.id, origin)];
    }

    /**
     * Creates a Junction node as child of this node.
     */
    createJunctionNode() {
        this.children[0] = new JunctionNode(this.document, this.id);
    }

    /**
     * Creates a Negation node as child of this node.
     */
    createNegationNode() {
        this.children[0] = new NegationNode(this.document, this.id);
    }

}
