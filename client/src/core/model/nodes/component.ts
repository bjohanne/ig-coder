import { BaseNode, ConventionNode, JunctionNode, NegationNode, SubcomponentNode } from "./";
import { INode, IComponentAndSubNode, IOneChild, ITwoChildren } from "../interfaces";
import { NodeType, ComponentType, SubcomponentType, SubtreeType, Arg } from "../enums";
import { Component } from "../component";
import { DataError, DataErrorType } from "../errors";

/**
 * This type of node holds an ABDICO component: Attributes, Object, Deontic, Aim or Conditions.
 * The Component node class has an internal method for adding children because Component nodes
 * have a variable number of children.
 */
export default class ComponentNode extends BaseNode implements IComponentAndSubNode, IOneChild, ITwoChildren {
    nodeType: NodeType = NodeType.component;
    componentType!: ComponentType; // The type of component
    component!: Component;  // Holds the actual text content
    children!: INode[]; // Any number of children (0-2)

    /**
     * Creates a new Component node with dummy or fixed children, and an empty Component.
     *
     * @param componentType This node's component type (Attributes, Object, Deontic, Aim or Conditions)
     * @param document The ID of the document this node belongs to
     * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
	 * @param subtree (Optional) The subtree this node is part of. Should be the same as its parent - used to pass that down.
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(componentType: ComponentType, document: number, parent: number, subtree?: SubtreeType, origin?: number) {
        super(document, parent, subtree, origin);
		this.component = new Component();
        this.componentType = componentType;
        if (this.componentType === ComponentType.object) {
            this.children = [
                new SubcomponentNode(SubcomponentType.direct, document, this.id, subtree),     // Fixed children
                new SubcomponentNode(SubcomponentType.indirect, document, this.id, subtree)
            ];
        } else if (this.componentType === ComponentType.conditions) {
            this.children = [
                new SubcomponentNode(SubcomponentType.activation, document, this.id, subtree), // Fixed children
                new SubcomponentNode(SubcomponentType.execution, document, this.id, subtree)
            ];
        } else {
            if (this.componentType !== ComponentType.deontic) {
                this.children = [ new BaseNode(document, this.id) ]; // Attributes and Aim get a dummy child
            } else {
                this.children = [];                         // Deontic gets no children
            }
        }
    }

    /**
     * Internal function that is called by all create*() functions.
     * Checks this node's number of children, which dictates how the child should be added.
     * When the child is added, this node's text content is also deleted.
	 * Assumes that it is legal to add the child under the current conditions - throws no errors.
     * @param node A reference to the node to be added as a child
     */
    private addChild(node: INode) : INode {
        if (this.children.length === 0) { // No nodes in the array, dummy or not
            this.children.push(node);
        } else if (this.children.length === 1) {
            this.children[0] = node; // Accessing index 0 is now safe
        }
        this.unsetContent(); // Delete this node's text content
		this.update();
		return node;
    }

    /**
     * Modifies the node's Component with the passed in text content.
     * This function also deletes any descendants the node has.
     * @param content (Optional) The text that most narrowly fits the component
     * @param prefix (Optional) Excess text that goes before the main content
     * @param suffix (Optional) Excess text that goes after the main content
     */
    setContent(content?: string, prefix?: string, suffix?: string) : void {
        if (this.componentType === ComponentType.object || this.componentType === ComponentType.conditions) {
            throw new DataError(DataErrorType.CMP_OBJ_CND_TXT);
        } else if (typeof this.component !== "undefined") {
            this.component.set(content, prefix, suffix);
            this.children.length = 0;
			this.update();
        }
    }

	/**
	 * Unsets the Component's content (not the Component itself, as it should always be present).
	 */
	unsetContent() : void {
		this.component.unset();
		this.update();
	}

    /* Getters for the children */

    getChild() : INode {
        if (this.componentType !== ComponentType.attributes && this.componentType !== ComponentType.aim) {
            throw new DataError(DataErrorType.CMP_AIM_ATR_GET_ONLY);
        }
        if (this.children.length === 0) {
            throw new DataError(DataErrorType.CMP_GET_UNDEF);
        }
        if (this.children[0].isDummy()) {
            throw new DataError(DataErrorType.CMP_GET_DUM);
        }
        return this.children[0];
    }

    getLeft() : INode {
        if (this.componentType !== ComponentType.object && this.componentType !== ComponentType.conditions) {
            throw new DataError(DataErrorType.CMP_OBJ_CND_GET_LR);
        }
        return this.children[0]; // Object and Conditions nodes have fixed children and cannot have dummy children
    }

    getRight() : INode {
        if (this.componentType !== ComponentType.object && this.componentType !== ComponentType.conditions) {
            throw new DataError(DataErrorType.CMP_OBJ_CND_GET_LR);
        }
        return this.children[1]; // Object and Conditions nodes have fixed children and cannot have dummy children
    }

    /**
     * Creates a Norm or Convention node as child of this node, if legal.
     * @param type Whether to create a Norm or Convention node
	 * @param statement (Optional) The full text of the statement
     * @param origin (Optional) The ID of the node the new node is a reference to
     */
    createNormOrConventionNode(type: Arg.norm | Arg.convention, statement?: string, origin?: number) : INode | undefined {
        switch(this.componentType) {
            case ComponentType.attributes:
                if (type === Arg.norm) {
                    throw new DataError(DataErrorType.CMP_ATR_ADD_NRM);
                } else {
                    return this.addChild(new ConventionNode(this.document, statement, this.id, origin));
                }
            case ComponentType.object:
                throw new DataError(DataErrorType.CMP_OBJ_ADD);
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD);
            case ComponentType.aim:
                throw new DataError(DataErrorType.CMP_AIM_ADD_NC);
            case ComponentType.conditions:
                throw new DataError(DataErrorType.CMP_CND_ADD);
            default:
        }
    }

    /**
     * Creates a Junction node as child of this node, if legal.
     */
    createJunctionNode() : INode | undefined {
        switch(this.componentType) {
            case ComponentType.attributes:
                return this.addChild(new JunctionNode(this.document, this.id, this.subtree, this.componentType));
            case ComponentType.object:
                throw new DataError(DataErrorType.CMP_OBJ_ADD);
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD);
            case ComponentType.aim:
                return this.addChild(new JunctionNode(this.document, this.id, this.subtree, this.componentType));
            case ComponentType.conditions:
                throw new DataError(DataErrorType.CMP_CND_ADD);
            default:
        }
    }

    /**
     * Creates a Negation node as child of this node, if legal.
     */
    createNegationNode() : INode | undefined {
        switch(this.componentType) {
            case ComponentType.attributes:
                return this.addChild(new NegationNode(this.document, this.id, this.subtree, this.componentType));
            case ComponentType.object:
                throw new DataError(DataErrorType.CMP_OBJ_ADD);
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD);
            case ComponentType.aim:
                return this.addChild(new NegationNode(this.document, this.id, this.subtree, this.componentType));
            case ComponentType.conditions:
                throw new DataError(DataErrorType.CMP_CND_ADD);
            default:
        }
    }
}
