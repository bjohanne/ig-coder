import {ConstitutiveStatementNode, RegulativeStatementNode, JunctionNode, StatementNode} from "./";
import {IStatementJunctionNode} from "../interfaces";
import {NodeType, JunctionType, Arg} from "../enums";
import {TextContent} from "../textcontent";

/**
 * This is the class for Junction nodes on the statement level.
 */
export default class StatementJunctionNode extends JunctionNode implements IStatementJunctionNode {
	nodeType: NodeType = NodeType.statementjunction;

	/**
	 * Build a new StatementJunctionNode from existing data.
	 * Properties are copied to the new node from the passed in data.
	 *
	 * @param data An object of type IStatementJunctionNode (identical to IJunctionNode)
	 * @return A new StatementJunctionNode with the passed in properties
	 */
	static fromData(data: IStatementJunctionNode) : StatementJunctionNode {
		let newNode = new StatementJunctionNode(data.document, data.parent, data.junctionType, data.id);
		newNode.text = TextContent.fromData(data.text);
		return newNode;
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

	/**
	 * Creates a StatementJunction node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 *
	 * @param junctionType (Optional) A junction type to be given to the new node immediately
	 * @return The newly created node
	 */
	createStatementJunctionNode(position: Arg.left | Arg.right, junctionType?: JunctionType) : StatementJunctionNode {
		this.children[position] = new StatementJunctionNode(this.document, this.id, junctionType);
		this.update();
		return this.children[position] as StatementJunctionNode;
	}
}
