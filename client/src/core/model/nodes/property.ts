import {
    BaseNode,
    ConstitutiveStatementNode,
    PropertyJunctionNode,
    RegulativeStatementNode,
    StatementJunctionNode
} from "./";
import {INode, IPropertyNode} from "../interfaces";
import {Arg, NodeType} from "../enums";
import {Text} from "../text";
import {DataError, DataErrorType} from "../errors";

/**
 * Property nodes represent properties and objects in the Attribute/Object-Property Hierarchy.
 */
export default class PropertyNode extends BaseNode implements IPropertyNode {
    nodeType: NodeType = NodeType.property;
    /* Holds the text content of the institutional component. Should always be defined */
    text!: Text;
    /* Whether this property/object is functionally dependent on its parent */
    isFunctionallyDependent: Boolean = false;
    /* Array of child nodes of this Node */
    children!: INode[];

    /**
     * Creates a new Property node with an empty Text object.
     *
     * @param document The ID of the document this node belongs to
     * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
     */
    constructor(document: number, parent: number) {
        super(document, parent);
        this.text = new Text();
        this.children = [];
    }

    /**
     * Internal function that is called by all create*() functions.
     * Checks this node's number of children, which dictates how the child should be added to the array.
     * Calls this.update().
     * NB: Assumes that it is legal to add the child AND that text content is handled separately.
     *
     * @param node A reference to the node to be added as a child
     * @return The passed in node
     */
    private addChild(node: INode) : INode {
        if (this.children.length === 0) {
            this.children.push(node);   // Push to the array if it's empty

        } else if (this.children.length === 1) {    // This node currently has a child
            throw new DataError(DataErrorType.PRP_HAS_CHLD, this.id);

        } else {
            throw new DataError(DataErrorType.PRP_TOO_MANY_CHLD, this.id);
        }
        this.update();
        return node;
    }

    /**
     * Sets the node's isFunctionallyDependent field to true.
     */
    makeFunctionallyDependent() : void {
        this.isFunctionallyDependent = true;
        this.update();
    }

    /**
     * Sets the node's isFunctionallyDependent field to false.
     */
    makeNotFunctionallyDependent() : void {
        this.isFunctionallyDependent = false;
        this.update();
    }

    /**
     * Modifies the node's Text object with the passed in text content.
     * If this node has a child of type Statement or StatementJunction, deletes the child.
     *
     * @param main (Optional) The text that most narrowly fits the component
     * @param prefix (Optional) Excess text that goes before the main content
     * @param suffix (Optional) Excess text that goes after the main content
     */
    setText(main?: string, prefix?: string, suffix?: string) : void {
        if (!this.text) {
            throw new DataError(DataErrorType.PRP_GET_TXT_UNDEF, this.id);
        } else {
            // Check type of child, if any; if Statement or StatementJunction, delete child before adding text content
            if (this.children.length === 1) {
                if (this.children[0].nodeType === NodeType.statement) {
                    throw new DataError(DataErrorType.PRP_HAS_STMT_CHLD, this.id);
                } else if (this.children[0].nodeType === NodeType.statementjunction) {
                    throw new DataError(DataErrorType.PRP_HAS_STMTJUN_CHLD, this.id);
                }
                this.children.length = 0;
            }
            this.text.set(main, prefix, suffix);
            this.update();
        }
    }

    /**
     * Unsets the Text's content (not the Text object itself, which should always be defined).
     */
    unsetText() : void {
        this.text.unset();
        this.update();
    }

    /**
     * Delete a child of this node.
     * The children array is emptied, deleting the child and all its descendants.
     */
    deleteChild() : void {
        if (this.children.length === 0) {
            throw new DataError(DataErrorType.PRP_NO_CHLD, this.id);
        } else if (this.children.length === 1) {
            console.warn("Deleting child of Property node with ID " + this.id);
            this.children.length = 0;
            this.update();
        } else {
            throw new DataError(DataErrorType.PRP_TOO_MANY_CHLD, this.id);
        }
    }

    /**
     * Creates a Statement node as child of this node, either regulative or constitutive.
     * Unsets the text content.
     *
     * @param type Whether the new statement should be regulative or constitutive
     * @return The newly created node
     */
    createStatementNode(type: Arg.regulative | Arg.constitutive) : INode | undefined {
        this.unsetText();
        return this.addChild((type === Arg.regulative ) ? new RegulativeStatementNode(this.document, this.id)
            : new ConstitutiveStatementNode(this.document, this.id));
    }

    /**
     * Creates a StatementJunction node as child of this node.
     * Unsets the text content.
     *
     * @return The newly created node
     */
    createStatementJunctionNode() : INode | undefined {
        this.unsetText();
        return this.addChild(new StatementJunctionNode(this.document, this.id));
    }

    /**
     * Creates a Property node as child of this node.
     *
     * @return The newly created node
     */
    createPropertyNode() : INode | undefined {
        return this.addChild(new PropertyNode(this.document, this.id));
    }

    /**
     * Creates a PropertyJunction node as child of this node.
     *
     * @return The newly created node
     */
    createPropertyJunctionNode() : INode | undefined {
        return this.addChild(new PropertyJunctionNode(this.document, this.id));
    }
}