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
    // Attribute, Object (optional), Deontic (optional), Aim, ActivationConditions, ExecutionConstraints, OrElse (optional)
    children!: [ComponentNode, BaseNode, BaseNode, ComponentNode, ComponentNode, ComponentNode, BaseNode];

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
            new ComponentNode(ComponentType.aim, document, this.id),
            new ComponentNode(ComponentType.activationconditions, document, this.id),
            new ComponentNode(ComponentType.executionconstraints, document, this.id),
            new BaseNode(document, this.id),
        ];
    }

    /* Checkers for optional children */

    /**
     * Returns whether this node has an Object child.
     */
	hasObject() : boolean {
		return (!this.children[Arg.reg_object].isDummy());
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
     * Returns this node's Object child.
     * Throws an error if this node does not have an Object child.
     */
    getObject() : BaseNode {
		if (!this.hasObject()) {
            throw new DataError(DataErrorType.REG_NO_OBJ);
		}
        return this.children[Arg.reg_object];
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

    /* Create and delete Object child */

    /**
	 * Creates a Component node of type Object in the pre-allotted space.
	 * Will not overwrite an existing Object child.
     */
	createObject() : INode | undefined {
        if (this.hasObject()) {
            console.warn("Attempt to overwrite existing node - operation aborted")
            return;
        }
		this.children[Arg.reg_object] = new ComponentNode(ComponentType.object, this.document, this.id);
		this.update();
		return this.children[Arg.reg_object];
	}

	/**
	 * Deletes the Object child and all of its descendants by replacing it with a new dummy node.
	 */
	deleteObject() : void {
        if (!this.hasObject()) {
            console.warn("Attempt to delete dummy node - operation aborted")
            return;
        }
		this.children[Arg.reg_object] = new BaseNode(this.document, this.id);
		this.update();
	}

    /* Create and delete Deontic child */

    /**
     * Creates a Component node of type Deontic in the pre-allotted space.
     * Will not overwrite an existing Deontic child.
     */
    createDeontic() : INode | undefined {
        if (this.hasDeontic()) {
            console.warn("Attempt to overwrite existing node - operation aborted")
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
            console.warn("Attempt to delete dummy node - operation aborted")
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
            console.warn("Attempt to overwrite existing node - operation aborted")
            return;
        }
        this.children[Arg.reg_orelse] = new ComponentNode(ComponentType.orelse, this.document, this.id);
        this.update();
        return this.children[6];
    }

    /**
     * Deletes the Deontic child and all of its descendants by replacing it with a new dummy node.
     */
    deleteOrElse() : void {
        if (!this.hasOrElse()) {
            console.warn("Attempt to delete dummy node - operation aborted")
            return;
        }
        this.children[Arg.reg_orelse] = new BaseNode(this.document, this.id);
        this.update();
    }
}
