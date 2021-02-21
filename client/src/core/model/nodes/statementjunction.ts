import { ConstitutiveStatementNode, RegulativeStatementNode, JunctionNode } from "./";
import { INode } from "../interfaces";
import { NodeType, Arg } from "../enums";

/**
 * This is the class for Junction nodes on the statement level.
 */
export default class StatementJunctionNode extends JunctionNode {
	nodeType: NodeType = NodeType.statementjunction;

	/**
	 * Creates a Statement node as child of this node, either regulative or constitutive.
	 *
	 * @param type Whether the new statement should be regulative or constitutive
	 * @param position Whether the new node should be the left or right child of this node
	 *
	 * @return The newly created node
	 */
	createStatementNode(type: Arg.regulative | Arg.constitutive, position: Arg.left | Arg.right) : INode | undefined {
		this.children[position] = (type === Arg.regulative ) ? new RegulativeStatementNode(this.document, this.id)
			: new ConstitutiveStatementNode(this.document, this.id);
		this.update();
		return this.children[position];
	}

	/**
	 * Creates a StatementJunction node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 *
	 * @return The newly created node
	 */
	createStatementJunctionNode(position: Arg.left | Arg.right) : INode | undefined {
		this.children[position] = new StatementJunctionNode(this.document, this.id);
		this.update();
		return this.children[position];
	}
}
