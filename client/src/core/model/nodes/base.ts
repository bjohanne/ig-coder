import { INode } from "../interfaces";
import { NodeType, SubtreeType, Arg } from "../enums";
import { NodeCounter } from "../document";

/**
 * The base node has the implementation of INode.
 * It is also used as dummy children for several node types.
 */
export default class BaseNode implements INode {
    id!: number;
    document!: number;
    nodeType!: NodeType;
	subtree?: SubtreeType;
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
	 * @param subtree (Optional) The subtree this node is part of. Should be the same as its parent - used to pass that down.
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(document: number, parent?: number, subtree?: SubtreeType, origin?: number) {
        this.id = NodeCounter.getInstance().getNextNodeId(document);
        this.document = document;
        if (parent) {
            this.parent = parent;
        }
		if (subtree) {
			this.subtree = subtree;
		}
        if (origin) {
            this.origin = origin;
        }
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * Check whether this node is a dummy node, i.e. a BaseNode.
     * (Defined here in order to be available to all node classes)
     * Plain base nodes do not have the nodeType field.
     * NB: The check must be done in this way, not simply "instanceof BaseNode",
     * because that test counts inheritance => all node types pass.
     */
    isDummy() : boolean {
        return (typeof this.nodeType === "undefined");
    }

	/**
	 * Small abstraction/convenience to set the updatedAt field.
	 * Called when a property on the node is modified or when a child is created on the node.
	 */
	update() {
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
		let index;    // The child's index in the parent's child array

		if (this.nodeType === NodeType.norm || this.nodeType === NodeType.convention) {
			throw new Error("Cannot delete fixed children of Norm and Convention nodes");
        // Node types that have two non-fixed children
		} else if (this.nodeType === NodeType.junction || this.nodeType === NodeType.sanction) {
			if (childPos === Arg.only) {
				throw new Error("Cannot delete only child of a Junction or Sanction node");
			}
			index = (childPos === Arg.left) ? 0 : 1;
		} else { // The remaining three node types have one or no children
			// A left or right child of a Component node must be a fixed child, which should not be deleted
			if (childPos !== Arg.only) {
				throw new Error("Cannot delete left or right child of a Component, Subcomponent or Negation node");
			}
			if (this.nodeType === NodeType.component) {
				// In case this is called with Arg.left (0), also check the child in index 0 for type Subcomponent
				if (this.children[0].nodeType === NodeType.subcomponent) {
					throw new Error("Cannot delete Subcomponent child of a Component node");
				}
			}
			index = 0;
		}

		if (this.children[index].isDummy()) {
			throw new Error("The specified child is a dummy node");
		}
		this.children[index] = new BaseNode(this.document, this.id);
    }
    
    deleteAllChildren() {
        this.children = [];
    }
}
