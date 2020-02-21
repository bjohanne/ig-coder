import { BaseNode } from "./base";
import { INode, ITwoChildren } from "../interfaces";
import { JunctionType, NodeType, ComponentType, SubcomponentType, Arg } from "../enums";

import NormNode from "./norm";
import ConventionNode from "./convention";
import NegationNode from "./negation";
import ComponentNode from "./component";
import SubcomponentNode from "./subcomponent";

/**
 * The Junction node is the main building block of horizontal nesting.
 * It is used to combine nodes with logical operators.
 */
export default class JunctionNode extends BaseNode implements ITwoChildren {
	nodeType: NodeType = NodeType.junction;
	junctionType!: JunctionType;
	children!: [INode, INode];   // Two children

	/**
	* Creates a new Junction node with dummy children.
	*
	* @param document The ID of the document this node belongs to
	* @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
	*/
	constructor(document: number, parent?: number) {
		super(document, parent);
		this.children = [
			new BaseNode(document, this.id),
			new BaseNode(document, this.id)
		]; // Dummy children
	}

	/**
	* Assigns a junction type to this node.
	* @param junctionType and/or/xor
	*/
	setJunction(junctionType: JunctionType) {
		this.junctionType = junctionType;
	}

	/* Getters for the children */

	getLeft() : INode {
		if (typeof this.children[0].nodeType === "undefined") {
			throw new Error("Left child of this Junction node is a dummy node");
		}
		return this.children[0];
	}

	getRight() : INode {
		if (typeof this.children[1].nodeType === "undefined") {
			throw new Error("Right child of this Junction node is a dummy node");
		}
		return this.children[1];
	}

	/**
	* Creates a Norm or Convention node as child of this node.
	* @param type Whether to create a Norm or Convention node
	* @param position Whether the new node should be the left or right child of this node
	* @param statement (Optional) The full text of the statement
	* @param origin (Optional) The ID of the node the new node is a reference to
	*/
	createNormOrConventionNode(type: Arg.norm | Arg.convention, position: Arg.left | Arg.right, statement?: string, origin?: number) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = (type === Arg.norm) ? new NormNode(this.document, statement, this.id, origin)
			: new ConventionNode(this.document, statement, this.id, origin);
	}

	/**
	* Creates a Junction node as child of this node.
	* @param position Whether the new node should be the left or right child of this node
	*/
	createJunctionNode(position: Arg.left | Arg.right) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new JunctionNode(this.document, this.id);
	}

	/**
	* Creates a Negation node as child of this node.
	* @param position Whether the new node should be the left or right child of this node
	*/
	createNegationNode(position: Arg.left | Arg.right) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new NegationNode(this.document, this.id);
	}

	/**
	* WARNING: This function allows breaking the data structure. To comply with the specification,
	* only call this under a C/SC node with a matching component type.
	* This restriction is enforced by Document.validate().
	*
	* Creates a Component node as child of this node, if legal.
	* @param componentType The type of component (Attributes, Object, Deontic, Aim or Conditions)
	* @param position Whether the new node should be the left or right child of this node
	* @param origin (Optional) The ID of the node this node is a reference to
	*/
	createComponentNode(componentType: ComponentType, position: Arg.left | Arg.right, origin?: number) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new ComponentNode(componentType, this.document, this.id);
	}

	/**
	* WARNING: This function allows breaking the data structure. To comply with the specification,
	* only call this under a C/SC node with a matching component or subcomponent type.
	* This restriction is enforced by Document.validate().
	*
	* Creates a Subcomponent node as child of this node, if legal.
	* @param subcomponentType The type of component (Attributes, Object, Deontic, Aim or Conditions)
	* @param position Whether the new node should be the left or right child of this node
	* @param origin (Optional) The ID of the node this node is a reference to
	*/
	createSubcomponentNode(subcomponentType: SubcomponentType, position: Arg.left | Arg.right, origin?: number) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new SubcomponentNode(subcomponentType, this.document, this.id);
	}
}
