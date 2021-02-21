import { JunctionNode, PropertyNode } from "./";
import { INode } from "../interfaces";
import { NodeType, Arg } from "../enums";
import { DataError, DataErrorType } from "../errors";

/**
 * This is the class for Junction nodes in the Attribute/Object-Property Hierarchy.
 */
export default class PropertyJunctionNode extends JunctionNode {
    nodeType: NodeType = NodeType.propertyjunction;
    /* Used to pass descendant Property node's state to ancestor Component/Property node */
    isFunctionallyDependent: Boolean = false;

    /**
     * Creates a new PropertyJunction node with dummy children.
     *
     * @param document The ID of the document this node belongs to
     * @param parent The ID of the node this node is a child of (the parent's children array must be set separately)
     */
    constructor(document: number, parent: number) {
        super(document, parent);
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
    createPropertyNode(position: Arg.left | Arg.right) : INode | undefined {
        this.children[position] = new PropertyNode(this.document, this.id);
        this.update();
        return this.children[position];
    }

    /**
     * Creates a PropertyJunction node as child of this node.
     *
     * @param position Whether the new node should be the left or right child of this node
     * @return The newly created node
     */
    createPropertyJunctionNode(position: Arg.left | Arg.right) : INode | undefined {
        this.children[position] = new PropertyJunctionNode(this.document, this.id);
        this.update();
        return this.children[position];
    }
}