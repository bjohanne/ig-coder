import { BaseNode } from "./base";
import { INode } from "../interfaces";
import { NodeType } from "../enums";

import NormNode from "./norm";
import ConventionNode from "./convention";
import JunctionNode from "./junction";
import ComponentNode from "./component";
import SubcomponentNode from "./subcomponent";

/**
 * The Negation node has exactly one child and is placed above a node
 * to signify that the node's meaning should be negated.
 */
export default class NegationNode extends BaseNode {
    nodeType: NodeType = NodeType.negation;
    children!: [INode]; // One child

    /**
     * Creates a new Negation node without children.
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     */
    constructor(document: number, parent?: number) {
        super(document, parent);
        this.children = [ new BaseNode(document) ]; // Dummy child
    }

    getChild() : INode {
        return this.children[0];
    }

    /**
     * Creates a Norm or Convention node as child of this node.
     * NOTE: This function will overwrite any existing descendants without warning.
     * @param deontic Whether to create a Norm or Convention node
     *               (whether the statement contains a Deontic)
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    createNormOrConventionNode(deontic: boolean, origin?: number) {
        this.children = [(deontic) ? new NormNode(this.document, this.id, origin)
            : new ConventionNode(this.document, this.id, origin)];
    }
}
