import { BaseNode, ComponentNode } from "./";
import { INode, IConstitutiveStatementNode } from "../interfaces";
import { NodeType, ComponentType } from "../enums";
import { DataError, DataErrorType } from "../errors";

/**
 * ConstitutiveStatement nodes represent a constitutive institutional statement,
 * its components embedded in its child nodes.
 */
export default class ConstitutiveStatementNode extends BaseNode implements IConstitutiveStatementNode {
    nodeType: NodeType = NodeType.regulativestatement;
    // Fixed children:
    // ConstitutingProperties (optional), Deontic (optional), ConstitutiveFunction, ConstitutedEntity, ActivationConditions, ExecutionConstraints, OrElse (optional)
    children!: [BaseNode, BaseNode, ComponentNode, ComponentNode, ComponentNode, ComponentNode, BaseNode];

    /**
     * Creates a new ConstitutiveStatement node with fixed children.
	 * Uses dummy nodes to make room for optional children.
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     */
    constructor(document: number, parent?: number) {
        super(document, parent);
        this.children = [
            new BaseNode(document, this.id),
            new BaseNode(document, this.id),
            new ComponentNode(ComponentType.constitutivefunction, document, this.id),
            new ComponentNode(ComponentType.constitutedentity, document, this.id),
            new ComponentNode(ComponentType.activationconditions, document, this.id),
            new ComponentNode(ComponentType.executionconstraints, document, this.id),
            new BaseNode(document, this.id),
        ];
    }

    /* Checkers for optional children */

    /**
     * Returns whether this node has a ConstitutingProperties child.
     */
    hasConstitutingProperties() : boolean {
		return (!this.children[0].isDummy());
	}

    /**
     * Returns whether this node has a Deontic child.
     */
    hasDeontic() : boolean {
        return (!this.children[1].isDummy());
    }

    /**
     * Returns whether this node has an Or else child.
     */
    hasOrElse() : boolean {
        return (!this.children[6].isDummy());
    }

    /* Getters for children */

    /**
     * Returns this node's ConstitutingProperties child.
     * Throws an error if this node does not have a ConstitutingProperties child.
     */
    getConstitutingProperties() : BaseNode {
        if (!this.hasConstitutingProperties()) {
            throw new DataError(DataErrorType.CON_NO_CONPROP);
        }
        return this.children[0];
    }

    /**
     * Returns this node's Deontic child.
     * Throws an error if this node does not have a Deontic child.
     */
    getDeontic() : BaseNode {
		if (!this.hasDeontic()) {
            throw new DataError(DataErrorType.CON_NO_DNT);
		}
        return this.children[1];
    }

    /**
     * Returns this node's ConstitutiveFunction child.
     */
    getConstitutiveFunction() : ComponentNode {
        return this.children[2];
    }

    /**
     * Returns this node's ConstitutedEntity child.
     */
    getConstitutedEntity() : ComponentNode {
        return this.children[3];
    }

    /**
     * Returns this node's ActivationConditions child.
     */
    getActivationConditions() : ComponentNode {
        return this.children[4];
    }

    /**
     * Returns this node's ExecutionConstraints child.
     */
    getExecutionConstraints() : ComponentNode {
        return this.children[5];
    }

    /**
     * Returns this node's Or else child.
     * Throws an error if this node does not have an Or else child.
     */
    getOrElse(): BaseNode {
        if (!this.hasOrElse()) {
            throw new DataError(DataErrorType.CON_NO_ORELSE);
        }
        return this.children[6];
    }

    /* Create and delete ConstitutingProperties child */

    /**
	 * Creates a Component node of type ConstitutingProperties in the pre-allotted space.
	 * Will not overwrite an existing ConstitutingProperties child.
     */
	createConstitutingProperties() : INode | undefined {
        if (this.hasConstitutingProperties()) {
            console.warn("Attempt to overwrite existing node - operation aborted")
            return;
        }
		this.children[0] = new ComponentNode(ComponentType.constitutingproperties, this.document, this.id);
		this.update();
		return this.children[0];
	}

	/**
	 * Deletes the ConstitutingProperties child and all of its descendants by replacing it with a new dummy node.
	 */
    deleteConstitutingProperties() : void {
        if (!this.hasConstitutingProperties()) {
            console.warn("Attempt to delete dummy node - operation aborted")
            return;
        }
		this.children[0] = new BaseNode(this.document, this.id);
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
        this.children[1] = new ComponentNode(ComponentType.deontic, this.document, this.id);
        this.update();
        return this.children[1];
    }

    /**
     * Deletes the Deontic child and all of its descendants by replacing it with a new dummy node.
     */
    deleteDeontic() : void {
        if (!this.hasDeontic()) {
            console.warn("Attempt to delete dummy node - operation aborted")
            return;
        }
        this.children[1] = new BaseNode(this.document, this.id);
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
        this.children[6] = new ComponentNode(ComponentType.orelse, this.document, this.id);
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
        this.children[6] = new BaseNode(this.document, this.id);
        this.update();
    }
}
