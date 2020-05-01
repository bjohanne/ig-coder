import BaseNode from "./base";
import { INode, ITwoChildren } from "../interfaces";
import { JunctionType, NodeType, ComponentType, SubcomponentType, SubtreeType, Arg } from "../enums";

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
    componentType?: ComponentType;		 // Used to check for correct type within Entry subtrees
    subcomponentType?: SubcomponentType; // Used to check for correct type within Entry subtrees
	children!: [INode, INode];   // Two children

	/**
	 * Creates a new Junction node with dummy children.
	 *
	 * @param document The ID of the document this node belongs to
	 * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
	 * @param subtree (Optional) The subtree this node is part of. Should be the same as its parent - used to pass that down.
	 * @param componentType (Optional) The component type of this node's ancestor ComponentNode, if it has one.
	 * @param subcomponentType (Optional) The subcomponent type of this node's ancestor SubcomponentNode, if it has one.
	 */
	constructor(document: number, parent?: number, subtree?: SubtreeType, componentType?: ComponentType, subcomponentType?: SubcomponentType) {
		super(document, parent, subtree);
		this.componentType = componentType;
		this.subcomponentType = subcomponentType;
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
		this.update();
	}

	/* Getters for the children */

	getLeft() : INode {
		if (this.children[0].isDummy()) {
			throw new Error("Left child of this Junction node is a dummy node");
		}
		return this.children[0];
	}

	getRight() : INode {
		if (this.children[1].isDummy()) {
			throw new Error("Right child of this Junction node is a dummy node");
		}
		return this.children[1];
	}

	/**
	 * Creates a Norm or Convention node as child of this node.
	 *
	 * @param type Whether to create a Norm or Convention node
	 * @param position Whether the new node should be the left or right child of this node
	 * @param statement (Optional) The full text of the statement
	 * @param origin (Optional) The ID of the node the new node is a reference to
	 */
	createNormOrConventionNode(type: Arg.norm | Arg.convention, position: Arg.left | Arg.right, statement?: string, origin?: number) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = (type === Arg.norm) ? new NormNode(this.document, statement, this.id, origin)
			: new ConventionNode(this.document, statement, this.id, origin);
		this.update();
	}

	/**
	 * Creates a Junction node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 */
	createJunctionNode(position: Arg.left | Arg.right) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new JunctionNode(this.document, this.id, this.subtree, this.componentType, this.subcomponentType);
		this.update();
	}

	/**
	 * Creates a Negation node as child of this node.
	 * @param position Whether the new node should be the left or right child of this node
	 */
	createNegationNode(position: Arg.left | Arg.right) {
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new NegationNode(this.document, this.id, this.subtree, this.componentType, this.subcomponentType);
		this.update();
	}

	/**
	 * Creates a Component node as child of this node, if legal.
	 *
	 * @param componentType The type of component (Attributes, Object, Deontic, Aim or Conditions)
	 * @param position Whether the new node should be the left or right child of this node
	 * @param origin (Optional) The ID of the node this node is a reference to
	 */
	createComponentNode(componentType: ComponentType, position: Arg.left | Arg.right, origin?: number) {
		if (this.subtree !== SubtreeType.entry) {
			throw new Error("Cannot create a Component node outside of a Norm/Convention subtree");
		}
		if (this.subcomponentType) {
			throw new Error("Cannot create a Component node as descendant of a Subcomponent node");
		}
		if (this.componentType !== componentType) {
			throw new Error("The provided component type does not match ancestor's component type");
		}
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new ComponentNode(componentType, this.document, this.id, this.subtree, origin);
		this.update();
	}

	/**
	 * Creates a Subcomponent node as child of this node, if legal.
	 *
	 * @param subcomponentType The type of component (Attributes, Object, Deontic, Aim or Conditions)
	 * @param position Whether the new node should be the left or right child of this node
	 * @param origin (Optional) The ID of the node this node is a reference to
	 */
	createSubcomponentNode(subcomponentType: SubcomponentType, position: Arg.left | Arg.right, origin?: number) {
		if (this.subtree !== SubtreeType.entry) {
			throw new Error("Cannot create a Component node outside of a Norm/Convention subtree");
		}
		if (this.subcomponentType !== subcomponentType) {
			throw new Error("The provided subcomponent type does not match ancestor's subcomponent type");
		}
		let index = (position === Arg.left) ? 0 : 1;
		this.children[index] = new SubcomponentNode(subcomponentType, this.document, this.id, this.subtree, origin);
		this.update();
	}
}
