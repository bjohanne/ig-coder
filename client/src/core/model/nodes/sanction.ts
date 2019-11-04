import { BaseNode } from "./base";
import { INode, ITwoChildren } from "../interfaces";
import { NodeType } from "../enums";

import NormNode from "./norm";
import ConventionNode from "./convention";
import JunctionNode from "./junction";
import NegationNode from "./negation";
import ComponentNode from "./component";
import SubcomponentNode from "./subcomponent";

/**
 * Sanction nodes signify an "or else" relationship between its two children.
 * If present in a tree, the Sanction node must be the root.
 */
export default class SanctionNode extends BaseNode implements ITwoChildren {
    nodeType: NodeType = NodeType.sanction;
    children!: [INode, INode];  // Two children

    /**
     * Creates a new Sanction node without children.
     *
     * @param document The ID of the document this node belongs to
     */
    constructor(document: number) {
        super(document);
        this.children = [ new BaseNode(document), new BaseNode(document) ]; // Dummy children
    }

    getLeft() : INode {
        return this.children[0];
    }

    getRight() : INode {
        return this.children[1];
    }

    /**
     * Creates a Norm or Convention node as child of this node.
     * NOTE: This function will overwrite any existing descendants in the given index without warning.
     * @param deontic Whether to create a Norm or Convention node
     *               (whether the statement contains a Deontic)
     * @param index The index of this node's children array in which the Norm/Convention node should reside
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    createNormOrConventionNode(deontic: boolean, index: 0 | 1, origin?: number) {
        this.children[index] = (deontic) ? new NormNode(this.document, this.id, origin)
            : new ConventionNode(this.document, this.id, origin);
    }
}
