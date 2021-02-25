import {
    BaseNode,
    ComponentJunctionNode,
    ComponentNode,
    ConstitutiveStatementNode, PropertyJunctionNode, PropertyNode,
    StatementJunctionNode,
    StatementNode
} from "./";
import {INode, IRegulativeStatementNode} from "../interfaces";
import {Arg, ComponentType, NodeType} from "../enums";
import {DataError, DataErrorType} from "../errors";

/**
 * RegulativeStatement nodes represent a regulative institutional statement,
 * its components embedded in its child nodes.
 */
export default class RegulativeStatementNode extends StatementNode implements IRegulativeStatementNode {
    nodeType: NodeType = NodeType.regulativestatement;
    // Fixed children:
    // Attribute, DirectObject (optional), IndirectObject (optional), Deontic (optional), Aim, ActivationConditions, ExecutionConstraints, OrElse (optional)
    children!: [ComponentNode, BaseNode, BaseNode, BaseNode, ComponentNode, ComponentNode, ComponentNode, BaseNode];

    /**
     * Creates a new RegulativeStatement node with fixed children.
	 * Uses dummy nodes to make room for optional children.
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param id (Optional) The ID of this node if one already exists (for rebuilding from existing data)
     */
    constructor(document: number, parent?: number, id?: number) {
        super(document, parent, id);
        this.children = [
            new ComponentNode(ComponentType.attribute, document, this.id),
            new BaseNode(document, this.id),
            new BaseNode(document, this.id),
            new BaseNode(document, this.id),
            new ComponentNode(ComponentType.aim, document, this.id),
            new ComponentNode(ComponentType.activationconditions, document, this.id),
            new ComponentNode(ComponentType.executionconstraints, document, this.id),
            new BaseNode(document, this.id),
        ];
    }

    /**
     * Build a new RegulativeStatementNode from existing data.
     * Properties are copied to the new node from the passed in data.
     *
     * @param data An object of type IRegulativeStatementNode
     * @return A new RegulativeStatementNode with the passed in properties
     */
    static fromData(data: IRegulativeStatementNode) : RegulativeStatementNode {
        let newNode = new RegulativeStatementNode(data.document, data.parent, data.id);

        // Note that we could have had a common function Statement.fromData for this one and ConstitutiveStatementNode
        //  that sets contextType. However, the function overhead is probably not worth this one line:
        newNode.contextType = data.contextType;

        return newNode;
    }

    /* Checkers for optional children */

    /**
     * Returns whether this node has a DirectObject child.
     */
    hasDirectObject() : boolean {
        return (!this.children[Arg.reg_directobject].isDummy());
    }

    /**
     * Returns whether this node has an IndirectObject child.
     */
    hasIndirectObject() : boolean {
        return (!this.children[Arg.reg_indirectobject].isDummy());
    }

    /**
     * Returns whether this node has a Deontic child.
     */
    hasDeontic() : boolean {
        return (!this.children[Arg.reg_deontic].isDummy());
    }

    /**
     * Returns whether this node has an Or else child.
     */
    hasOrElse() : boolean {
        return (!this.children[Arg.reg_orelse].isDummy());
    }

    /* Getters for children */

    /**
     * Returns this node's Attribute child.
     */
    getAttribute() : ComponentNode {
        return this.children[Arg.reg_attribute];
    }

    /**
     * Returns this node's DirectObject child.
     * Throws an error if this node does not have a DirectObject child.
     */
    getDirectObject() : BaseNode {
		if (!this.hasDirectObject()) {
            throw new DataError(DataErrorType.REG_NO_DIROBJ, this.id);
		}
        return this.children[Arg.reg_directobject];
    }

    /**
     * Returns this node's IndirectObject child.
     * Throws an error if this node does not have an IndirectObject child.
     */
    getIndirectObject() : BaseNode {
        if (!this.hasIndirectObject()) {
            throw new DataError(DataErrorType.REG_NO_INDIROBJ, this.id);
        }
        return this.children[Arg.reg_indirectobject];
    }

    /**
     * Returns this node's Deontic child.
     * Throws an error if this node does not have a Deontic child.
     */
    getDeontic() : BaseNode {
        if (!this.hasDeontic()) {
            throw new DataError(DataErrorType.REG_NO_DNT, this.id);
        }
        return this.children[Arg.reg_deontic];
    }

    /**
     * Returns this node's Aim child.
     */
    getAim() : ComponentNode {
        return this.children[Arg.reg_aim];
    }

    /**
     * Returns this node's ActivationConditions child.
     */
    getActivationConditions() : ComponentNode {
        return this.children[Arg.reg_activationconditions];
    }

    /**
     * Returns this node's ExecutionConstraints child.
     */
    getExecutionConstraints() : ComponentNode {
        return this.children[Arg.reg_executionconstraints];
    }

    /**
     * Returns this node's Or else child.
     * Throws an error if this node does not have an Or else child.
     */
    getOrElse(): BaseNode {
        if (!this.hasOrElse()) {
            throw new DataError(DataErrorType.REG_NO_ORELSE, this.id);
        }
        return this.children[Arg.reg_orelse];
    }

    /* Create and delete DirectObject child */

    /**
	 * Creates a Component node of type DirectObject in the pre-allotted space.
	 * Will not overwrite an existing DirectObject child.
     *
     * @return The newly created node
     */
	createDirectObject() : INode | undefined {
        if (this.hasDirectObject()) {
            throw new DataError(DataErrorType.REG_HAS_DIROBJ, this.id);
        }
		this.children[Arg.reg_directobject] = new ComponentNode(ComponentType.directobject, this.document, this.id);
		this.update();
		return this.children[Arg.reg_directobject];
	}

	/**
	 * Deletes the DirectObject child and all of its descendants by replacing it with a new dummy node.
	 */
	deleteDirectObject() : void {
        if (!this.hasDirectObject()) {
            throw new DataError(DataErrorType.REG_NO_DIROBJ, this.id);
        }
		this.children[Arg.reg_directobject] = new BaseNode(this.document, this.id);
		this.update();
	}

    /* Create and delete IndirectObject child */

    /**
     * Creates a Component node of type IndirectObject in the pre-allotted space.
     * Will not overwrite an existing IndirectObject child.
     *
     * @return The newly created node
     */
    createIndirectObject() : INode | undefined {
        if (this.hasIndirectObject()) {
            throw new DataError(DataErrorType.REG_HAS_INDIROBJ, this.id);
        }
        this.children[Arg.reg_indirectobject] = new ComponentNode(ComponentType.indirectobject, this.document, this.id);
        this.update();
        return this.children[Arg.reg_indirectobject];
    }

    /**
     * Deletes the IndirectObject child and all of its descendants by replacing it with a new dummy node.
     */
    deleteIndirectObject() : void {
        if (!this.hasIndirectObject()) {
            throw new DataError(DataErrorType.REG_NO_INDIROBJ, this.id);
        }
        this.children[Arg.reg_indirectobject] = new BaseNode(this.document, this.id);
        this.update();
    }

    /* Create and delete Deontic child */

    /**
     * Creates a Component node of type Deontic in the pre-allotted space.
     * Will not overwrite an existing Deontic child.
     *
     * @return The newly created node
     */
    createDeontic() : INode | undefined {
        if (this.hasDeontic()) {
            throw new DataError(DataErrorType.REG_HAS_DNT, this.id);
        }
        this.children[Arg.reg_deontic] = new ComponentNode(ComponentType.deontic, this.document, this.id);
        this.update();
        return this.children[Arg.reg_deontic];
    }

    /**
     * Deletes the Deontic child and all of its descendants by replacing it with a new dummy node.
     */
    deleteDeontic() : void {
        if (!this.hasDeontic()) {
            throw new DataError(DataErrorType.REG_NO_DNT, this.id);
        }
        this.children[Arg.reg_deontic] = new BaseNode(this.document, this.id);
        this.update();
    }

    /* Create and delete OrElse child */

    /**
     * Creates a Component node of type OrElse in the pre-allotted space.
     * Will not overwrite an existing OrElse child.
     *
     * @return The newly created node
     */
    createOrElse() : INode | undefined {
        if (this.hasOrElse()) {
            throw new DataError(DataErrorType.REG_HAS_ORELSE, this.id);
        }
        this.children[Arg.reg_orelse] = new ComponentNode(ComponentType.orelse, this.document, this.id);
        this.update();
        return this.children[6];
    }

    /**
     * Deletes the OrElse child and all of its descendants by replacing it with a new dummy node.
     */
    deleteOrElse() : void {
        if (!this.hasOrElse()) {
            throw new DataError(DataErrorType.REG_NO_ORELSE, this.id);
        }
        this.children[Arg.reg_orelse] = new BaseNode(this.document, this.id);
        this.update();
    }
}
