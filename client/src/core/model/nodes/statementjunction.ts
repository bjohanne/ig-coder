import {ConstitutiveStatementNode, RegulativeStatementNode, JunctionNode, StatementNode} from "./";
import {IStatementJunctionNode} from "../interfaces";
import {NodeType, Arg} from "../enums";
import {TextContent} from "../textcontent";

/**
 * This is the class for Junction nodes on the statement level.
 */
export default class StatementJunctionNode extends JunctionNode implements IStatementJunctionNode {
	nodeType: NodeType = NodeType.statementjunction;

	/**
	 * Creates a new StatementJunction node with dummy children.
	 *
	 * @param document The ID of the document this node belongs to
	 * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
	 * @param id (Optional) The ID of this node if one already exists (for rebuilding from existing data)
	 */
	constructor(document: number, parent?: number, id?: number) {
		super(document, parent, undefined, id);
	}

	/**
	 * Build a new StatementJunctionNode from existing data.
	 * Properties are copied to the new node from the passed in data.
	 *
	 * @param data An object of type IStatementJunctionNode (identical to IJunctionNode)
	 * @return A new StatementJunctionNode with the passed in properties
	 */
	static fromData(data: IStatementJunctionNode) : StatementJunctionNode {
		let newNode = new StatementJunctionNode(data.document, data.parent, data.id);
		newNode.text = TextContent.fromData(data.text);
		return newNode;
	}

	/**
	 * Creates a StatementJunction node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 *
	 * @return The newly created node
	 */
	createStatementJunctionNode(position: Arg.left | Arg.right) : StatementJunctionNode {
		this.children[position] = new StatementJunctionNode(this.document, this.id);
		this.update();
		return this.children[position] as StatementJunctionNode;
	}

	/**
	 * Creates a Statement node as child of this node, either regulative or constitutive.
	 *
	 * @param type Whether the new statement should be regulative or constitutive
	 * @param position Whether the new node should be the left or right child of this node
	 *
	 * @return The newly created node. You must assert its node type.
	 */
	createStatementNode(type: Arg.regulative | Arg.constitutive, position: Arg.left | Arg.right) : StatementNode {
		this.children[position] = (type === Arg.regulative ) ? new RegulativeStatementNode(this.document, this.id)
			: new ConstitutiveStatementNode(this.document, this.id);
		this.update();
		return this.children[position] as StatementNode;
	}
}
