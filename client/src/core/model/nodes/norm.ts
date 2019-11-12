import { BaseNode } from "./base";
import ComponentNode from "./component";
import { Entry } from "../entry";
import { NodeType, ComponentType } from "../enums";
import { INormAndConvention } from "../interfaces";

/**
 * This is one of two node types that represent an Entry.
 */
export default class NormNode extends BaseNode implements INormAndConvention {
    nodeType: NodeType = NodeType.norm;
    entry!: Entry;
    children!: [ComponentNode, ComponentNode, ComponentNode, ComponentNode, ComponentNode]; // Five Component nodes as children

    /**
     * Creates a new Norm node with fixed children.
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(document: number, parent?: number, origin?: number) {
        super(document, parent, origin);
        // Create fixed children
        this.children = [
            new ComponentNode(ComponentType.attributes, document, this.id),
            new ComponentNode(ComponentType.object, document, this.id),
            new ComponentNode(ComponentType.deontic, document, this.id),
            new ComponentNode(ComponentType.aim, document, this.id),
            new ComponentNode(ComponentType.conditions, document, this.id)
        ];
    }

    /**
     * Adds an Entry with the passed in statement to the node.
     * @param statement The full text the Norm node represents
     */
    setEntry(statement: string) : void {
        this.entry = new Entry(statement);
    }

    /* Getters for the children */

    getAttributes() : ComponentNode {
        return this.children[0];
    }

    getObject() : ComponentNode {
        return this.children[1];
    }

    getDeontic() : ComponentNode {
        return this.children[2];
    }

    getAim() : ComponentNode {
        return this.children[3];
    }

    getConditions() : ComponentNode {
        return this.children[4];
    }
}
