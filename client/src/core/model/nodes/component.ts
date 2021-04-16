import {
    BaseNode,
    ComponentJunctionNode,
    ConstitutiveStatementNode,
    PropertyJunctionNode,
    PropertyNode,
    RegulativeStatementNode,
    StatementJunctionNode, StatementNode
} from "./";
import {IComponentNode, INode} from "../interfaces";
import {Arg, ComponentType, DefaultContext, JunctionType, NodeType} from "../enums";
import {TextContent} from "../textcontent";
import {DataError, DataErrorType} from "../errors";

/**
 * Component nodes hold a regulative or constitutive component. This class accommodates both.
 */
export default class ComponentNode extends BaseNode implements IComponentNode {
    nodeType: NodeType = NodeType.component;
    /* All Component nodes have a component type */
    componentType!: ComponentType;
    /* Holds the text content of the institutional component. Should always be defined */
    text!: TextContent;
    /* Array of child nodes of this Node */
    children!: INode[];

    /**
     * Creates a new Component node with an empty Text object.
     *
     * @param componentType This node's institutional component type
     * @param document The ID of the document this node belongs to
     * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param id (Optional) The ID of this node if one already exists (for rebuilding from existing data)
     */
    constructor(componentType: ComponentType, document: number, parent: number, id?: number) {
        super(document, parent, id);
		this.text = new TextContent();
        this.componentType = componentType;
        this.children = [];

        // Activation Conditions and Execution Constraints get a child with default text content
        if (componentType === ComponentType.activationconditions || componentType === ComponentType.executionconstraints) {
            this.createDefaultContextChild(componentType);
        }
    }

    /**
     * Build a new ComponentNode from existing data.
     * Properties are copied to the new node from the passed in data.
     *
     * @param data An object of type IComponentNode
     * @return A new ComponentNode with the passed in properties
     */
    static fromData(data: IComponentNode) : ComponentNode {
        let newNode = new ComponentNode(data.componentType, data.document, data.parent, data.id);
        newNode.contextType = data.contextType;
        newNode.text = TextContent.fromData(data.text);
        return newNode;
    }

    /**
     * Helper method to create a child with default text content for ActivationConditions and ExecutionConstraints.
     * Assumes that this node's children array is defined and is empty.
     *
     * @param componentType This node's component type
     * @private
     */
    private createDefaultContextChild(componentType: ComponentType.activationconditions | ComponentType.executionconstraints) : void {
        let fixedChild = new ComponentNode(ComponentType.simplecontext, this.document, this.id);
        if (componentType === ComponentType.activationconditions) {
            fixedChild.setText(DefaultContext.activationconditions);
        } else {
            fixedChild.setText(DefaultContext.executionconstraints);
        }
        this.children.push(fixedChild);
    }

    /**
     * Return this node's TextContent object. Throws an error if the TextContent object is undefined.
     * @return The TextContent object found in this node's text property
     */
    getText() : TextContent {
        if (!this.text) {
            throw new DataError(DataErrorType.CMP_GET_TXT_UNDEF, this.id);
        }
        return this.text;
    }

    /**
     * Modifies the node's TextContent object with the passed in text content.
     * If the node has children that are not Property/PropertyJunction, throws an error.
     *
     * @param main (Optional) The text that most narrowly fits the component/property
     * @param prefix (Optional) Text from the raw statement that precedes the main part
     * @param suffix (Optional) Text from the raw statement that succeeds the main part
     * @param inferredOrRephrased (Optional) An explicit specification and/or rephrasing of the main part
     */
    setText(main?: string, prefix?: string, suffix?: string, inferredOrRephrased?: string) : void {
        switch (this.componentType) {   // Handle component types that cannot have text content
            case ComponentType.activationconditions:
                throw new DataError(DataErrorType.CMP_AC_TXT, this.id);
            case ComponentType.executionconstraints:
                throw new DataError(DataErrorType.CMP_EC_TXT, this.id);
            default:
        }
        if (!this.text) {
            throw new DataError(DataErrorType.CMP_GET_TXT_UNDEF, this.id);
        }
        // Cannot set text content if the node already has a child not of type Property/PropertyJunction
        if (this.children.length > 0) {
            // Checking the first child is sufficient
            if (![NodeType.property, NodeType.propertyjunction].includes(this.children[0].nodeType)) {
                throw new DataError(DataErrorType.CMP_HAS_CHLD_NO_PRP, this.id);
            }
        }
        this.text.set(main, prefix, suffix, inferredOrRephrased);
        this.update();
    }

	/**
	 * Unsets the TextContent's fields (not the TextContent object itself).
	 */
	unsetText() : void {
        if (!this.text) {
            throw new DataError(DataErrorType.CMP_GET_TXT_UNDEF, this.id);
        }
		this.text.unset();
		this.update();
	}

    /**
     * Internal function that is called by all create*() functions except Property and PropertyJunction.
     * Checks this node's number of children, which dictates how the child should be added to the array.
     * When the child is added, this node's text content is also deleted.
     * Calls this.update().
     * NB: Assumes that it is legal to add the passed in child.
     *
     * @param node A reference to the node to be added as a child
     * @return The passed in node. You must type assert its node type.
     * @private
     */
    private addChild(node: INode) : INode {
        if (this.children.length === 0) {           // Node has no children
            this.children.push(node);   // Can push to the array if it's empty

        } else {                                    // Node has 1 or more children
            if (this.componentType === ComponentType.activationconditions ||
                this.componentType === ComponentType.executionconstraints) {
                // Check if the first child is a premade; if so, delete it
                if (this.children[0].nodeType === NodeType.component) {
                    let child = this.children[0] as ComponentNode;
                    let string = child.getText().getString();

                    if (string === DefaultContext.activationconditions ||
                        string === DefaultContext.executionconstraints) {
                        this.children.splice(0, 1);
                    }
                }
                this.children.push(node); // Can push to the array if the parent is ActivationConditions/ExecutionConstraints

            } else {
                throw new DataError(DataErrorType.CMP_HAS_CHLD, this.id);
            }
        }

        this.unsetText(); // Delete this node's text content - can do because this is not used to create Properties
        this.update();
        return node;
    }

    /**
     * Returns this node's child in the given index.
     * Throws an error if the index is out of bounds or this node has no children.
     * @return The child in the given index. You must type assert its node type.
     */
    getChild(position: number) : INode {
        if (this.children.length === 0) {
            throw new DataError(DataErrorType.CMP_NO_CHLD, this.id);
        }

        if (position < 0 || position >= this.children.length) {
            throw new DataError(DataErrorType.CMP_BAD_CHILD_IDX, this.id);
        }

        return this.children[position];
    }

    /**
     * Delete a child of this node. It can be any valid node type for children of Component nodes,
     *  including Property and PropertyJunction.
     * The method of deletion depends on this node's component type, which determines the number of children allowed.
     * Throws an error if the node has no children or if position is out of bounds.
     *
     * @param position The children array index of the child node to delete
     */
    deleteChild(position: number) : void {
        if (this.children.length === 0) {
            throw new DataError(DataErrorType.CMP_NO_CHLD, this.id);
        }

        if (position < 0 || position >= this.children.length) {
            throw new DataError(DataErrorType.CMP_BAD_CHILD_IDX, this.id);
        }

        switch (this.componentType) {   // Handle component types with different rules regarding number of children
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD_DEL, this.id);
            case ComponentType.modal:
                throw new DataError(DataErrorType.CMP_MODAL_ADD_DEL, this.id);
            case ComponentType.simplecontext:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL, this.id);
            case ComponentType.activationconditions:
                console.warn("Deleting child at index " + position +
                    " of Component (Activation Conditions) node with ID " + this.id);
                this.children.splice(position, 1);
                // If that was the last child, recreate default child
                if (this.children.length === 0) {
                    this.createDefaultContextChild(this.componentType);
                }
                this.update();
                break;
            case ComponentType.executionconstraints:
                console.warn("Deleting child at index " + position +
                    " of Component (Execution Constraints) node with ID " + this.id);
                this.children.splice(position, 1);
                // If that was the last child, recreate default child
                if (this.children.length === 0) {
                    this.createDefaultContextChild(this.componentType);
                }
                this.update();
                break;
            default:
                console.warn("Deleting child of Component node with ID " + this.id);
                this.children.splice(position, 1);
                this.update();
        }
    }

    /**
     * Function to update the isFunctionallyDependent field of PropertyJunction nodes based on their descendant Property node.
     * Traverses to the node with the provided ID, which should be the Property node's parent.
     * If the parent is found, checks if its node type is PropertyJunction.
     * If yes, sets that node's isFunctionallyDependent field to the passed in value (which should be that of the Property node),
     *  and repeats the process with its parent until a node is found that is NOT PropertyJunction.
     *
     * @param targetId The parent node ID of the Property node
     * @param isFD The isFunctionallyDependent state of the Property node
     */
    elevateFunctionallyDependent(targetId: number, isFD: Boolean) : void {
        let stack = [...this.children];

        while (stack.length) {
            const node = stack.shift() as BaseNode;
            if (node.id === targetId) {
                if (node.nodeType === NodeType.propertyjunction) {
                    let pnode = node as PropertyJunctionNode;
                    pnode.setFunctionallyDependent(isFD);
                    this.elevateFunctionallyDependent(pnode.parent, isFD);
                    return;
                }
            }
            node && node.children && stack.push(...node.children);
        }
    }

    /**
     * Creates a Statement node as child of this node, either regulative or constitutive, if legal.
     * Throws an error if illegal.
     *
     * @param type Whether the new statement should be regulative or constitutive
     * @return The newly created node. You must type assert its node type.
     */
    createStatementNode(type: Arg.regulative | Arg.constitutive) : StatementNode {
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD_DEL, this.id);
            case ComponentType.aim:
                throw new DataError(DataErrorType.CMP_ADD_STMT, this.id);
            case ComponentType.modal:
                throw new DataError(DataErrorType.CMP_MODAL_ADD_DEL, this.id);
            case ComponentType.constitutivefunction:
                throw new DataError(DataErrorType.CMP_ADD_STMT, this.id);
            case ComponentType.simplecontext:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL, this.id);
            default:
        }
        return this.addChild((type === Arg.regulative )
            ? new RegulativeStatementNode(this.document, this.id)
            : new ConstitutiveStatementNode(this.document, this.id)) as StatementNode;
    }

    /**
     * Creates a StatementJunction node as child of this node, if legal.
     * Throws an error if illegal.
     *
     * @param junctionType (Optional) A junction type to be given to the new node immediately
     * @return The newly created node
     */
    createStatementJunctionNode(junctionType?: JunctionType) : StatementJunctionNode {
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD_DEL, this.id);
            case ComponentType.aim:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN, this.id);
            case ComponentType.modal:
                throw new DataError(DataErrorType.CMP_MODAL_ADD_DEL, this.id);
            case ComponentType.constitutivefunction:
                throw new DataError(DataErrorType.CMP_ADD_STMTJUN, this.id);
            case ComponentType.simplecontext:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL, this.id);
            default:
        }
        return this.addChild(new StatementJunctionNode(this.document, this.id, junctionType)) as StatementJunctionNode;
    }

    /**
     * Creates a Component node as child of this node, if legal.
     * There is only one situation in which this is legal:
     * - this is an ActivationConditions or ExecutionConstraints node and we are creating a SimpleContext node
     * Throws an error if illegal.
     *
     * @param componentType The type of component the new node should have
     * @return The newly created node
     */
    createComponentNode(componentType: ComponentType) : ComponentNode {
        if ([ComponentType.activationconditions, ComponentType.executionconstraints]
            .includes(this.componentType) && componentType === ComponentType.simplecontext) {
            return this.addChild(new ComponentNode(componentType, this.document, this.id)) as ComponentNode;
        } else {
            throw new DataError(DataErrorType.CMP_ADD_CMP, this.id, componentType);
        }
    }

    /**
     * Creates a ComponentJunction node as child of this node, if legal.
     * Throws an error if illegal.
     *
     * @param junctionType (Optional) A junction type to be given to the new node immediately
     * @return The newly created node
     */
    createComponentJunctionNode(junctionType?: JunctionType) : ComponentJunctionNode {
        switch (this.componentType) {   // Handle component types for which this operation is illegal
            case ComponentType.deontic:
                throw new DataError(DataErrorType.CMP_DNT_ADD_DEL, this.id);
            case ComponentType.orelse:
                throw new DataError(DataErrorType.CMP_ADD_CMPJUN, this.id);
            case ComponentType.modal:
                throw new DataError(DataErrorType.CMP_MODAL_ADD_DEL, this.id);
            case ComponentType.simplecontext:
                throw new DataError(DataErrorType.CMP_CTXT_ADD_DEL, this.id);
            default:
        }
        return this.addChild(new ComponentJunctionNode(this.componentType, this.document, this.id, junctionType)) as ComponentJunctionNode;
    }

    /**
     * Creates a Property node as child of this node, if legal.
     * Does not use the helper addChild().
     *
     * @return The newly created node
     */
    createPropertyNode() : PropertyNode {
        if (![                          // Only these Component types can have Property nodes as children
            ComponentType.attribute,
            ComponentType.directobject,
            ComponentType.indirectobject,
            ComponentType.constitutingproperties,
            ComponentType.constitutedentity
        ].includes(this.componentType)) {
            throw new DataError(DataErrorType.CMP_ADD_PRP, this.id);
        }

        if (this.children.length === 0) {   // This node has no children
            this.children.push(new PropertyNode(this.document, this.id));

        } else if ([                        // This node's first child is a Property/PropertyJunction
            NodeType.property,
            NodeType.propertyjunction
        ].includes(this.children[0].nodeType)) {
            this.children.push(new PropertyNode(this.document, this.id));

        } else {                            // This node's first child is NOT a Property/PropertyJunction
            throw new DataError(DataErrorType.CMP_HAS_CHLD_NO_PRP, this.id);
        }
        this.update();
        return this.children[this.children.length - 1] as PropertyNode; // Return newly pushed node
    }

    /**
     * Creates a PropertyJunction node as child of this node, if legal.
     * Does not use the helper addChild().
     *
     * @param junctionType (Optional) A junction type to be given to the new node immediately
     * @return The newly created node
     */
    createPropertyJunctionNode(junctionType?: JunctionType) : PropertyJunctionNode {
        if (![                          // Only these Component types can have PropertyJunction nodes as children
            ComponentType.attribute,
            ComponentType.directobject,
            ComponentType.indirectobject,
            ComponentType.constitutingproperties,
            ComponentType.constitutedentity
        ].includes(this.componentType)) {
            throw new DataError(DataErrorType.CMP_ADD_PRPJUN, this.id);
        }

        if (this.children.length === 0) {   // This node has no children
            this.children.push(new PropertyJunctionNode(this.document, this.id, junctionType));

        } else if ([                        // This node's first child is a Property/PropertyJunction
            NodeType.property,
            NodeType.propertyjunction
        ].includes(this.children[0].nodeType)) {
            this.children.push(new PropertyJunctionNode(this.document, this.id, junctionType));

        } else {                            // This node's first child is NOT a Property/PropertyJunction
            throw new DataError(DataErrorType.CMP_HAS_CHLD_NO_PRP, this.id);
        }
        this.update();
        return this.children[this.children.length - 1] as PropertyJunctionNode; // Return newly pushed node
    }
}
