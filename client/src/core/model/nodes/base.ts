import { INode } from "../interfaces";
import { NodeType } from "../enums";
import { IDCounter } from "../document";

/**
 * This is the base class for nodes, which implements INode.
 * It is also used as dummy children for several node types.
 */
export default class BaseNode implements INode {
	/* ID of this Node, unique within its Document */
    id!: number;
    /* ID of the Document this node belongs to */
    document!: number;
    /* This Node's type/archetype/role in the statement tree */
    nodeType!: NodeType;
    /* Whether this Node's meaning is negated */
    isNegated: boolean = false;
    /* ID of the node this node is a child of (undefined if root) */
    parent?: number;
    /* The time and date this Node was created */
    createdAt!: Date;
    /* The time and date this Node was last changed */
    updatedAt!: Date;
    /* Array of child nodes of this Node */
    children!: INode[];

    /**
     * The base constructor for all nodes
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     */
    constructor(document: number, parent?: number) {
        this.id = IDCounter.getInstance().getNextId(document);
        this.document = document;
        if (parent) {
            this.parent = parent;
        }
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

	/**
	 * Find the index of a child of this node.
	 * Returns undefined if no child with ID targetId exists.
	 * Used for finding children of node types that can have many non-fixed children.
	 *
	 * @param targetId The ID of the child to locate
	 */
	getChildIndexById(targetId: number) : number | undefined {
		for (let i = 0; i < this.children.length; i++) {
			if (this.children[i].id === targetId) {
				return i;
			}
		}
		return undefined;
	}

    /**
     * Check whether this node is a dummy node, i.e. a BaseNode.
     * Plain base nodes do not have the nodeType field.
     * NB: The check must be done in this way, not "instanceof BaseNode"
     * because that test counts inheritance, meaning all node types pass.
     */
    isDummy() : boolean {
        return (typeof this.nodeType === "undefined");
    }

	/**
	 * Small abstraction/convenience to set the updatedAt field to the current time.
	 * Called when a property on the node is modified or when a child is created on the node.
	 */
	update() : void {
		this.updatedAt = new Date();
	}

	/**
	 * Recreates the Date objects based on the dates stored in it.
	 * Used when rebuilding from JSON, and the dates are encoded as numbers or strings.
	 */
	rebuildDates() : void {
		this.createdAt = new Date(this.createdAt);
		this.updatedAt = new Date(this.updatedAt);
	}

	/**
	 * Small abstraction to set isNegated to true.
	 */
	turnNegationOn() : void {
		this.isNegated = true;
	}

	/**
	 * Small abstraction to set isNegated to false.
	 */
	turnNegationOff() : void {
		this.isNegated = false;
	}
}
