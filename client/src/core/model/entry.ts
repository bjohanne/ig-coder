import { ConstitutiveStatementNode, RegulativeStatementNode, StatementJunctionNode } from "./nodes";
import { IEntry, INode } from "./interfaces";
import { Arg } from "./enums";
import { IDCounter } from "./document";

/**
 * An Entry represents a statement and holds its root node, original text and rephrased text.
 * The text of a statement is furthermore broken down in its tree's leaf Component nodes.
 */
export class Entry implements IEntry {
	/* ID of this Entry, unique within its Document */
	id!: number;
	/* ID of the Document this Entry belongs to */
	document!: number;
	/* The statement's root node */
	root?: INode;
	/* The complete, undivided text of the statement */
	original?: string;
	/* Rephrased, prepared version of the statement for coding */
	prepared?: string;

    /**
     * Create a new Entry without a statement or root node.
	 * The Entry is assigned an ID from the IDCounter class,
	 * resulting in Entries and Nodes having unique IDs within their Document.
	 * @param document The ID of the Document to place this Entry in
     */
    constructor(document: number) {
		this.id = IDCounter.getInstance().getNextId(document);
		this.document = document;
    }

	/**
	 * Create a root node in this Entry.
	 * If an original statement is provided, it is set in this Entry.
	 * @param type The node type of the root statement
	 * @param statement (Optional) The full text of the statement
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
	 */
	getRoot() : INode | undefined {
    	return this.root;
	}

	/**
     * Assign this Entry's original statement.
     * @param statement The full text of the raw statement
     */
	setOriginal(statement: string) : void {
		this.original = statement;
	}

	/**
	 * Set this Entry's original statement to undefined.
	 */
	unsetOriginal() : void {
		this.original = undefined;
	}

	/**
	 * Assign this Entry's prepared statement.
	 * @param statement The full text of the prepared statement
	 */
	setPrepared(statement: string) : void {
		this.prepared = statement;
	}

	/**
	 * Set this Entry's prepared statement to undefined.
	 */
	unsetPrepared() : void {
		this.prepared = undefined;
	}
}
