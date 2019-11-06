import { BaseNode } from "./base";
import { INode, ITwoChildren } from "../interfaces";
import { NodeType } from "../enums";

import NormNode from "./norm";
import ConventionNode from "./convention";

/**
 * Sanction nodes signify an "or else" relationship between its two children.
 * If present in a tree, the Sanction node must be the root.
 * Therefore, Sanction nodes are created on the document level, not in any nodes.
 */
export default class SanctionNode extends BaseNode implements ITwoChildren {
    nodeType: NodeType = NodeType.sanction;
    children!: [INode, INode];  // Two children

    /**
     * Creates a new Sanction node with dummy children.
     *
     * @param document The ID of the document this node belongs to
     */
    constructor(document: number) {
        super(document);
        this.children = [
            new BaseNode(document, this.id),
            new BaseNode(document, this.id)
        ]; // Dummy children
    }

    /* Getters for the children */

    getLeft() : INode {
        if (typeof this.children[0].nodeType === "undefined") {
            throw new Error("Left child of this Sanction node is a dummy node");
        }
        return this.children[0];
    }

    getRight() : INode {
        if (typeof this.children[1].nodeType === "undefined") {
            throw new Error("Right child of this Sanction node is a dummy node");
        }
        return this.children[1];
    }

    /**
     * Creates a Norm or Convention node as child of this node.
     * @param deontic Whether to create a Norm or Convention node
     *               (whether the statement contains a Deontic)
     * @param index The index of this node's children array in which the Norm/Convention node should reside
     * @param origin (Optional) The ID of the node the new node is a reference to
     */
    createNormOrConventionNode(deontic: boolean, index: 0 | 1, origin?: number) {
        this.children[index] = (deontic) ? new NormNode(this.document, this.id, origin)
            : new ConventionNode(this.document, this.id, origin);
    }
}
