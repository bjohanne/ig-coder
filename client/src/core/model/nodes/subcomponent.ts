import { BaseNode } from "./base";
import { INode, IComponentAndSubNode } from "../interfaces";
import { NodeType, SubcomponentType } from "../enums";
import { Component } from "../component";

import NormNode from "./norm";
import ConventionNode from "./convention";
import JunctionNode from "./junction";
import NegationNode from "./negation";
import ComponentNode from "./component";

/**
 * Subcomponent nodes represent subtypes of Object and Conditions components.
 */
export default class SubcomponentNode extends BaseNode implements IComponentAndSubNode {
    nodeType: NodeType = NodeType.subcomponent;
    children!: INode[]; // Any number of children
    subcomponentType!: SubcomponentType; // The type of subcomponent
    component!: Component;  // Holds the actual text content

    /**
     * Creates a new Subcomponent node without children.
     *
     * @param componentType This node's subcomponent type (Direct, Indirect, Activation, Execution)
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(subcomponentType: SubcomponentType, document: number, parent?: number, origin?: number) {
        super(document, parent, origin);
        this.subcomponentType = subcomponentType;
        if (this.subcomponentType === SubcomponentType.direct || this.subcomponentType === SubcomponentType.indirect) {
            this.children = []; // No children
        } else if (this.subcomponentType === SubcomponentType.activation || this.subcomponentType === SubcomponentType.execution) {
            this.children = [ new BaseNode(document), new BaseNode(document) ]; // Dummy children
        }

    }

    setContent(content: string, prefix?: string, suffix?: string) : void {
        this.component = new Component(content, prefix, suffix);
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
        switch(this.subcomponentType) {
            case SubcomponentType.direct:
                throw new Error("Subcomponent nodes of type Direct cannot have children");
                break;
            case SubcomponentType.indirect:
                throw new Error("Subcomponent nodes of type Indirect cannot have children");
                break;
            case SubcomponentType.activation:
                this.children[0] = (deontic) ? new NormNode(this.document, this.id, origin) // Ignore index
                    : new ConventionNode(this.document, this.id, origin);
                break;
            case SubcomponentType.execution:
                this.children[0] = (deontic) ? new NormNode(this.document, this.id, origin) // Ignore index
                    : new ConventionNode(this.document, this.id, origin);
                break;
            default:
        }
    }
}
