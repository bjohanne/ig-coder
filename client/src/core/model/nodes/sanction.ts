import BaseNode from "./base";
import { INode, ITwoChildren } from "../interfaces";
import { NodeType, SubtreeType, Arg } from "../enums";

import NormNode from "./norm";
import ConventionNode from "./convention";
import JunctionNode from "./junction";
import NegationNode from "./negation";

/**
 * Sanction nodes signify an "or else" relationship between its two children.
 * If present in a tree, the Sanction node must be the root.
 * Therefore, Sanction nodes are created on the document level, not in any nodes.
 */
export default class SanctionNode extends BaseNode implements ITwoChildren {
    nodeType: NodeType = NodeType.sanction;
	subtree: SubtreeType = SubtreeType.sanction;
    children!: [INode, INode];  // Two children

    /**
     * Creates a new Sanction node with dummy children.
     * @param document The ID of the document this node belongs to
     */
    constructor(document: number) {
        super(document, undefined, SubtreeType.sanction);
        this.children = [
            new BaseNode(document, this.id),
            new BaseNode(document, this.id)
        ]; // Dummy children
    }

    /* Getters for the children */

    getLeft() : INode {
        if (this.children[0].isDummy()) {
            throw new Error("Left child of this Sanction node is a dummy node");
        }
        return this.children[0];
    }

    getRight() : INode {
        if (this.children[1].isDummy()) {
            throw new Error("Right child of this Sanction node is a dummy node");
        }
        return this.children[1];
    }

	/**
	 * Creates a Norm or Convention node as child of this node.
	 *
	 * @param type Whether to create a Norm or Convention node
	 * @param position Whether the new node should be the left or right child of this node
	 * @param statement (Optional) The full text of the statement
	 * @param origin (Optional) The ID of the node the new node is a reference to
	 */
	createNormOrConventionNode(type: Arg.norm | Arg.convention, position: Arg.left | Arg.right, statement?: string, origin?: number) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = (type === Arg.norm) ? new NormNode(this.document, statement, this.id, origin)
			: new ConventionNode(this.document, statement, this.id, origin);
		this.update();
	}

	/**
	 * Creates a Junction node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 */
	createJunctionNode(position: Arg.left | Arg.right) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new JunctionNode(this.document, this.id, this.subtree);
		this.update();
	}

	/**
	 * Creates a Negation node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 */
	createNegationNode(position: Arg.left | Arg.right) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new NegationNode(this.document, this.id, this.subtree);
		this.update();
	}
}
