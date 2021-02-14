import {
    BaseNode,
    ComponentJunctionNode,
    ConstitutiveStatementNode,
    RegulativeStatementNode,
    StatementJunctionNode
} from "./";
import {IComponentNode, INode} from "../interfaces";
import {Arg, ComponentType, ContextType, NodeType} from "../enums";
import {Primitive} from "../primitive";
import {DataError, DataErrorType} from "../errors";
import {matchComponentTypes} from "../helpers";

/**
 * Component nodes hold a regulative or constitutive component. This class accommodates both.
 */
export default class ComponentNode extends BaseNode implements IComponentNode {
    nodeType: NodeType = NodeType.component;
    /* The second-level component type of this node */
    componentType!: ComponentType;
    /* Holds the text content of the institutional component */
    primitive!: Primitive;
    /* Context type held by component type Context */
    contextType?: ContextType;
    /* Array of child nodes of this Node */
    children!: INode[];

    /**
     * Creates a new Component node with dummy or fixed children, and an empty Component.
     *
     * @param componentType This node's institutional component type
     * @param document The ID of the document this node belongs to
     * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
     */
    constructor(componentType: ComponentType, document: number, parent: number) {
        super(document, parent);
		this.primitive = new Primitive();
        this.componentType = componentType;
        this.children = [];     // Component nodes start without children
    }

    /**
     * Internal function that is called by all create*() functions.
     * Checks this node's number of children, which dictates how the child should be added to the array.
     * When the child is added, this node's text content is also deleted.
     * NB: Assumes that it is legal to add the child.
     *
     * @param node A reference to the node to be added as a child
     */
    private addChild(node: INode) : INode {
        if (this.children.length === 0 || [
            ComponentType.activationconditions,
            ComponentType.executionconstraints
        ].includes(this.componentType)) {
            this.children.push(node);   // Can simply push to the array if it's empty or Component type is Context

        } else if (this.children.length === 1) {    // Nodes that currently have 1 child
            console.warn("Overwriting only child of Component node with ID " + this.id);
            this.children[0] = node; // Accessing index 0 is now safe. Overwrites index 0.

        } else {
            throw new DataError(DataErrorType.CMP_BAD_PARENT);
        }
        this.unsetContent(); // Delete this node's text content
        this.update();
		return node;
    }

    /**
     * Modifies the node's Component with the passed in text content.
     * This function also deletes any descendants the node has.
     *
     * @param content (Optional) The text that most narrowly fits the component
     * @param prefix (Optional) Excess text that goes before the main content
     * @param suffix (Optional) Excess text that goes after the main content
     */
    setContent(content?: string, prefix?: string, suffix?: string) : void {
        if (!this.primitive) {
            throw new DataError(DataErrorType.CMP_GET_TXT_UNDEF);
        } else {
            this.primitive.set(content, prefix, suffix);
            console.warn("Deleting all descendants of Component node with ID " + this.id +
                " due to text content being set");
            this.children.length = 0;
            this.update();
        }
    }

	/**
	 * Unsets the Primitive's content (not the Primitive itself, which should always be defined).
	 */
	unsetContent() : void {
		this.primitive.unset();
		this.update();
	}

    /**
     * Sets the context type to the passed context type.
     * Throws an error if this node is not of component type Context.
     *
     * @param contextType The context type to set
     */
	setContextType(contextType: ContextType) : void {
	    if (this.componentType !== ComponentType.context) {
	        throw new DataError(DataErrorType.CMP_CTXT_TYPE);
        }
	    this.contextType = contextType;
        this.update();
    }

    /**
     * Unsets the context type (sets it to undefined).
     * Throws an error if this node is not of component type Context.
     */
    unsetContextType() : void {
        if (this.componentType !== ComponentType.context) {
            throw new DataError(DataErrorType.CMP_CTXT_TYPE);
        }
	    this.contextType = undefined;
        this.update();
    }

    /**
     * Find the index of a child of this node.
     * Returns undefined if no child with ID targetId exists.
     * Used for deleting children of ActivationConditions or ExecutionConstraints.
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
     * Returns this node's child in the given index.
     * Throws an error if the index is out of bounds
     * or the node in it is a dummy node or undefined.
     */
    getChild(position: number) : INode | undefined {
        if (position < 0 || position >= this.children.length) {	    // Ensure the given index is accessible,
            throw new DataError(DataErrorType.CMP_BAD_CHILD_IDX);	    // though it may contain a dummy node
        }
        if (this.children[position].isDummy()) {
            throw new DataError(DataErrorType.CMP_GET_DUM);
        }
        return this.children[position];
    }

    /**
     * Delete a child of this node.
     * The child is overwritten with a new dummy node, deleting the old data and all its descendants.
     * Throws an error if position is out of bounds (based on the current number of children).
     *
     * @param position The children array index of the child node to delete
     */
    deleteChild(position: number) : void {
        if (position < 0 || position >= this.children.length) {	    // Ensure the given index is accessible,
            throw new DataError(DataErrorType.CMP_BAD_CHILD_IDX);	    // though it may contain a dummy node
        }
        if (this.children[position].isDummy()) {
            console.warn("Attempt to delete dummy child with ID " + this.children[position].id +
                " of Component node with ID " + this.id);
            return;
        }
        switch (this.componentType) {   // Handle component types that cannot have children
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD_DEL);
            case ComponentType.modal:
                throw new DataError(DataErrorType.CMP_MODAL_ADD_DEL);
            case ComponentType.nestedcontext:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL);
            default:
        }
        console.warn("Deleting child at index " + position +
            " of Component node with ID " + this.id);
        this.children[position] = new BaseNode(this.document, this.id);
        this.update();
    }

    /**
     * Creates a Statement node as child of this node, either regulative or constitutive, if legal.
     * Throws an error if illegal.
     *
     * @param type Whether the new statement should be regulative or constitutive
     */
    createStatementNode(type: Arg.regulative | Arg.constitutive) : INode | undefined {
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD_DEL);
            case ComponentType.aim:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.modal:
                throw new DataError(DataErrorType.CMP_MODAL_ADD_DEL);
            case ComponentType.constitutivefunction:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.activationconditions:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.executionconstraints:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.nestedcontext:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL);
            default:
        }
        this.update();
        return this.addChild((type === Arg.regulative ) ? new RegulativeStatementNode(this.document, this.id)
            : new ConstitutiveStatementNode(this.document, this.id));
    }

    /**
     * Creates a StatementJunction node as child of this node, if legal.
     * Throws an error if illegal.
     */
    createStatementJunctionNode() : INode | undefined {
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD_DEL);
            case ComponentType.aim:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.modal:
                throw new DataError(DataErrorType.CMP_MODAL_ADD_DEL);
            case ComponentType.constitutivefunction:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.activationconditions:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.executionconstraints:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.nestedcontext:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL);
            default:
        }
        this.update();
        return this.addChild(new StatementJunctionNode(this.document, this.id));
    }

    /**
     * Creates a ComponentJunction node as child of this node, if legal.
     * Throws an error if illegal.
     */
    createComponentJunctionNode() : INode | undefined {
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD_DEL);
            case ComponentType.orelse:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN);
            case ComponentType.modal:
                throw new DataError(DataErrorType.CMP_MODAL_ADD_DEL);
            case ComponentType.activationconditions:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN);
            case ComponentType.executionconstraints:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN);
            case ComponentType.nestedcontext:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL);
            default:
        }
        this.update();
        return this.addChild(new ComponentJunctionNode(this.componentType, this.document, this.id));
    }

    /**
     * Creates a Component node as child of this node, if legal.
     * There is only one situation in which this is legal:
     * - this is a Context node and we are creating a NestedContext node
     * Throws an error if illegal.
     *
     * @param componentType The component type the new node should have
     */
    createComponentNode(componentType: ComponentType) : INode | undefined {
        if (!matchComponentTypes(this.componentType, componentType)) {
            throw new DataError(DataErrorType.CMP_TYPE_MISMATCH);
        }
        this.update();
        return this.addChild(new ComponentNode(componentType, this.document, this.id));
    }
}
