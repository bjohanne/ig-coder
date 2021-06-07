import {INode} from "../interfaces";
import {ContextType, NodeType} from "../enums";
import {IDCounter} from "../document";
import {
	ComponentJunctionNode,
	ComponentNode,
	ConstitutiveStatementNode,
	PropertyJunctionNode,
	PropertyNode,
	RegulativeStatementNode,
	StatementJunctionNode
} from ".";
import {DataError, DataErrorType} from "../errors";

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
	/* Optional context type for using the Context Taxonomy on this Node */
	contextType?: ContextType;
    /* ID of the node this node is a child of (undefined if root) */
    parent?: number;
    /* The time and date this Node was created */
    createdAt!: Date;
    /* The time and date this Node was last changed */
    updatedAt!: Date;
    /* Array of child nodes of this Node */
    children!: INode[];

    /**
     * The base constructor for all nodes. Generates an ID for the node unless one is provided.
	 * Sets the createdAt and updatedAt fields.
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
	 * @param id (Optional) The ID of this node if one already exists (for rebuilding from existing data)
     */
    constructor(document: number, parent?: number, id?: number) {
		this.id = (id) ? id : IDCounter.getInstance().getNextId(document);
        this.document = document;
        if (parent) {
            this.parent = parent;
        }
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

	/**
	 * Build a new node from existing data. Properties are copied to the new node from the passed in data.
	 * This function handles common BaseNode properties and calls the class-specific fromData() function
	 * based on the passed in data's node type. Those functions handle the node's children.
	 *
	 * @param data An object of type INode (can be of a more specific type that extends INode)
	 * @return A new node with the passed in properties
	 */
	static fromData(data: INode) : INode {
		let newNode;

		if (data.nodeType) {
			switch (data.nodeType) {
				case NodeType.regulativestatement:
					newNode = RegulativeStatementNode.fromData(data as RegulativeStatementNode);
					break;
				case NodeType.constitutivestatement:
					newNode = ConstitutiveStatementNode.fromData(data as ConstitutiveStatementNode);
					break;
				case NodeType.statementjunction:
					newNode = StatementJunctionNode.fromData(data as StatementJunctionNode);
					break;
				case NodeType.componentjunction:
					newNode = ComponentJunctionNode.fromData(data as ComponentJunctionNode);
					break;
				case NodeType.component:
					newNode = ComponentNode.fromData(data as ComponentNode);
					break;
				case NodeType.property:
					newNode = PropertyNode.fromData(data as PropertyNode);
					break;
				case NodeType.propertyjunction:
					newNode = PropertyJunctionNode.fromData(data as PropertyJunctionNode);
					break;
				default:
					throw new DataError(DataErrorType.BAS_BAD_NODETYPE, data.id);
			}

			// Rebuild children - does not happen for dummy nodes
			newNode.children = [];	// Make sure we start with an empty array (some constructors create children)
			for (let i = 0; i < data.children.length; i++) {
				newNode.children.push(BaseNode.fromData(data.children[i]));	// Call this same function for each child
			}
		} else {	// This is a dummy node, which can't have children
			newNode = new BaseNode(data.document, data.parent, data.id);
		}

		// Set common properties - for both normal and dummy nodes
		newNode.isNegated = data.isNegated;
		newNode.createdAt = new Date(data.createdAt);
		newNode.updatedAt = new Date(data.updatedAt);

		return newNode;
	}

	/**
	 * Find the index of a child of this node.
	 * Returns undefined if no child with ID targetId exists.
	 * Used for finding children of node types that can have many non-fixed children.
	 *
	 * @param targetId The ID of the child to locate
	 * @return The index of the child if found, -1 otherwise
	 */
	getChildIndexById(targetId: number) : number {
		for (let i = 0; i < this.children.length; i++) {
			if (this.children[i].id === targetId) {
				return i;
			}
		}
		return -1;
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
	 * Small abstraction to set isNegated to true.
	 */
	turnNegationOn() : void {
		this.isNegated = true;
		this.update();
	}

	/**
	 * Small abstraction to set isNegated to false.
	 */
	turnNegationOff() : void {
		this.isNegated = false;
		this.update();
	}

	/**
	 * Sets the context type to the passed in context type.
	 *
	 * @param contextType The context type to set
	 */
	setContextType(contextType: ContextType) : void {
		this.contextType = contextType;
		this.update();
	}

	/**
	 * Unsets the context type (sets it to undefined).
	 */
	unsetContextType() : void {
		this.contextType = undefined;
		this.update();
	}
}
