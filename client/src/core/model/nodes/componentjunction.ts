import { ComponentNode, JunctionNode, StatementJunctionNode } from "./";
import { INode } from "../interfaces";
import { NodeType, ComponentType, Arg } from "../enums";
import { DataError, DataErrorType } from "../errors";
import { matchComponentTypes } from "../helpers";

/**
 * This is the class for Junction nodes on the component level.
 */
export default class ComponentJunctionNode extends JunctionNode {
	nodeType: NodeType = NodeType.componentjunction;
    componentType!: ComponentType;		 // Used to check for correct type within statement subtrees

	/**
	 * Creates a new Junction node with dummy children.
	 *
	 * @param componentType The component type of this node's ancestor ComponentNode, if it has one.
	 * @param document The ID of the document this node belongs to
	 * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
	 */
	constructor(componentType: ComponentType, document: number, parent: number) {
		super(document, parent);
		this.componentType = componentType;
	}

	/**
	 * Creates a StatementJunction node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 */
	createStatementJunctionNode(position: Arg.left | Arg.right) : INode | undefined {
		this.children[position] = new StatementJunctionNode(this.document, this.id);
		this.update();
		return this.children[position];
	}

	/**
	 * Creates a ComponentJunction node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 */
	createComponentJunctionNode(position: Arg.left | Arg.right) : INode | undefined {
		this.children[position] = new ComponentJunctionNode(this.componentType, this.document, this.id);
		this.update();
		return this.children[position];
	}

	/**
	 * Creates a Component node as child of this node, if legal.
	 *
	 * @param componentType The type of component the new node should have
	 * @param position Whether the new node should be the left or right child of this node
	 */
	createComponentNode(componentType: ComponentType, position: Arg.left | Arg.right) : INode | undefined {
		if (!matchComponentTypes(this.componentType, componentType)) {
			throw new DataError(DataErrorType.CMP_TYPE_MISMATCH);
		}
		this.children[position] = new ComponentNode(componentType, this.document, this.id);
		this.update();
		return this.children[position];
	}
}
