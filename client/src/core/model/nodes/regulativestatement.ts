import { BaseNode, ComponentNode } from "./";
import { INode, IRegulativeStatementNode } from "../interfaces";
import { NodeType, ComponentType, Arg } from "../enums";
import { DataError, DataErrorType } from "../errors";

/**
 * RegulativeStatement nodes represent a regulative institutional statement,
 * its components embedded in its child nodes.
 */
export default class RegulativeStatementNode extends BaseNode implements IRegulativeStatementNode {
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
     */
    constructor(document: number, parent?: number) {
        super(document, parent);
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
            throw new DataError(DataErrorType.REG_NO_DIROBJ);
		}
        return this.children[Arg.reg_directobject];
    }

    /**
     * Returns this node's IndirectObject child.
     * Throws an error if this node does not have an IndirectObject child.
     */
    getIndirectObject() : BaseNode {
        if (!this.hasIndirectObject()) {
            throw new DataError(DataErrorType.REG_NO_INDIROBJ);
        }
        return this.children[Arg.reg_indirectobject];
    }

    /**
     * Returns this node's Deontic child.
     * Throws an error if this node does not have a Deontic child.
     */
    getDeontic() : BaseNode {
        if (!this.hasDeontic()) {
            throw new DataError(DataErrorType.REG_NO_DNT);
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
            throw new DataError(DataErrorType.REG_NO_ORELSE);
        }
        return this.children[Arg.reg_orelse];
    }

    /* Create and delete DirectObject child */

    /**
	 * Creates a Component node of type DirectObject in the pre-allotted space.
	 * Will not overwrite an existing DirectObject child.
     */
	createDirectObject() : INode | undefined {
        if (this.hasDirectObject()) {
            console.warn("Attempt to overwrite existing DirectObject child of RegulativeStatement node with ID "
                + this.id);
            return;
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
            console.warn("Attempt to delete dummy DirectObject child of RegulativeStatement node with ID "
                + this.id);
            return;
        }
		this.children[Arg.reg_directobject] = new BaseNode(this.document, this.id);
		this.update();
	}

    /* Create and delete IndirectObject child */

    /**
     * Creates a Component node of type IndirectObject in the pre-allotted space.
     * Will not overwrite an existing IndirectObject child.
     */
    createIndirectObject() : INode | undefined {
        if (this.hasIndirectObject()) {
            console.warn("Attempt to overwrite existing IndirectObject child of RegulativeStatement node with ID "
                + this.id);
            return;
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
            console.warn("Attempt to delete dummy IndirectObject child of RegulativeStatement node with ID "
                + this.id);
            return;
        }
        this.children[Arg.reg_indirectobject] = new BaseNode(this.document, this.id);
        this.update();
    }

    /* Create and delete Deontic child */

    /**
     * Creates a Component node of type Deontic in the pre-allotted space.
     * Will not overwrite an existing Deontic child.
     */
    createDeontic() : INode | undefined {
        if (this.hasDeontic()) {
            console.warn("Attempt to overwrite existing Deontic child of RegulativeStatement node with ID "
                + this.id);
            return;
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
            console.warn("Attempt to delete dummy Deontic child of RegulativeStatement node with ID "
                + this.id);
            return;
        }
        this.children[Arg.reg_deontic] = new BaseNode(this.document, this.id);
        this.update();
    }

    /* Create and delete OrElse child */

    /**
     * Creates a Component node of type OrElse in the pre-allotted space.
     * Will not overwrite an existing OrElse child.
     */
    createOrElse() : INode | undefined {
        if (this.hasOrElse()) {
            console.warn("Attempt to overwrite existing OrElse child of RegulativeStatement node with ID "
                + this.id);
            return;
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
            console.warn("Attempt to delete dummy OrElse child of RegulativeStatement node with ID "
                + this.id);
            return;
        }
        this.children[Arg.reg_orelse] = new BaseNode(this.document, this.id);
        this.update();
    }
}
