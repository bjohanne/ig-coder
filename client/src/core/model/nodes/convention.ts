import { BaseNode } from "./base";
import ComponentNode from "./component";
import { Entry } from "../entry";
import { NodeType, ComponentType, SubtreeType } from "../enums";
import { INormAndConvention } from "../interfaces";

/**
 * Like Norm nodes, Convention nodes represent an Entry.
 */
export default class ConventionNode extends BaseNode implements INormAndConvention {
    nodeType: NodeType = NodeType.convention;
	subtree: SubtreeType = SubtreeType.entry;
    entry!: Entry;
    children!: [ComponentNode, BaseNode, ComponentNode, ComponentNode];    // Three Component nodes and one BaseNode

    /**
     * Creates a new Convention node with fixed children.
	 * Uses a dummy node to make room for adding an Object child.
     *
     * @param document The ID of the document this node belongs to
	 * @param statement (Optional) The full text of the represented statement (entry)
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(document: number, statement?: string, parent?: number, origin?: number) {
        super(document, parent, SubtreeType.entry, origin);
		this.entry = new Entry(statement);
        this.children = [
            new ComponentNode(ComponentType.attributes, document, this.id, this.subtree),
            new BaseNode(document, this.id),
            new ComponentNode(ComponentType.aim, document, this.id),
            new ComponentNode(ComponentType.conditions, document, this.id, this.subtree)
        ];
    }

    /**
     * Sets a new value to (overwrites) the content of the Entry.
     * @param statement The full text the Convention node represents
     */
    setEntry(statement: string) : void {
        this.entry.set(statement);
		this.update();
    }

	/**
	 * Unsets the content of the Entry (not the Entry itself, as it should always be present).
	 */
	unsetEntry() : void {
		this.entry.unset();
		this.update();
	}

    /* Getters for the children */

    getAttributes() : ComponentNode {
        return this.children[0];
    }

    getObject() : BaseNode {
		if (typeof this.children[1].nodeType === "undefined") {
			throw new Error("This Convention node does not have an Object child");
		}
        return this.children[1];
    }

    getAim() : ComponentNode {
        return this.children[2];
    }

    getConditions() : ComponentNode {
        return this.children[3];
    }

	/**
	 * Creates a Component node of type Object in the pre-allotted space.
	 * Will overwrite any existing Object child without warning.
     * @param origin (Optional) The ID of the node this node is a reference to
     */
	createObject(origin?: number) {
		this.children[1] = new ComponentNode(ComponentType.object, this.document, this.id, this.subtree, origin);
		this.update();
	}

	/**
	 * Deletes the Object child and all of its descendants by replacing it with a new dummy node.
	 */
	deleteObject() {
		this.children[1] = new BaseNode(this.document, this.id);
		this.update();
	}
}
