import { INode } from "../interfaces";
import { NodeType} from "../enums";
import { NodeCounter } from "../document";

/**
 * The base node has the implementation of INode.
 * It is also used as dummy children for several node types.
 */
export class BaseNode implements INode {
    id!: number;
    document!: number;
    nodeType!: NodeType;
    parent?: number;
    origin?: number;
    children!: INode[];
    createdAt!: Date;
    updatedAt!: Date;

    /**
     * The base constructor for all nodes
     *
     * @param document The ID of the document this node belongs to
     * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
     * @param origin (Optional) The ID of the node this node is a reference to
     */
    constructor(document: number, parent?: number, origin?: number) {
        this.id = NodeCounter.getInstance().getNextNodeId(document);
        this.document = document;
        if (parent) {
            this.parent = parent;
        }
        if (origin) {
            this.origin = origin;
        }
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * The standard way of deleting a node.
     * If a node with the given ID is found in this node's children array,
     * that child will be replaced with a dummy node, deleting the old data.
     * If the node is not found, no nodes will be deleted because index will be -1 and no nodes can have the ID -1.
     * Like Document.deleteTree(), all the node's descendants are also deleted.
     * Does not delete children that are automatically created (fixed children).
     *
     * @param id The ID of the node to be deleted; must be a child of this node
     */
    deleteChild(id: number) {
        if (this.nodeType === NodeType.norm || this.nodeType === NodeType.convention) {
            throw new Error("Cannot delete fixed children of Norm and Convention nodes");
        }
        // Fixed children of Object and Conditions (Component) nodes are of type Subcomponent.
        // The below code checks for that without accessing this.componentType, which is not present in BaseNode.
        if (this.nodeType === NodeType.component) {
            let child = this.children.find(node => node.id === id);
            if (typeof child !== "undefined") {
                if (child.nodeType === NodeType.subcomponent) {
                    throw new Error("Cannot delete fixed Subcomponent children of Component nodes");
                }
            }
        }
        let index = this.children.findIndex(node => node.id === id);
        this.children[index] = new BaseNode(this.document, this.id);
    }
}
