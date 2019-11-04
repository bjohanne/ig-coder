import { INode } from "../interfaces";
import { NodeType, JunctionType, ComponentType, SubcomponentType } from "../enums";
import { NodeCounter } from "../document";
import { Entry } from "../entry";
import { Component } from "../component";

import NormNode from "./norm";
import ConventionNode from "./convention";
import JunctionNode from "./junction";
import NegationNode from "./negation";
import ComponentNode from "./component";
import SubcomponentNode from "./subcomponent";

/**
 * The base node has the implementation of INode.
 * It is also used as dummy children for certain node types.
 */
export class BaseNode implements INode {
    id!: number;
    document!: number;
    nodeType!: NodeType;
    parent?: number;
    origin?: number;
    children!: INode[];
    createdAt!: Date;
    updatedAt!: Date;

    // Members specific to certain node types, ignored if not applicable (sorry about the hacky approach)
    componentType!: ComponentType;
    component!: Component;
    subcomponentType!: SubcomponentType;

    /**
     * The base constructor for all nodes
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(document: number, parent?: number, origin?: number) {
        this.id = NodeCounter.getInstance().getNextNodeId(document);
        this.document = document;
        if (parent) {
            this.parent = parent;
        }
        if (origin) {
            this.origin = origin;
        }
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * Creates a Junction node as child of this node, if legal.
     * NOTE: This function will overwrite any existing descendants in the given index without warning.
     * If index does not apply to this node's children, index 0 will be used.
     * @param index The index of this node's children array in which the Junction node should reside
     */
    createJunctionNode(index: number) {
        switch(this.nodeType) {
            case NodeType.norm:
                throw new Error("Norm nodes cannot have Junction nodes as children");
                break;
            case NodeType.convention:
                throw new Error("Convention nodes cannot have Junction nodes as children");
                break;
            case NodeType.junction:
                if (index === 0 || index === 1) {
                    this.children[index] = new JunctionNode(this.document, this.id);
                } else {
                    throw new Error(`Invalid children index ${index} for existing Junction node`);
                }
                break;
            case NodeType.sanction:
                throw new Error("Sanction nodes cannot have Junction nodes as children");
                break;
            case NodeType.negation:
                this.children[0] = new JunctionNode(this.document, this.id); // Ignore index
                break;
            case NodeType.component:
                switch(this.componentType) {
                    case ComponentType.attributes:
                        this.children[0] = new JunctionNode(this.document, this.id); // Ignore index
                        break;
                    case ComponentType.object:
                        if (index === 0 || index === 1) {
                            this.children[index] = new JunctionNode(this.document, this.id);
                        } else {
                            throw new Error(`Invalid children index ${index} for existing Component node of type Object`);
                        }
                        break;
                    case ComponentType.deontic:
                        throw new Error("Component nodes of type Deontic cannot have children");
                        break;
                    case ComponentType.aim:
                        this.children[0] = new JunctionNode(this.document, this.id); // Ignore index
                        break;
                    case ComponentType.conditions:
                        throw new Error("Component nodes of type Conditions cannot have Junction nodes as children");
                        break;
                    default:
                }
                break;
            case NodeType.subcomponent:
                switch(this.subcomponentType) {
                    case SubcomponentType.direct:
                        throw new Error("Subcomponent nodes of type Direct cannot have children");
                        break;
                    case SubcomponentType.indirect:
                        throw new Error("Subcomponent nodes of type Indirect cannot have children");
                        break;
                    case SubcomponentType.activation:
                        this.children[0] = new JunctionNode(this.document, this.id); // Ignore index
                        break;
                    case SubcomponentType.execution:
                        this.children[0] = new JunctionNode(this.document, this.id); // Ignore index
                        break;
                    default:
                }
                break;
            default:
        }
    }

    /**
     * Creates a Negation node as child of this node, if legal.
     * NOTE: Currently this function will overwrite any existing descendants in the given index, without warning.
     * If index does not apply to this node's children, index 0 will be used.
     * @param index The index of this node's children array in which the Negation node should reside
     */
    createNegationNode(index: number) {
        switch(this.nodeType) {
            case NodeType.norm:
                throw new Error("Norm nodes cannot have Negation nodes as children");
                break;
            case NodeType.convention:
                throw new Error("Convention nodes cannot have Negation nodes as children");
                break;
            case NodeType.junction:
                if (index === 0 || index === 1) {
                    this.children[index] = new NegationNode(this.document, this.id);
                } else {
                    throw new Error(`Invalid children index ${index} for existing Junction node`);
                }
                break;
            case NodeType.sanction:
                throw new Error("Sanction nodes cannot have Negation nodes as children");
                break;
            case NodeType.negation:
                this.children[0] = new NegationNode(this.document, this.id); // Ignore index
                break;
            case NodeType.component:
                switch(this.componentType) {
                    case ComponentType.attributes:
                        this.children[0] = new NegationNode(this.document, this.id); // Ignore index
                        break;
                    case ComponentType.object:
                        if (index === 0 || index === 1) {
                            this.children[index] = new NegationNode(this.document, this.id);
                        } else {
                            throw new Error(`Invalid children index ${index} for existing Component node of type Object`);
                        }
                        break;
                    case ComponentType.deontic:
                        throw new Error("Component nodes of type Deontic cannot have children");
                        break;
                    case ComponentType.aim:
                        this.children[0] = new NegationNode(this.document, this.id); // Ignore index
                        break;
                    case ComponentType.conditions:
                        throw new Error("Component nodes of type Conditions cannot have Negation nodes as children");
                        break;
                    default:
                }
                break;
            case NodeType.subcomponent:
                switch(this.subcomponentType) {
                    case SubcomponentType.direct:
                        throw new Error("Subcomponent nodes of type Direct cannot have children");
                        break;
                    case SubcomponentType.indirect:
                        throw new Error("Subcomponent nodes of type Indirect cannot have children");
                        break;
                    case SubcomponentType.activation:
                        this.children[0] = new NegationNode(this.document, this.id); // Ignore index
                        break;
                    case SubcomponentType.execution:
                        this.children[0] = new NegationNode(this.document, this.id); // Ignore index
                        break;
                    default:
                }
                break;
            default:
        }
    }

    /**
     * Creates a Component node as child of this node, if legal.
     * NOTE: Currently this function will overwrite any existing descendants in the given index, without warning.
     * If index does not apply to this node's children, index 0 will be used.
     * @param componentType The type of component (Attributes, Object, Deontic, Aim or Conditions)
     * @param index The index of this node's children array in which the Component node should reside
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    createComponentNode(componentType: ComponentType, index: number, origin?: number) {
        switch(this.nodeType) {
            case NodeType.norm:
                throw new Error("Cannot add child nodes to Norm nodes - modify instead");
                break;
            case NodeType.convention:
                throw new Error("Cannot add child nodes to Convention nodes - modify instead");
                break;
            case NodeType.junction:
                if (index === 0 || index === 1) {
                    this.children[index] = new ComponentNode(componentType, this.document, this.id, origin);
                } else {
                    throw new Error(`Invalid children index ${index} for existing Junction node`);
                }
                break;
            case NodeType.sanction:
                throw new Error("Sanction nodes cannot have Component nodes as children");
                break;
            case NodeType.negation:
                throw new Error("Negation nodes cannot have Component nodes as children");
                break;
            case NodeType.component:
                if (this.componentType === ComponentType.deontic) {
                    throw new Error("Component nodes of type Deontic cannot have children");
                } else if (this.componentType === ComponentType.object || this.componentType === ComponentType.conditions) {
                    throw new Error("Component nodes of type Object or Conditions cannot have Component nodes as children");
                } else if (this.component) {
                    throw new Error("Nodes with text content cannot have children");
                } else {    // Component node has type Attributes or Aim and no text content
                    this.children[0] = new ComponentNode(componentType, this.document, this.id, origin); // Ignore index
                }
                break;
            case NodeType.subcomponent:
                throw new Error("Subcomponent nodes cannot have Component nodes as children");
            default:
        }
    }

    /**
     * Creates a Subcomponent node as child of this node, if legal.
     * NOTE: Currently this function will overwrite any existing descendants in the given index, without warning.
     * If index does not apply to this node's children, index 0 will be used.
     * @param subcomponentType The type of subcomponent (Direct, Indirect)
     * @param origin (Optional) The ID of the node this node is a reference to
     * @param index The index of this node's children array in which the Subcomponent node should reside
     */
    createSubcomponentNode(subcomponentType: SubcomponentType.direct | SubcomponentType.indirect, index: number, origin?: number) {
        switch(this.nodeType) {
            case NodeType.norm:
                throw new Error("Norm nodes cannot have Subcomponent nodes as children");
                break;
            case NodeType.convention:
                throw new Error("Convention nodes cannot have Subcomponent nodes as children");
                break;
            case NodeType.junction:
                if (index === 0 || index === 1) {
                    this.children[index] = new SubcomponentNode(subcomponentType, this.document, this.id, origin);
                } else {
                    throw new Error(`Invalid children index ${index} for existing Junction node`);
                }
                break;
            case NodeType.sanction:
                throw new Error("Sanction nodes cannot have Subcomponent nodes as children");
                break;
            case NodeType.negation:
                throw new Error("Negation nodes cannot have Subcomponent nodes as children");
                break;
            case NodeType.component:
                if (this.componentType !== ComponentType.object) {
                    throw new Error("Component nodes of a type other than Object cannot have Subcomponent nodes as children");
                } else if (this.component) {
                    throw new Error("Nodes with text content cannot have children");
                } else {    // Component node has type Object and no text content
                    if (index === 0 || index === 1) {
                        this.children[index] = new SubcomponentNode(subcomponentType, this.document, this.id, origin);
                    } else {
                        throw new Error(`Invalid children index ${index} for existing Component node of type Object`);
                    }
                }
                break;
            case NodeType.subcomponent:
                throw new Error("Subcomponent nodes cannot have Subcomponent nodes as children");
            default:
        }
    }
}
