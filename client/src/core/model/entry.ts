import {BaseNode, ConstitutiveStatementNode, RegulativeStatementNode, StatementJunctionNode,} from "./nodes";
import {IEntry, INode} from "./interfaces";
import {Arg} from "./enums";
import {IDCounter} from "./document";
import {DataError, DataErrorType} from "./errors";

/**
 * An Entry represents a statement and holds its root node, original text and rephrased (prepared) text.
 * The text of a statement is furthermore broken down in its tree's leaf Component nodes.
 */
export class Entry implements IEntry {
	/* ID of this Entry, unique within its Document */
	id!: number;
	/* ID of the Document this Entry belongs to */
	document!: number;
	/* This Entry's root node */
	root?: INode;
	/* The complete statement */
	original: string;
	/* Optionally, the statement can be rephrased before coding. The rephrased version is stored here. */
	rephrased: string;

    /**
     * Create a new Entry without a statement or root node.
	 * The Entry is assigned an ID from the IDCounter class,
	 * resulting in Entries and Nodes having unique IDs within their Document.
	 * @param document The ID of the Document to place this Entry in
	 * @param id (Optional) The ID of this entry if one already exists (for rebuilding from existing data)
     */
    constructor(document: number, id?: number) {
    	this.id = (id) ? id : IDCounter.getInstance().getNextId(document);
		this.document = document;
		this.original = "";
		this.rephrased = "";
    }

	/**
	 * Build a new Entry from existing data. If the passed in data includes a root node,
	 *  the node data is forwarded to BaseNode.fromData() to be rebuilt.
	 * @param data An object of type IEntry
	 * @return A new Entry with the passed in properties
	 */
	static fromData(data: IEntry) : Entry {
		let newEntry = new this(data.document, data.id);
		newEntry.original = data.original;
		newEntry.rephrased = data.rephrased;
		if (data.root) {
			newEntry.root = BaseNode.fromData(data.root);
		}
		return newEntry;
	}

	/**
	 * Create a root node in this Entry.
	 * If an original statement is provided, it is set in this Entry.
	 * @param type The node type of the root statement
	 * @param statement?? (Optional) The full text of the statement
	 * @return The newly created root node. You must type assert its node type.
	 */
	createRoot(type: Arg.regulative | Arg.constitutive | Arg.statementjunction, statement?: string) : INode {
		this.root = (type === Arg.regulative) ? new RegulativeStatementNode(this.document)
			: (type === Arg.constitutive) ? new ConstitutiveStatementNode(this.document)
				: new StatementJunctionNode(this.document);
		if (typeof(statement) !== "undefined") {
			this.original = statement;
		}
		return this.root;
	}

	/**
	 * Returns this Entry's root node or undefined if it doesn't exist.
	 * @return This Entry's root node. You must type assert its node type.
	 */
	getRoot() : INode | undefined {
    	return this.root;
	}

	/**
	 * Delete this Entry's root node, which deletes the entire tree.
	 */
	deleteRoot() : void {
		if (this.root) {
			console.warn("Deleting root node with ID " + this.root.id + " from entry with ID " + this.id);
			this.root = undefined;
		} else {
			throw new DataError(DataErrorType.ENT_NO_ROOT, this.id);
		}
	}

	/**
     * Assign this Entry's original statement.
     * @param statement The full text of the raw statement
     */
	setOriginal(statement: string) : void {
		this.original = statement;
	}

	/**
	 * Set this Entry's original statement to an empty string.
	 */
	unsetOriginal() : void {
		this.original = "";
	}

	/**
	 * Assign this Entry's prepared statement.
	 * @param statement The full text of the prepared statement
	 */
	setRephrased(statement: string) : void {
		this.rephrased = statement;
	}

	/**
	 * Set this Entry's prepared statement to an empty string.
	 */
	unsetRephrased() : void {
		this.rephrased = "";
	}

	/**
	 * Find and return a node by ID.
	 * Iteratively searches for a node with ID equals targetId, in this Entry.
	 *
	 * @param targetId The ID of the node to be retrieved.
	 * @return A reference to the node if found, undefined otherwise. You must type assert its node type.
	 */
	find(targetId: number) : INode | undefined {
		let stack = [ this.root ];

		while (stack.length) {
			const node = stack.shift() as BaseNode;
			if (node.id === targetId) {
				return node;
			}
			node && node.children && stack.push(...node.children);	// Push the children to the stack, if any
		}
		throw new DataError(DataErrorType.ENT_FIND_FAIL, targetId);
	}
}
