import { INode } from "../interfaces";
import { NodeType, Arg } from "../enums";
import { NodeCounter } from "../document";

/**
 * The base node has the implementation of INode.
 * It is also used as dummy children for several node types.
 */
export class BaseNode implements INode {
    id!: number;
    document!: number;
    nodeType!: NodeType;
    parent?: number;
    origin?: number;
    createdAt!: Date;
    updatedAt!: Date;
    children!: INode[];

    /**
     * The base constructor for all nodes
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(document: number, parent?: number, origin?: number) {
        this.id = NodeCounter.getInstance().getNextNodeId(document);
        this.document = document;
        if (parent) {
            this.parent = parent;
        }
        if (origin) {
            this.origin = origin;
        }
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

	/**
     * The standard way of deleting a node.
     * If a node with the given ID is found in this node's children array,
     * that child will be replaced with a new dummy node, deleting the old data.
     * If the node is not found, an error will be thrown and no nodes will be deleted.
	 * Does not throw a specific error if called on a Deontic node, because componentType does not exist on BaseNode.
     * Like Document.deleteTree(), all the node's descendants are also deleted.
     * Does not delete children that were automatically created (fixed children).
	 *
	 * To delete an Object child of a Norm/Convention, use instead deleteObject().
     *
	 * @param childPos Which child to delete (left, right, only)
     */
	deleteChild(childPos: Arg.left | Arg.right | Arg.only) {
		let index;

		if (this.nodeType === NodeType.norm || this.nodeType === NodeType.convention) { // In case this is called on a Norm/Convention node
			throw new Error("Cannot delete fixed children of Norm and Convention nodes");
		} else if (this.nodeType === NodeType.junction || this.nodeType === NodeType.sanction) { // Node types that have two non-fixed children
			if (childPos === Arg.only) {
				throw new Error("Cannot delete only child of a Junction or Sanction node");
			}
			index = (childPos === Arg.left) ? 0 : 1;
		} else { // The remaining three node types have or can have one child
			// A left or right child of a Component node must be a fixed child, which should not be deleted
			if (childPos !== Arg.only) {
				throw new Error("Cannot delete left or right child of a Component, Subcomponent or Negation node");
			}
			if (this.nodeType === NodeType.component) {
				// In case this is called with Arg.left, also check the child in index 0 for type Subcomponent
				if (this.children[0].nodeType === NodeType.subcomponent) {
					throw new Error("Cannot delete Subcomponent child of a Component node");
				}
			}
			index = 0;
		}

		if (typeof this.children[index] === "undefined") {
			throw new Error("The specified child does not exist");
		}
		this.children[index] = new BaseNode(this.document, this.id);
	}
}
