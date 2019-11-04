import { INode } from "./interfaces";
import { NormNode, ConventionNode, SanctionNode } from "./nodes";

/**
 * A Document represents a policy. It contains a forest of all trees connected to it.
 * The Document class is responsible for keeping track of all node IDs within its forest.
 * Functions to validate, read and write data structures from/to the server are found in this class.
 */
export default class Document {
    forest: INode[] = [];  // Array of all tree roots in the document, in chronological order

    constructor(public documentTitle: string, public documentDescription: string, public documentId: number) {
        this.documentTitle = documentTitle;
        this.documentDescription = documentDescription;
        this.documentId = documentId;
    }

    getRoot() : INode {
        return this.forest[0];
    }

    /**
     * Create the root node of a new tree in the forest, either a Norm
     * or Convention node.
     *
     * @param statement The full text of the statement
     * @param deontic Whether to create a Norm or Convention node
     *               (whether the statement contains a Deontic)
     */
    createTree(statement: string, deontic: boolean) {
        let node = (deontic) ? new NormNode(this.documentId)
            : new ConventionNode(this.documentId);
        node.setEntry(statement);
        this.forest.push(node);
    }

    /**
     * Deletes the given tree from the document. The node is deleted from
     * the forest array, and all its descendants are deleted as a consequence.
     * This leaves all the deleted node IDs unused while the NodeCounter keeps incrementing.
     *
     * @param id The root node ID of the tree to be deleted
     */
    deleteTree(id: number) {
        let forestIndex = this.forest.findIndex(node => node.id === id);
        this.forest.splice(forestIndex, 1);
    }

    /**
     * Creates a Sanction node and makes it the root of the given tree.
     * The old root is made the Sanction node's left child.
     * The Sanction node is not given a right child in this function.
     * If the given ID is not found, the function does not change anything.
     *
     * @param id The current root node ID of the tree in question
     */
    addSanctionNodeToTree(id: number) {
        let oldRoot = this.forest.find(node => node.id === id); // Get a reference to the current root node
        if (oldRoot) {  // A node with the given ID (the current root) exists
            let sanctionNode = new SanctionNode(this.documentId);
            sanctionNode.children[0] = oldRoot; // Attach the Sanction node's left child
            oldRoot.parent = sanctionNode.id; // Attach the old root's parent
            let forestIndex = this.forest.findIndex(node => node.id === id);
            this.forest[forestIndex] = sanctionNode;  // Replace the node in the document's forest
        } else {
            throw new Error(`No node with ID ${id} in this document!`);
        }
    }

    /**
     * Deletes the Sanction node from the given tree.
     * Its left child is raised to root, and its right child discarded with all the latter's descendants.
     *
     * @param id The ID of the Sanction node to be deleted, assumed to be the root of its tree
     */
    removeSanctionNodeFromTree(id: number) {
        let sanctionNode = this.forest.find(node => node.id === id) as SanctionNode;  // Make a copy of the Sanction node
        if (sanctionNode) { // A node with the given ID (the Sanction node) exists
            let newRoot = sanctionNode.getLeft(); // Make a copy of the left child, which is to be root
            newRoot.parent = undefined;  // Unset the new root's parent reference
            let forestIndex = this.forest.findIndex(node => node.id === id);
            this.forest[forestIndex] = newRoot;  // Replace the node in the document's forest
        } else {
            throw new Error(`No node with ID ${id} in this document!`);
        }
    }

    /**
     * Validate this document against the restrictions set in the specification.
     */
    validate() {
      // TODO
    }

    /**
     * Recursively re-build an ADICO tree fetched from the database
     */
    fromJSON(jsonData: object) {
        // TODO
        // this one will be interesting
    }

    /**
     * Saves a document by posting it to the server where it is persisted to the database
     */
    save() {
        // TODO
    }
}

/**
 * Keeps track of the current and next node ID in each document
 * Node IDs start at 1 because I've had issues passing 0 as a parent
 * for the first-level children (it just remains undefined).
 */
export class NodeCounter {

    documents: { [id: number]: number };
    private static instance: NodeCounter;

    private constructor() {
        this.documents = {};
    }

    static getInstance() : NodeCounter {
        if(NodeCounter.instance == null) {
            NodeCounter.instance = new NodeCounter();
        }
        return NodeCounter.instance;
    }

    getNextNodeId(documentId: number) : number {
        if(typeof(this.documents[documentId]) !== "undefined") {
            this.documents[documentId] +=1;
        } else {
            this.documents[documentId] = 1;
        }
        return this.documents[documentId];
    }

    getCurrentNodeId(documentId: number) : number {
        if(typeof(this.documents[documentId]) !== "undefined") {
            return this.documents[documentId];
        } else {
            return 1;
        }
    }
}
