import { INode } from "./interfaces";
import { Arg, NodeType } from "./enums";
import { BaseNode, NormNode, ConventionNode, JunctionNode, SanctionNode, NegationNode, ComponentNode, SubcomponentNode } from "./nodes";

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
    constructor(public name: string, public description: string, public id: number, forest?: INode[]) {
        this.name = name;
        this.description = description;
        this.id = id;

        if(forest) {
            this.forest = forest;
        }
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
        if (this.forest.length > 0) {
            return this.forest[0];
        }
        return undefined;
    }

    /**
     * 
     * @param type 
     * @param statement 
     */
    updateNode(node: INode) : void {
        let nodeStack: INode[] = [...this.forest];
        let current = nodeStack.pop() || null;

        while(current !== null) {
            if(current.id === node.id) {
                let children = current.children;
                current = node;
                current.children = children;
            }
            
            if(current.children) {
                nodeStack = nodeStack.concat(current.children);
            }
            current = nodeStack.pop() || null;
        }
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
        this.forest.splice(0, 1, node);	// Replace 1 element at index 0
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
	 * Find and return a node by ID.
     * Iteratively searches for a node with the passed in ID, in the entire document's forest by default.
	 * @param targetId The ID of the node to be retrieved.
	 * @param tree (Optional) The forest array index of the tree to search in.
	 * @return A reference to the node if found, undefined otherwise
     */
	find(targetId: number, tree?: number) : BaseNode {
		if (tree && tree >= this.forest.length) {
			throw new Error("array out of bounds");	// This will be a custom error
		}

		let stack;
		if (typeof tree === "undefined") {	// Parameter "tree" is not provided
			stack = [ ...this.forest as BaseNode[] ];	// Search the entire forest
		} else {							// Parameter "tree" is provided - can be 0
			stack = [ this.forest[tree] ];	// Search only in the provided tree
		}

		while (stack.length) {
			const node = stack.shift() as BaseNode;
			if (node.id === targetId) {
				return node;
			}
			node.children && stack.push(...node.children as BaseNode[]);	// Push the children to the stack, if any
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
	 * Toggle ON negation of the passed in node.
	 * Adds a Negation node as parent of targetNode and hooks it into the tree.
	 * @param targetNode The node that should get a Negation parent; must be either Norm, Convention or Junction
	 * @param tree The forest array index of the tree targetNode is in
	 */
	turnOnNegation(targetNode: BaseNode, tree: number) {
		if ( ![NodeType.norm, NodeType.convention, NodeType.junction].includes(targetNode.nodeType) ) {
			throw new Error("Cannot toggle negation of node types other than Norm, Convention and Junction");
		}

		let parentId = targetNode.parent;
		if (typeof parentId === "undefined") {	// targetNode is the root of its tree
			let negationNode = new NegationNode(this.id); // Create a Negation node manually
			negationNode.children[0] = targetNode;	// Hook targetNode in as child
			negationNode.update();
			targetNode.parent = negationNode.id;
			this.forest[tree] = negationNode;			// Make the Negation node the new root of the tree
		} else {
			// Possible node types are all those that can have a Norm/Convention/Junction node as child
			let parentNode = this.find(parentId, tree) as any;

			// Find the index of parentNode's children array that currently holds targetNode
			let childIndex = parentNode.children.indexOf(targetNode);
			if (childIndex === -1) {
				throw new Error("Could not find the child index of parentNode that holds targetNode");
			}

			// Depending on the node type, call the appropriate createNegationNode() function
			if (parentNode.nodeType === NodeType.junction || parentNode.nodeType === NodeType.sanction) {
				(childIndex === 0) ? parentNode.createNegationNode(Arg.left) : parentNode.createNegationNode(Arg.right);
			} else if (parentNode.nodeType === NodeType.component || parentNode.nodeType === NodeType.subcomponent) {
				parentNode.createNegationNode();
			}
		}
	}

	/**
	 * Toggle OFF negation of the passed in node.
	 * Removes the parent Negation node of targetNode and mends the tree.
	 * @param targetNode The child of the Negation node that should be removed; must be either Norm, Convention or Negation
	 * @param tree The forest array index of the tree targetNode is in
	 */
	turnOffNegation(targetNode: BaseNode, tree: number) {
		if ( ![NodeType.norm, NodeType.convention, NodeType.junction].includes(targetNode.nodeType) ) {
			throw new Error("Cannot toggle negation of node types other than Norm, Convention and Junction");
		}

		let parentId = targetNode.parent;
		let parentNode = this.find(parentId, tree);	// This is the Negation node we want to remove
		let grandparentId = parentNode.parent;
		
		if (typeof grandparentId === "undefined") {	// The Negation node is the root of its tree
			this.forest[tree] = targetNode;			// Make the Negation node's child the new root of the tree
			targetNode.parent = undefined;
		} else {
			let grandparentNode = this.find(grandparentId, tree);
			// Find the index of grandparentNode's children array that currently holds parentNode
			let childIndex = grandparentNode.children.indexOf(parentNode);
			if (childIndex === -1) {
				throw new Error("Could not find the child index of grandparentNode that holds parentNode");
			} else {
				grandparentNode[childIndex] = targetNode;	// Overwrite the Negation node (parentNode)
				targetNode.parent = grandparentId;
			}
		}
	}

    /**
     * Validate this document against the restrictions set in the specification.
     */
    validate() {
      // TODO
    }

    /**
     * Recursively re-build an ABDICO tree fetched from the database
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
 * Node IDs start at 1 because I've had trouble passing the value 0
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

	/**
	 * @param id ID of the Document in question
	 */
    getNextNodeId(id: number) : number {
        if(typeof(this.documents[id]) !== "undefined") {
            this.documents[id] +=1;
        } else {
            this.documents[id] = 1;
        }
        return this.documents[id];
    }

	/**
	 * @param id ID of the Document in question
	 */
    getCurrentNodeId(id: number) : number {
        if(typeof(this.documents[id]) !== "undefined") {
            return this.documents[id];
        } else {
            return 1;
        }
    }
}
