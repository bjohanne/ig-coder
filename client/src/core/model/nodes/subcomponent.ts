import { BaseNode } from "./base";
import { INode, IComponentAndSubNode, IOneChild } from "../interfaces";
import { NodeType, SubcomponentType, SubtreeType, Arg } from "../enums";
import { Component } from "../component";

import NormNode from "./norm";
import ConventionNode from "./convention";
import JunctionNode from "./junction";
import NegationNode from "./negation";

/**
 * Subcomponent nodes represent subtypes of Object and Conditions components.
 * The Subcomponent node class has an internal method for adding children because
 * Subcomponent nodes have a variable number of children.
 */
export default class SubcomponentNode extends BaseNode implements IComponentAndSubNode, IOneChild {
    nodeType: NodeType = NodeType.subcomponent;
    subcomponentType!: SubcomponentType; // The type of subcomponent
    component!: Component;  // Holds the actual text content
    children!: INode[]; // Any number of children (0-1)

    /**
     * Creates a new Subcomponent node with a dummy child and an empty Component.
     *
     * @param componentType This node's subcomponent type (Direct, Indirect, Activation, Execution)
     * @param document The ID of the document this node belongs to
     * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
	 * @param subtree (Optional) The subtree this node is part of. Should be the same as its parent - used to pass that down.
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(subcomponentType: SubcomponentType, document: number, parent: number, subtree?: SubtreeType, origin?: number) {
        super(document, parent, subtree, origin);
        this.subcomponentType = subcomponentType;
        this.component = new Component();
        this.children = [ new BaseNode(document, this.id) ]; // Dummy child
    }

    /**
     * Internal function that is called by all create*() functions.
     * Checks this node's number of children, which dictates how the child should be added.
     * When the child is added, this node's text content is also deleted.
     * @param node A reference to the node to be added as a child
     */
    private addChild(node: INode) {
        if (this.children.length === 0) { // No nodes in the array, dummy or not
            this.children.push(node);
        } else if (this.children.length === 1) {
            this.children[0] = node; // Accessing index 0 is now safe
        }
        this.unsetContent(); // Delete this node's text content
		this.update();
    }

    /**
     * Modifies the node's Component with the passed in text content.
     * This function also deletes any descendants the node has.
     * @param content (Optional) The text that most narrowly fits the component
     * @param prefix (Optional) Excess text that goes before the main content
     * @param suffix (Optional) Excess text that goes after the main content
     */
    setContent(content?: string, prefix?: string, suffix?: string) : void {
        if (this.subcomponentType === SubcomponentType.activation || this.subcomponentType === SubcomponentType.execution) {
            throw new Error("Cannot modify text content of Activation or Execution nodes");
        } else if (typeof this.component !== "undefined") {
            this.component.set(content, prefix, suffix);
            this.children.length = 0;
			this.update;
        }
    }

	/**
	 * Unsets the Component's content (not the Component itself, as it should always be present).
	 */
	unsetContent() : void {
		this.component.unset();
		this.update;
	}

    // Getter for the child
    getChild() : INode {
        if (this.children.length === 0) {
            throw new Error("This Subcomponent node has no children");
        }
        if (typeof this.children[0].nodeType === "undefined") {
            throw new Error("The child of this Subcomponent node is a dummy node");
        }
        return this.children[0];
    }

    /**
     * Creates a Norm or Convention node as child of this node, if legal.
     * @param type Whether to create a Norm or Convention node
	 * @param statement (Optional) The full text of the statement
     * @param origin (Optional) The ID of the node the new node is a reference to
     */
    createNormOrConventionNode(type: Arg.norm | Arg.convention, statement?: string, origin?: number) {
        if (type === Arg.norm) {
            if (this.subcomponentType === SubcomponentType.direct || this.subcomponentType === SubcomponentType.indirect) {
                throw new Error("Subcomponent nodes of an Object subtype cannot have Norm nodes as children");
            } else {
                this.addChild(new NormNode(this.document, statement, this.id, origin));
            }
        } else {
            this.addChild(new ConventionNode(this.document, statement, this.id, origin));
        }
    }

    /**
     * Creates a Junction node as child of this node.
     */
    createJunctionNode() {
        this.addChild(new JunctionNode(this.id, this.document, this.subtree, undefined, this.subcomponentType));
    }

    /**
     * Creates a Negation node as child of this node.
     */
    createNegationNode() {
        this.addChild(new NegationNode(this.document, this.id, this.subtree, undefined, this.subcomponentType));
    }

    /**
     * Creates a Subcomponent node as child of this node, if legal.
	 * Activation and Execution nodes can only be created as fixed children.
	 *
     * @param subcomponentType The type of Subcomponent (Direct, Indirect)
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    createSubcomponentNode(subcomponentType: SubcomponentType.direct | SubcomponentType.indirect, origin?: number) {
        if (this.subcomponentType === SubcomponentType.activation || this.subcomponentType === SubcomponentType.execution) {
            throw new Error("Subcomponent nodes of a Conditions subtype cannot have Subcomponent nodes as children");
        }
        this.addChild(new SubcomponentNode(subcomponentType, this.document, this.id, this.subtree, origin));
    }
}
