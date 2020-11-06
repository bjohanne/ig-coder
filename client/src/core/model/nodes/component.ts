import {
    BaseNode,
    ComponentJunctionNode,
    ConstitutiveStatementNode,
    RegulativeStatementNode,
    StatementJunctionNode
} from "./";
import { IComponentNode, INode } from "../interfaces";
import { Arg, ComponentType, NodeType } from "../enums";
import { Component } from "../component";
import { DataError, DataErrorType } from "../errors";
import { matchComponentTypes } from "../helpers";

/**
 * Component nodes hold a regulative or constitutive component. This class accommodates both.
 */
export default class ComponentNode extends BaseNode implements IComponentNode {
    nodeType: NodeType = NodeType.component;
    /* The second-level component type of this node */
    componentType!: ComponentType;
    /* An object that holds the text content of the institutional component */
    component!: Component;
    /* Array of child nodes of this Node */
    children!: INode[];

    /**
     * Creates a new Component node with dummy or fixed children, and an empty Component.
     *
     * @param componentType This node's component type (Attributes, Object, Deontic, Aim or Conditions)
     * @param document The ID of the document this node belongs to
     * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
     */
    constructor(componentType: ComponentType, document: number, parent: number) {
        super(document, parent);
		this.component = new Component();
        this.componentType = componentType;
        if (this.componentType === ComponentType.object) {  // Object starts with two children
            this.children = [
                new BaseNode(document, this.id),
                new BaseNode(document, this.id),
            ];
        } else {
            this.children = [];                        // All other component types start without children
        }
    }

    /**
     * Internal function that is called by all create*() functions.
     * Checks this node's number of children, which dictates how the child should be added to the array.
     * When the child is added, this node's text content is also deleted.
	 * Assumes that it is legal to add the child under the current conditions - throws no errors.
     *
     * @param node A reference to the node to be added as a child
     * @param position (Optional) If this is an Object node, whether the child node should be left or right
     */
    private addChild(node: INode, position?: Arg.left | Arg.right) : INode {
        if (this.children.length === 0 || [
            ComponentType.activationconditions,
            ComponentType.executionconstraints
        ].includes(this.componentType)) {
            this.children.push(node);   // Can simply push to the array if it's empty or Component type is Context

        } else if (this.children.length === 1) {    // Any component type that can have 1 child
            this.children[0] = node; // Accessing index 0 is now safe. Overwrites index 0.
            console.warn("Child of Component node overwritten");

        } else if (this.children.length === 2 && this.componentType === ComponentType.object) { // Object parent
            if (typeof position === "undefined") {
                throw new DataError(DataErrorType.CMP_OBJ_ADD_NO_POS);
            }
            this.children[position] = node;

        } else {
            throw new DataError(DataErrorType.CMP_BAD_PARENT);
        }
        this.unsetContent(); // Delete this node's text content
        console.warn("Text content of leaf node deleted due to creation of new node")
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
        if (this.componentType === ComponentType.object) {
            throw new DataError(DataErrorType.CMP_OBJ_TXT);
        } else if (!this.component) {
            throw new DataError(DataErrorType.CMP_GET_TXT_UNDEF);
        } else {
            this.component.set(content, prefix, suffix);
            this.children.length = 0;
            this.update();
            console.warn("All descendants of Component node deleted due to text content being set");
        }
    }

	/**
	 * Unsets the Component's content (not the Component itself, which should always be present).
	 */
	unsetContent() : void {
		this.component.unset();
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
            console.warn("Attempt to delete dummy node - operation aborted")
            return;
        }
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD_DEL);
            case ComponentType.activationcondition:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL);
            case ComponentType.executionconstraint:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL);
            case ComponentType.directobject:
                throw new DataError(DataErrorType.CMP_OBJ_SUB_ADD_DEL);
            case ComponentType.indirectobject:
                throw new DataError(DataErrorType.CMP_OBJ_SUB_ADD_DEL);
            default:
        }
        console.warn("Deleting child of Component node")
        this.children[position] = new BaseNode(this.document, this.id);
        this.update();
    }

    /**
     * Creates a Statement node as child of this node, either regulative or constitutive, if legal.
     * Throws an error if illegal.
     *
     * @param type Whether the new statement should be regulative or constitutive
     * @param position (Optional) If this is an Object node, whether the child node should be left or right
     */
    createStatementNode(type: Arg.regulative | Arg.constitutive, position?: Arg.left | Arg.right) : INode | undefined {
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.aim:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.constitutivefunction:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.activationcondition:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.executionconstraint:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.directobject:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            case ComponentType.indirectobject:
                throw new DataError(DataErrorType.CMP_ADD_STMT);
            default:
        }
        this.update();
        return this.addChild((type === Arg.regulative ) ? new RegulativeStatementNode(this.document, this.id)
            : new ConstitutiveStatementNode(this.document, this.id), position);
    }

    /**
     * Creates a StatementJunction node as child of this node, if legal.
     * Throws an error if illegal.
     *
     * @param position (Optional) If this is an Object node, whether the child node should be left or right
     */
    createStatementJunctionNode(position?: Arg.left | Arg.right) : INode | undefined {
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.aim:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.constitutivefunction:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.activationcondition:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.executionconstraint:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.directobject:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            case ComponentType.indirectobject:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN);
            default:
        }
        this.update();
        return this.addChild(new StatementJunctionNode(this.document, this.id), position);
    }

    /**
     * Creates a ComponentJunction node as child of this node, if legal.
     * Throws an error if illegal.
     *
     * @param position (Optional) If this is an Object node, whether the child node should be left or right
     */
    createComponentJunctionNode(position?: Arg.left | Arg.right) : INode | undefined {
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN);
            case ComponentType.orelse:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN);
            case ComponentType.activationcondition:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN);
            case ComponentType.executionconstraint:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN);
            case ComponentType.directobject:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN);
            case ComponentType.indirectobject:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN);
            default:
        }
        this.update();
        return this.addChild(new ComponentJunctionNode(this.componentType, this.document, this.id), position);
    }

    /**
     * Creates a Component node as child of this node, if legal.
     * There are only two situations in which this is legal:
     * - this is an Object node AND we are creating DirectObject/IndirectObject, OR
     * - this is a Context node AND we are creating ActivationCondition/ExecutionConstraint AND the types match
     * Throws an error if illegal.
     *
     * @param componentType The component type the new node should have
     * @param position (Optional) If this is an Object node, whether the child node should be left or right
     */
    createComponentNode(componentType: ComponentType, position?: Arg.left | Arg.right) : INode | undefined {
        if (!matchComponentTypes(this.componentType, componentType)) {
            throw new DataError(DataErrorType.CMP_TYPE_MISMATCH);
        }
        this.update();
        return this.addChild(new ComponentNode(componentType, this.document, this.id), position);
    }
}
