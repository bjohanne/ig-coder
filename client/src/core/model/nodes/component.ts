import { BaseNode } from "./base";
import { INode, IComponentAndSubNode, IOneChild, ITwoChildren } from "../interfaces";
import { NodeType, ComponentType, SubcomponentType, SubtreeType, Arg } from "../enums";
import { Component } from "../component";

import ConventionNode from "./convention";
import JunctionNode from "./junction";
import NegationNode from "./negation";
import SubcomponentNode from "./subcomponent";

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
     * If called on an Object or Conditions node, which have fixed children, throws an error.
     * @param node A reference to the node to be added as a child
     */
    private addChild(node: INode) {
        if (this.componentType === ComponentType.object || this.componentType === ComponentType.conditions) {
            throw new Error("Cannot add children to Component nodes of type Object or Conditions");
        }
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
        if (this.componentType === ComponentType.object || this.componentType === ComponentType.conditions) {
            throw new Error("Component nodes of type Object or Conditions cannot have text content");
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
            throw new Error("Component type must be Attributes or Aim in order to get single child");
        }
        if (this.children.length === 0) {
            throw new Error("This Component node has no children");
        }
        if (typeof this.children[0].nodeType === "undefined") {
            throw new Error("The child of this Component node is a dummy node");
        }
        return this.children[0];
    }

    getLeft() : INode {
        if (this.componentType !== ComponentType.object && this.componentType !== ComponentType.conditions) {
            throw new Error("Component type must be Object or Conditions in order to get left child");
        }
        return this.children[0]; // Object and Conditions nodes have fixed children and cannot have dummy children
    }

    getRight() : INode {
        if (this.componentType !== ComponentType.object && this.componentType !== ComponentType.conditions) {
            throw new Error("Component type must be Object or Conditions in order to get right child");
        }
        return this.children[1]; // Object and Conditions nodes have fixed children and cannot have dummy children
    }

    /**
     * Creates a Norm or Convention node as child of this node, if legal.
     * @param type Whether to create a Norm or Convention node
	 * @param statement (Optional) The full text of the statement
     * @param origin (Optional) The ID of the node the new node is a reference to
     */
    createNormOrConventionNode(type: Arg.norm | Arg.convention, statement?: string, origin?: number) {
        switch(this.componentType) {
            case ComponentType.attributes:
                if (type === Arg.norm) {
                    throw new Error("Component nodes of type Attributes cannot have Norm nodes as children");
                } else {
                    this.addChild(new ConventionNode(this.document, statement, this.id, origin));
                }
                break;
            case ComponentType.object:
                throw new Error("Component nodes of type Object cannot have Norm/Convention nodes as children");
            case ComponentType.deontic:
                throw new Error("Component nodes of type Deontic cannot have children");
            case ComponentType.aim:
                throw new Error("Component nodes of type Aim cannot have Norm/Convention nodes as children");
            case ComponentType.conditions:
                throw new Error("Component nodes of type Conditions cannot have Norm/Convention nodes as children");
            default:
        }
    }

    /**
     * Creates a Junction node as child of this node, if legal.
     */
    createJunctionNode() {
        switch(this.componentType) {
            case ComponentType.attributes:
                this.addChild(new JunctionNode(this.id, this.document, this.subtree, this.componentType));
                break;
            case ComponentType.object:
                throw new Error("Component nodes of type Object cannot have Junction nodes as children");
            case ComponentType.deontic:
                throw new Error("Component nodes of type Deontic cannot have children");
            case ComponentType.aim:
                this.addChild(new JunctionNode(this.id, this.document, this.subtree, this.componentType));
                break;
            case ComponentType.conditions:
                throw new Error("Component nodes of type Conditions cannot have Junction nodes as children");
            default:
        }
    }

    /**
     * Creates a Negation node as child of this node, if legal.
     */
    createNegationNode() {
        switch(this.componentType) {
            case ComponentType.attributes:
                this.addChild(new NegationNode(this.document, this.id, this.subtree, this.componentType));
                break;
            case ComponentType.object:
                throw new Error("Component nodes of type Object cannot have Negation nodes as children");
            case ComponentType.deontic:
                throw new Error("Component nodes of type Deontic cannot have children");
            case ComponentType.aim:
                this.addChild(new NegationNode(this.document, this.id, this.subtree, this.componentType));
                break;
            case ComponentType.conditions:
                throw new Error("Component nodes of type Conditions cannot have Negation nodes as children");
            default:
        }
    }
}
