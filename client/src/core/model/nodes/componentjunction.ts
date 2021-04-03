import {ComponentNode, JunctionNode} from "./";
import {IComponentJunctionNode} from "../interfaces";
import {NodeType, ComponentType, Arg, JunctionType} from "../enums";
import {DataError, DataErrorType} from "../errors";
import {matchComponentTypes} from "../helpers";
import {TextContent} from "../textcontent";

/**
 * This is the class for Junction nodes on the component level.
 */
export default class ComponentJunctionNode extends JunctionNode implements IComponentJunctionNode {
	nodeType: NodeType = NodeType.componentjunction;
    componentType!: ComponentType;		 // Used to check for correct type when nesting Component nodes

	/**
	 * Creates a new ComponentJunction node with dummy children.
	 *
	 * @param componentType The component type of this node's ancestor ComponentNode, if it has one.
	 * @param document The ID of the document this node belongs to
	 * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
	 * @param junctionType (Optional) A junction type to be given to the new node immediately
	 * @param id (Optional) The ID of this node if one already exists (for rebuilding from existing data)
	 */
	constructor(componentType: ComponentType, document: number, parent: number, junctionType?: JunctionType, id?: number) {
		super(document, parent, junctionType, id);
		this.componentType = componentType;
	}

	/**
	 * Build a new ComponentJunctionNode from existing data.
	 * Properties are copied to the new node from the passed in data.
	 *
	 * @param data An object of type IComponentJunctionNode
	 * @return A new StatementJunctionNode with the passed in properties
	 */
	static fromData(data: IComponentJunctionNode) : ComponentJunctionNode {
		let newNode = new ComponentJunctionNode(data.componentType, data.document, data.parent, data.junctionType, data.id);
		newNode.text = TextContent.fromData(data.text);
		return newNode;
	}

	/**
	 * Creates a Component node as child of this node, if legal.
	 *
	 * @param componentType The type of component the new node should have
	 * @param position Whether the new node should be the left or right child of this node
	 *
	 * @return The newly created node
	 */
	createComponentNode(componentType: ComponentType, position: Arg.left | Arg.right) : ComponentNode {
		if (!matchComponentTypes(this.componentType, componentType)) {
			throw new DataError(DataErrorType.CMP_TYPE_MISMATCH, this.id);
		}
		this.children[position] = new ComponentNode(componentType, this.document, this.id);
		this.update();
		return this.children[position] as ComponentNode;
	}

	/**
	 * Creates a ComponentJunction node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 *
	 * @param junctionType (Optional) A junction type to be given to the new node immediately
	 * @return The newly created node
	 */
	createComponentJunctionNode(position: Arg.left | Arg.right, junctionType?: JunctionType) : ComponentJunctionNode {
		this.children[position] = new ComponentJunctionNode(this.componentType, this.document, this.id, junctionType);
		this.update();
		return this.children[position] as ComponentJunctionNode;
	}
}
