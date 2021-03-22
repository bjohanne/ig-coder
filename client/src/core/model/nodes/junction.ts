import {BaseNode} from "./";
import {IJunctionNode, INode} from "../interfaces";
import {Arg, JunctionType, NodeType} from "../enums";
import {DataError, DataErrorType} from "../errors";
import {TextContent} from "../textcontent";

/**
 * This is the base class for StatementJunction, ComponentJunction and PropertyJunction.
 * Junction nodes are the main building block of horizontal nesting.
 * It is used to combine nodes with logical operators.
 */
export default class JunctionNode extends BaseNode implements IJunctionNode {
	nodeType: NodeType = NodeType.junction;
	/* Logical operator of the junction */
	junctionType!: JunctionType;
	/* Holds the text content of the junction. Should always be defined */
	text!: TextContent;
	/* Two fixed children for Junction nodes */
	children!: [INode, INode];

	/**
	 * All the Junction constructor does is call its parent constructor and set dummy children.
	 * Can also set a junction type right off the bat.
	 *
	 * @param document The ID of the document this node belongs to
	 * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
	 * @param junctionType (Optional) and/or/xor
	 * @param id (Optional) The ID of this node if one already exists (for rebuilding from existing data)
	 */
	constructor(document: number, parent?: number, junctionType?: JunctionType, id?: number) {
		super(document, parent, id);
		this.text = new TextContent();
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
	 * If this node's text content is empty or one of the defaults,
	 * sets it to the default value determined by the new junction type.
	 * @param junctionType and/or/xor
	 */
	setJunction(junctionType: JunctionType) : void {
		this.junctionType = junctionType;
		this.update();
		// Set text to a default value if empty or one of the default values
		if (this.text.isEmptyOrJunctionDefault()) {
			switch (junctionType) {
				case JunctionType.and:
					this.setText("and");
					break;
				case JunctionType.or:
					this.setText("or");
					break;
				case JunctionType.xor:
					this.setText("or");
					break;
				default:
			}
		}
	}

	/**
	 * Return a string representing the logical operator for this Junction node.
	 * If this node has no junction type, returns an empty string.
	 * @return A full-text specification of the logical operator (e.g. conjunction, disjunction)
	 */
	getOperatorString() : string {
		if (!this.junctionType) {
			return "";
		}
		switch (this.junctionType) {
			case JunctionType.and:
				return "Conjunction";
			case JunctionType.or:
				return "Disjunction";
			case JunctionType.xor:
				return "Exclusive disjunction";
			default:
		}
	}

	/**
	 * Return this node's TextContent object. Throws an error if the TextContent object is undefined.
	 * @return The TextContent object found in this node's text property
	 */
	getText() : TextContent {
		if (!this.text) {
			throw new DataError(DataErrorType.JUN_GET_TXT_UNDEF, this.id);
		}
		return this.text;
	}

	/**
	 * Modifies the node's TextContent object with the passed in text content.
	 *
	 * @param main (Optional) The text that most narrowly fits the component/property
	 * @param prefix (Optional) Text from the raw statement that precedes the main part
	 * @param suffix (Optional) Text from the raw statement that succeeds the main part
	 * @param explicit (Optional) If the raw text is tacit/implicit, this is an explicit specification
	 * @param rephrased (Optional) A rephrased version of the text in the main field
	 */
	setText(main?: string, prefix?: string, suffix?: string, explicit?: string, rephrased?: string) : void {
		if (!this.text) {
			throw new DataError(DataErrorType.JUN_GET_TXT_UNDEF, this.id);
		}
		this.text.set(main, prefix, suffix, explicit, rephrased);
		this.update();
	}

	/**
	 * Unsets the TextContent's fields (not the TextContent object itself).
	 */
	unsetText() : void {
		if (!this.text) {
			throw new DataError(DataErrorType.JUN_GET_TXT_UNDEF, this.id);
		}
		this.text.unset();
		this.update();
	}

	/* Getters for the children */

	/**
	 * Returns this node's left child.
	 * Throws an error if the child is a dummy node or undefined.
	 * @return This node's left child. You must assert its node type.
	 */
	getLeft() : INode {
		if (this.children[Arg.left].isDummy()) {
			throw new DataError(DataErrorType.JUN_DUM_LEFT, this.id);
		}
		return this.children[Arg.left];
	}

	/**
	 * Returns this node's right child.
	 * Throws an error if the child is a dummy node or undefined.
	 * @return This node's right child. You must assert its node type.
	 */
	getRight() : INode {
		if (this.children[Arg.right].isDummy()) {
			throw new DataError(DataErrorType.JUN_DUM_RIGHT, this.id);
		}
		return this.children[Arg.right];
	}

	/**
	 * Delete the left child of this node.
	 * The child is overwritten with a new dummy node, deleting the old data and all its descendants,
	 *  with a warning.
	 */
	deleteLeft() : void {
		if (this.children[Arg.left].isDummy()) {
			throw new DataError(DataErrorType.JUN_DUM_LEFT, this.id);
		}
		console.warn("Deleting left child with ID " + this.children[Arg.left].id + " of Junction node with ID " +
			this.id);
		this.children[Arg.left] = new BaseNode(this.document, this.id);
		this.update();
	}

	/**
	 * Delete the right child of this node.
	 * The child is overwritten with a new dummy node, deleting the old data and all its descendants,
	 *  with a warning.
	 */
	deleteRight() : void {
		if (this.children[Arg.right].isDummy()) {
			throw new DataError(DataErrorType.JUN_DUM_RIGHT, this.id);
		}
		console.warn("Deleting right child with ID " + this.children[Arg.right].id + " of Junction node with ID " +
			this.id);
		this.children[Arg.right] = new BaseNode(this.document, this.id);
		this.update();
	}
}
