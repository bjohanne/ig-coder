import {
    BaseNode,
    ConstitutiveStatementNode,
    PropertyJunctionNode,
    RegulativeStatementNode,
    StatementJunctionNode, StatementNode
} from "./";
import {INode, IPropertyNode} from "../interfaces";
import {Arg, JunctionType, NodeType} from "../enums";
import {TextContent} from "../textcontent";
import {DataError, DataErrorType} from "../errors";

/**
 * Property nodes represent properties and objects in the Attribute/Object-Property Hierarchy.
 */
export default class PropertyNode extends BaseNode implements IPropertyNode {
    nodeType: NodeType = NodeType.property;
    /* Holds the text content of the property/object. Should always be defined */
    text!: TextContent;
    /* Whether this property/object is functionally dependent on its parent */
    isFunctionallyDependent: Boolean = false;
    /* Array of child nodes of this Node */
    children!: INode[];

    /**
     * Creates a new Property node with an empty Text object.
     *
     * @param document The ID of the document this node belongs to
     * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param id (Optional) The ID of this node if one already exists (for rebuilding from existing data)
     */
    constructor(document: number, parent: number, id?: number) {
        super(document, parent, id);
        this.text = new TextContent();
        this.children = [];
    }

    /**
     * Build a new PropertyNode from existing data.
     * Properties (data fields) are copied to the new node from the passed in data.
     *
     * @param data An object of type IPropertyNode
     * @return A new PropertyNode with the passed in properties
     */
    static fromData(data: IPropertyNode) : PropertyNode {
        let newNode = new PropertyNode(data.document, data.parent, data.id);
        newNode.isFunctionallyDependent = data.isFunctionallyDependent;
        newNode.text = TextContent.fromData(data.text);
        return newNode;
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
     * Sets the node's isFunctionallyDependent field to the passed in value.
     * @param isFD Whether this node should be functionally dependent on its parent
     */
    setFunctionallyDependent(isFD: Boolean) : void {
        this.isFunctionallyDependent = isFD;
        this.update();
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
     * If this node has a child of type Statement or StatementJunction, throws an error.
     *
     * @param main (Optional) The text that most narrowly fits the component/property
     * @param prefix (Optional) Text from the raw statement that precedes the main part
     * @param suffix (Optional) Text from the raw statement that succeeds the main part
     * @param explicit (Optional) If the raw text is tacit/implicit, this is an explicit specification
     * @param rephrased (Optional) A rephrased version of the text in the main field
     */
    setText(main?: string, prefix?: string, suffix?: string, explicit?: string, rephrased?: string) : void {
        if (!this.text) {
            throw new DataError(DataErrorType.PRP_GET_TXT_UNDEF, this.id);
        } else {
            // Check type of child, if any; if Statement or StatementJunction, cannot add text content
            if (this.children.length === 1) {
                if (this.children[0].nodeType === NodeType.statement) {
                    throw new DataError(DataErrorType.PRP_HAS_STMT_CHLD, this.id);
                } else if (this.children[0].nodeType === NodeType.statementjunction) {
                    throw new DataError(DataErrorType.PRP_HAS_STMTJUN_CHLD, this.id);
                }
                this.children.length = 0;
            }
            this.text.set(main, prefix, suffix, explicit, rephrased);
            this.update();
        }
    }

    /**
     * Unsets the TextContent's fields (not the TextContent object itself).
     */
    unsetText() : void {
        if (!this.text) {
            throw new DataError(DataErrorType.PRP_GET_TXT_UNDEF, this.id);
        }
        this.text.unset();
        this.update();
    }

    /**
     * Internal function that is called by all create*() functions.
     * Checks this node's number of children, which dictates how the child should be added to the array.
     * Calls this.update().
     * NB: Assumes that it is legal to add the child AND that text content is handled separately.
     *
     * @param node A reference to the node to be added as a child
     * @return The passed in node
     * @private
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
    createStatementNode(type: Arg.regulative | Arg.constitutive) : StatementNode {
        this.unsetText();
        return this.addChild((type === Arg.regulative ) ? new RegulativeStatementNode(this.document, this.id) as StatementNode
            : new ConstitutiveStatementNode(this.document, this.id)) as StatementNode;
    }

    /**
     * Creates a StatementJunction node as child of this node.
     * Unsets the text content.
     *
     * @return The newly created node
     */
    createStatementJunctionNode() : StatementJunctionNode {
        this.unsetText();
        return this.addChild(new StatementJunctionNode(this.document, this.id)) as StatementJunctionNode;
    }

    /**
     * Creates a Property node as child of this node.
     *
     * @return The newly created node
     */
    createPropertyNode() : PropertyNode {
        return this.addChild(new PropertyNode(this.document, this.id)) as PropertyNode;
    }

    /**
     * Creates a PropertyJunction node as child of this node.
     *
     * @param junctionType (Optional) A junction type to be given to the new node immediately
     * @return The newly created node
     */
    createPropertyJunctionNode(junctionType?: JunctionType) : PropertyJunctionNode {
        return this.addChild(new PropertyJunctionNode(this.document, this.id, junctionType)) as PropertyJunctionNode;
    }
}