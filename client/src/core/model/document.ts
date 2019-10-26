import { INode } from "./interfaces";
import { CompositeNode, NestedCompositeNode, SanctionNode } from "./typenodes";
import Entry from "./entry";

/**
 * A Document represents a policy. It contains a forest of all trees connected to it.
 * The Document class is responsible for keeping track of all node IDs within its forest.
 * Functions to validate, read and write data structures from/to the server are found in this class.
 */
export default class Document {
    forest: INode[] = [];  // Array of all tree roots in the document, in chronological order

    constructor(public name: string, public description: string, public id: number) {
        this.name = name;
    }

    /**
     * Create the root node of a new tree in the forest, either a NestedComposite
     * or Composite node.
     * @param text The full text of the statement
     * @param nested Whether to create a NestedComposite or Composite node
     *               (whether the statement contains a Deontic)
     */
    public createTree(text: string, nested: boolean) {
        let node = (nested) ? new NestedCompositeNode() : new CompositeNode();
        this.forest.push(Object.assign(node, {
            document: this.id,
            id: NodeCounter.getInstance().getNextNodeId(this.id),
            parent: null,
            origin: null,
            entry: Entry.createEntry(text, this.id),
            createdAt: new Date(),
            updatedAt: new Date()
        }));
    }

    /**
     * Delete a tree from the document. The node is removed from the forest array.
     * This leaves the node ID unused, and does not affect the NodeCounter.
     * @param id The root node ID of the tree to be deleted
     */
    public deleteTree(id: number) {
        let forestIndex = this.forest.findIndex(node => node.id === id);
        this.forest.splice(forestIndex, 1);
        // NOTE: I'm not sure if we need to recursively delete all the children.
        // Because of our nested structure, removing a reference to a node
        // removes the reference to its children, and so on, thus deleting the whole tree (I think).
    }

    /**
     * Creates a Sanction node and makes it the root of the given tree.
     * The old root is made the Sanction node's left child.
     * The Sanction node is not given a right child in this function.
     * If the given ID is not found, the function does not change anything.
     * @param id The root node ID of the tree in question
     */
    public addSanctionNodeToTree(id: number) {
        let oldRoot = this.forest.find(node => node.id === id); // Make a copy of the current root node
        if (oldRoot) {  // A node with the given ID (the current root) exists
            let sanctionNode = Object.assign(new SanctionNode(), { // Create new Sanction node
                document: this.id,
                id: NodeCounter.getInstance().getNextNodeId(this.id),
                parent: null,
                origin: null,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            sanctionNode.leftChild = oldRoot; // Attach the Sanction node's child
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
     * @param id The ID of the Sanction node to be deleted, assumed to be the root of its tree
     */
    public removeSanctionNodeFromTree(id: number) {
        let sanctionNode = <SanctionNode>this.forest.find(node => node.id === id);  // Make a copy of the Sanction node
        if (sanctionNode) { // A node with the given ID (the Sanction node) exists
            let newRoot = sanctionNode.leftChild; // Make a copy of the left child, which is to be root
            newRoot.parent = null;  // Unset the new root's parent reference
            let forestIndex = this.forest.findIndex(node => node.id === id);
            this.forest[forestIndex] = newRoot;  // Replace the node in the document's forest
        } else {
            throw new Error(`No node with ID ${id} in this document!`);
        }
    }

    /**
     * Validate this document against the restrictions set in the specification.
     */
    public validate() {
      // TODO
    }

    /**
     * Recursively re-build an ADICO tree fetched from the database
     */
    public fromJSON(jsonData: object) {
        // TODO
        // this one will be interesting
    }

    /**
     * Saves a document by posting it to the server where it is persisted to the database
     */
    public save() {
        // TODO
    }
}

/**
 * Keeps track of the current and next node ID in each document
 */
export class NodeCounter {

    documents: { [id: number]: number };
    private static instance: NodeCounter;

    private constructor() {
        this.documents = {};
    }

    static getInstance() :NodeCounter {
        if(NodeCounter.instance == null) {
            NodeCounter.instance = new NodeCounter();
        }
        return NodeCounter.instance;
    }

    getNextNodeId(documentId: number) :number {
        if(typeof(this.documents[documentId]) !== "undefined") {
            this.documents[documentId] +=1;
        } else {
            this.documents[documentId] = 0;
        }
        return this.documents[documentId];
    }

    getCurrentNodeId(documentId: number) :number {
        if(typeof(this.documents[documentId]) !== "undefined") {
            return this.documents[documentId];
        } else {
            return 0;
        }
    }
}
