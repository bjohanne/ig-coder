import { BaseNode } from "./base";
import { INode, IComponentAndSubNode, ITwoChildren } from "../interfaces";
import { NodeType, ComponentType , SubcomponentType} from "../enums";
import { Component } from "../component";

import NormNode from "./norm";
import ConventionNode from "./convention";
import JunctionNode from "./junction";
import NegationNode from "./negation";
import SubcomponentNode from "./subcomponent";

/**
 * This type of node holds an ABDICO component: Attributes, Object, Deontic, Aim or Conditions.
 */
export default class ComponentNode extends BaseNode implements IComponentAndSubNode, ITwoChildren {
    nodeType: NodeType = NodeType.component;
    children!: INode[]; // Any number of children
    componentType!: ComponentType; // The type of component
    component!: Component;  // Holds the actual text content

    /**
     * Creates a new Component node without children, except if it is of type Conditions,
     * in which case it gets two fixed Subcomponent children.
     *
     * @param componentType This node's component type (Attributes, Object, Deontic, Aim or Conditions)
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(componentType: ComponentType, document: number, parent?: number, origin?: number) {
        super(document, parent, origin);
        this.componentType = componentType;
        if (this.componentType === ComponentType.object) {
            this.children = [ new BaseNode(document), new BaseNode(document) ]; // Dummy children
        } else if (this.componentType === ComponentType.conditions) {
            this.children = [
                new SubcomponentNode(SubcomponentType.activation, document, this.id), // Fixed children
                new SubcomponentNode(SubcomponentType.execution, document, this.id)
            ];
        } else {
            this.children = []; // No children
        }
    }

    setContent(content: string, prefix?: string, suffix?: string) : void {
        this.component = new Component(content, prefix, suffix);
    }

    getLeft() : INode {
        if (this.componentType !== ComponentType.object && this.componentType !== ComponentType.conditions) {
            throw new Error("Component type must be Object or Conditions in order to get left child");
        }
        return this.children[0];
    }

    getRight() : INode {
        if (this.componentType !== ComponentType.object && this.componentType !== ComponentType.conditions) {
            throw new Error("Component type must be Object or Conditions in order to get right child");
        }
        return this.children[1];
    }

    /**
     * Creates a Norm or Convention node as child of this node, if legal.
     * NOTE: This function will overwrite any existing descendants in the given index without warning.
     * If index does not apply to this node's children, index 0 will be used.
     * @param deontic Whether to create a Norm or Convention node
     *               (whether the statement contains a Deontic)
     * @param index The index of this node's children array in which the Junction node should reside
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    createNormOrConventionNode(deontic: boolean, index: number, origin?: number) {
        switch(this.componentType) {
            case ComponentType.attributes:
                if (deontic) {
                    throw new Error("Component nodes of type Attributes cannot have Norm nodes as children");
                } else {
                    this.children[0] = new ConventionNode(this.document, this.id, origin); // Ignore index
                }
                break;
            case ComponentType.object:
                if (index === 0 || index === 1) {
                    if (deontic) {
                        throw new Error("Component nodes of type Object cannot have Norm nodes as children");
                    } else {
                        this.children[0] = new ConventionNode(this.document, this.id, origin); // Ignore index
                    }
                } else {
                    throw new Error(`Invalid children index ${index} for existing Component node of type Object`);
                }
                break;
            case ComponentType.deontic:
                throw new Error("Component nodes of type Deontic cannot have children");
                break;
            case ComponentType.aim:
                throw new Error("Component nodes of type Aim cannot have Norm/Convention nodes as children");
                break;
            case ComponentType.conditions:
                throw new Error("Component nodes of type Conditions cannot have Norm/Convention nodes as children");
                break;
            default:
        }
    }
}
