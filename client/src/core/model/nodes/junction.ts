import { BaseNode } from "./";
import { INode, IJunctionNode } from "../interfaces";
import { JunctionType, NodeType } from "../enums";
import { DataError, DataErrorType } from "../errors";

/**
 * This is the base class for StatementJunction and ComponentJunction.
 * Junction nodes are the main building block of horizontal nesting.
 * It is used to combine nodes with logical operators.
 */
export default class JunctionNode extends BaseNode implements IJunctionNode {
	nodeType: NodeType = NodeType.junction;
	/* Logical operator of the Junction node */
	junctionType!: JunctionType;
	/* Two fixed children for Junction nodes */
	children!: [INode, INode];

	/**
	 * All the Junction constructor does is call its parent constructor and set dummy children.
	 * Can also set a junction type right off the bat.
	 *
	 * @param document The ID of the document this node belongs to
	 * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
	 * @param junctionType (Optional) and/or/xor
	 */
	constructor(document: number, parent?: number, junctionType?: JunctionType) {
		super(document, parent);
		this.children = [
			new BaseNode(document, this.id),
			new BaseNode(document, this.id)
		]; // Dummy children
		if (junctionType) {
			this.junctionType = junctionType;
		}
	}

	/**
	 * Assigns a junction type to this node.
	 * @param junctionType and/or/xor
	 */
	setJunction(junctionType: JunctionType) : void{
		this.junctionType = junctionType;
		this.update();
	}

	/* Getters for the children */

	/**
	 * Returns this node's left child.
	 * Throws an error if the child is a dummy node or undefined.
	 */
	getLeft() : INode | undefined {
		if (!this.children[0]) {
			throw new DataError(DataErrorType.JUN_GET_UNDEF_LEFT);
		} else if (this.children[0].isDummy()) {
			throw new DataError(DataErrorType.JUN_GET_DUM_LEFT);
		}
		return this.children[0];
	}

	/**
	 * Returns this node's right child.
	 * Throws an error if the child is a dummy node or undefined.
	 */
	getRight() : INode | undefined {
		if (!this.children[1]) {
			throw new DataError(DataErrorType.JUN_GET_UNDEF_RIGHT);
		} else if (this.children[1].isDummy()) {
			throw new DataError(DataErrorType.JUN_GET_DUM_RIGHT);
		}
		return this.children[1];
	}

	/**
	 * Delete either the left or right child of this node.
	 * The child is overwritten with a new dummy node, deleting the old data and all its descendants.
	 * Throws an error if childPos is out of bounds (outside 0-1).
	 *
	 * @param childPos The children array index of the child node to delete
	 */
	deleteChild(childPos: number) : void {
		if (childPos < 0 || childPos > 1) {						// Ensure the given index is accessible,
			throw new DataError(DataErrorType.JUN_DEL_BAD_IDX);	// though it may contain a dummy node
		}
		if (this.children[childPos].isDummy()) {
			console.warn("Attempt to delete dummy child of Junction node with ID " + this.id);
			return;
		}
		console.warn("Deleting child with ID " + this.children[childPos].id + " of Junction node with ID " +
			this.id);
		this.children[childPos] = new BaseNode(this.document, this.id);
		this.update();
	}
}
