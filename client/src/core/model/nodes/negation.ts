import BaseNode from "./base";
import { INode, IOneChild } from "../interfaces";
import { NodeType, ComponentType, SubcomponentType, SubtreeType, Arg } from "../enums";

import NormNode from "./norm";
import ConventionNode from "./convention";
import JunctionNode from "./junction";

/**
 * The Negation node has exactly one child and is placed above a node
 * to signify that the node's meaning should be negated.
 */
export default class NegationNode extends BaseNode implements IOneChild {
    nodeType: NodeType = NodeType.negation;
    componentType?: ComponentType;		 // Used to check for correct type within Entry subtrees
    subcomponentType?: SubcomponentType; // Used to check for correct type within Entry subtrees
	children!: [INode]; // One child

    /**
     * Creates a new Negation node with a dummy child.
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
		this.children = [ new BaseNode(document, this.id) ]; // Dummy child
    }

    // Getter for the child
    getChild() : INode {
        if (this.children[0].isDummy()) {
            throw new Error("The child of this Negation node is a dummy node");
        }
        return this.children[0];
    }

    /**
     * Creates a Norm or Convention node as child of this node.
	 *
     * @param type Whether to create a Norm or Convention node
	 * @param statement (Optional) The full text of the statement
     * @param origin (Optional) The ID of the node the new node is a reference to
     */
    createNormOrConventionNode(type: Arg.norm | Arg.convention, statement?: string, origin?: number) {
        this.children = [(type === Arg.norm) ? new NormNode(this.document, statement, this.id, origin)
            : new ConventionNode(this.document, statement, this.id, origin)];
		this.update();
    }

    /**
     * Creates a Junction node as child of this node.
     */
    createJunctionNode() {
        this.children[0] = new JunctionNode(this.document, this.id, this.subtree, this.componentType, this.subcomponentType);
		this.update();
    }
}
