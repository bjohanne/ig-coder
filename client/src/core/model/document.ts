import { INode } from "./interfaces";
import { Arg } from "./enums";
import { NormNode, ConventionNode, SanctionNode } from "./nodes";

// Interface for a Document object with empty forest
interface IEmptyDocument {
	name: string,
	description: string,
	id: number
}

/**
 * A Document represents a policy. It contains a forest of all trees connected to it.
 * The Document class is responsible for keeping track of all node IDs within its forest.
 * Functions to validate, read and write data structures from/to the server are found in this class.
 */
export default class Document {
    forest: INode[] = [];  // Array of all tree roots in the document, in chronological order
	//current: any;	// For React useRef()

	/**
	 * Constructor with separate parameters for name, description and ID.
	 * @param name The document's title
	 * @param description A free-text field describing the document
	 * @param id The document's identifier, given by the server
	 */
    constructor(public name: string, public description: string, public id: number) {
        this.name = name;
        this.description = description;
        this.id = id;
    }

	/**
	 * Static factory method that takes an object containing name, description and ID.
	 * @param data An object of type IEmptyDocument containing name, description and ID
	 */
	static fromData(data: IEmptyDocument) {
		return new this(data.name, data.description, data.id);
    }

    /**
     * Returns the root node of the first tree in the forest,
     * or undefined if there are no trees in the forest.
     */
    getRoot() : INode | undefined {
        if (this.forest.length >= 0) {
            return this.forest[0];
        }
        return undefined;
    }

    /**
     * Create the root node of a new tree in the forest, either a Norm
     * or Convention node.
	 * Currently just overwrites index 0, since it's the only one we use for now.
     *
     * @param type Whether to create a Norm or Convention node
     * @param statement (Optional) The full text of the statement
     */
    createTree(type: Arg.norm | Arg.convention, statement?: string) {
        let node = (type === Arg.norm) ? new NormNode(this.id, statement)
            : new ConventionNode(this.id, statement);
        this.forest.splice(0, 1, node);	// Replace element at index 0
    }

    /**
     * Deletes the given tree from the document. The root node is deleted from
     * the forest array, and all its descendants are deleted as a consequence.
     * This leaves all the deleted node IDs unused while the NodeCounter keeps incrementing.
     * If there is no tree at the given index, no nodes will be deleted (and there is no warning).
     *
     * @param The forest index of the tree to be deleted
     */
    deleteTree(index: number) {
		if (this.forest[index]) {
	        this.forest.splice(index, 1);
		}
    }

    /**
     * Creates a Sanction node and makes it the root of the given tree.
     * The old root is made the Sanction node's left child.
     * The Sanction node is not given a right child in this function.
     * If there is no tree at the given index, the forest will not be modified.
     *
     * @param index The forest index of the tree in question
     */
    addSanctionNodeToTree(index: number) {
        let oldRoot = this.forest[index]; // Get a reference to the current root node
        if (oldRoot) {
            let sanctionNode = new SanctionNode(this.id);
            sanctionNode.children[0] = oldRoot; // Attach the Sanction node's left child
            oldRoot.parent = sanctionNode.id; // Attach the old root's parent
            this.forest[index] = sanctionNode;  // Replace the node in the document's forest
        }
    }

    /**
     * Deletes the Sanction node from the given tree.
     * Its left child is raised to root, and its right child discarded with all the latter's descendants.
     *
     * @param index The forest index of the tree in question
     */
    deleteSanctionNodeFromTree(index: number) {
        let sanctionNode = this.forest[index] as SanctionNode; // Get a reference to the Sanction node
        if (sanctionNode) {
            let newRoot = sanctionNode.getLeft(); // Get a reference to the left child, which is to be root
            newRoot.parent = undefined;  // Unset the new root's parent
            this.forest[index] = newRoot;  // Replace the node in the document's forest
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
 * Node IDs start at 1 because I've had issues passing the value 0
 * in functions to set the parent for new nodes.
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

    getNextNodeId(id: number) : number {
        if(typeof(this.documents[id]) !== "undefined") {
            this.documents[id] +=1;
        } else {
            this.documents[id] = 1;
        }
        return this.documents[id];
    }

    getCurrentNodeId(id: number) : number {
        if(typeof(this.documents[id]) !== "undefined") {
            return this.documents[id];
        } else {
            return 1;
        }
    }
}
