import {JunctionNode, PropertyNode} from "./";
import {IPropertyJunctionNode} from "../interfaces";
import {NodeType, Arg, JunctionType} from "../enums";
import {TextContent} from "../textcontent";

/**
 * This is the class for Junction nodes in the Attribute/Object-Property Hierarchy.
 */
export default class PropertyJunctionNode extends JunctionNode implements IPropertyJunctionNode {
    nodeType: NodeType = NodeType.propertyjunction;
    /* Used to pass descendant Property node's state to ancestor Component/Property node */
    isFunctionallyDependent: Boolean = false;

    /**
     * Build a new PropertyJunctionNode from existing data.
     * Properties (data fields) are copied to the new node from the passed in data.
     *
     * @param data An object of type IPropertyJunctionNode
     * @return A new PropertyJunctionNode with the passed in properties
     */
    static fromData(data: IPropertyJunctionNode) : PropertyJunctionNode {
        let newNode = new PropertyJunctionNode(data.document, data.parent, data.junctionType, data.id);
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
     * Creates a Property node as child of this node.
     *
     * @param position Whether the new node should be the left or right child of this node
     * @return The newly created node
     */
    createPropertyNode(position: Arg.left | Arg.right) : PropertyNode {
        this.children[position] = new PropertyNode(this.document, this.id);
        this.update();
        return this.children[position] as PropertyNode;
    }

    /**
     * Creates a PropertyJunction node as child of this node.
     *
     * @param position Whether the new node should be the left or right child of this node
     * @return The newly created node
     */
    createPropertyJunctionNode(position: Arg.left | Arg.right) : PropertyJunctionNode {
        this.children[position] = new PropertyJunctionNode(this.document, this.id, JunctionType.and);
        this.update();
        return this.children[position] as PropertyJunctionNode;
    }
}