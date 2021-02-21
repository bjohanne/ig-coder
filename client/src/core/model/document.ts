import {BaseNode} from "./nodes";
import {IDocument, INode} from "./interfaces";
import {Entry} from "./entry";
import {DataError, DataErrorType} from "./errors";
import cloneDeep from 'lodash/cloneDeep';

/**
 * A Document represents a policy. It contains a list of entries that are part of it.
 * The Document class is responsible for keeping track of all node IDs within its entry list.
 * Functions to validate, write and read data structures to/from the backend are found in this class.
 */
export default class Document implements IDocument {
	/* Array of all statements in the Document, in chronological order */
    entries: Entry[] = [];
	/* Mapping of entry IDs to indices in the entries array */
	entryMap: { [id: number]: number };	// This is an alternative to getEntryIndexById().

	/**
	 * Constructor with separate parameters for name, description and ID.
	 * @param name The document's title
	 * @param description A free-text field describing the document
	 * @param id The document's identifier, assigned by the backend server
	 * @param entries (Optional) The document's list of entries, if one already exists
	 */
    constructor(public name: string, public description: string, public id: number, entries?: Entry[]) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.entryMap = {};

		// If the entries param is provided, need to recursively build each tree in it.
		// This will be the single method of building/rebuilding a Document.
        if (entries && entries.length > 0) {	// An entry list is provided and it is not empty
            this.entries[0] = cloneDeep(entries[0]);	// NB: Just one entry! Change this when implementing rebuild.
			this.rebuildDates(0);

			// For each level, starting with entries[0], create/assign the appropriate class.
			// Then for each of the children, do the same (need a way to identify each class) (node/comp type).
			// Maybe each class should have its own rebuild function that takes any data it needs as arguments.

			// The steps here will be:
			// 1. for each entry in argument entries, call Entry's own rebuild function
			// 2. Entry.rebuild should call the appropriate rebuild function for the root node
			// 3. and so on...
			// Note: All node rebuild functions should rebuild their own dates using the common method on BaseNode.
			// Then you can remove Document.rebuildDates().
        }
    }

	/**
	 * Static factory method that takes an object containing name, description and ID
	 * and creates a new Document object. Convenience for when you have long arguments.
	 * Only use this for Documents without entries. (?) Don't see why.
	 * @param data An object of type IDocument containing name, description, ID and optionally entries
	 */
	static fromData(data: IDocument) : Document {
		return new this(data.name, data.description, data.id, data.entries);
    }

	/**
	 * Helper method that extracts the root node of each Entry and returns an array of all the root nodes.
	 * Used for creating a stack of the root nodes for iterative traversal.
	 * @private
	 */
	private getRootNodes() : INode[] {
		return this.entries.map(entry => { return entry.root; })
	}

    /**
     * Returns the root node of the given entry in the entry list,
     * or the root node of the first entry if no index is given.
	 *
	 * @param entry (Optional) The index of the entry to get in the list of entries
     */
    getRoot(entry?: number) : INode | undefined {
		if (typeof entry !== "undefined") {	// An entry index is provided
			if (entry < 0 || entry >= this.entries.length) {
				throw new DataError(DataErrorType.DOC_BAD_ENTRY_IDX, this.id);
			}
			return this.entries[entry].root;
		} else if (this.entries[0]) {		// No entry index provided
			return this.entries[0].root;
		} else {							// No entries exist
			throw new DataError(DataErrorType.DOC_NO_ENTRIES, this.id);
		}
    }

    /** Author: Lars Halvor Anundskås
     * Document instances take nodes into this function.
	 * This function iterates nodes until it finds the one with the passed in node's ID
	 * and replaces it with the one sent as param.
	 * Nice if node is not by reference and is changed/updated and needs to be replaced.
     */
    replaceNode(node: INode) : void {
        let nodeStack = this.getRootNodes();
        let current = nodeStack.pop() || null;

        while (current !== null) {
            if (current.id === node.id) {
                let children = current.children;
                current = node;
                current.children = children;
            }
            
            if (current.children) {
                nodeStack = nodeStack.concat(current.children);
            }
            current = nodeStack.pop() || null;
        }
    }

    /**
     * Create a new Entry in the entry list, initially without a root node or statement text.
	 * The Entry is added at the end of the list and returned.
     */
    createEntry() : Entry {
    	let entry = new Entry(this.id);
    	let length = this.entries.push(entry);	// push() returns the new length of the array
		this.entryMap[entry.id] = length - 1;	// Since the entry was pushed to the end of the array, its index is length - 1
		return entry;
    }

    /**
     * Deletes the given Entry from the document. The Entry is deleted from
     * the entries array, and its entire tree is deleted as a consequence.
     * This leaves all the deleted node IDs unused while the IDCounter keeps incrementing.
	 * Throws an error if there are no Entries in this Document or the given array index is out of bounds.
	 * Note that if an Entry is deleted, all succeeding entry indices are decremented, so
	 * this function also updates entryMap.
     *
     * @param index The entries index of the Entry to be deleted
     */
    deleteEntry(index: number) : void {
    	if (this.entries.length === 0) {
    		throw new DataError(DataErrorType.DOC_NO_ENTRIES, this.id);
		}
		if (index < 0 || index >= this.entries.length) {
			throw new DataError(DataErrorType.DOC_BAD_ENTRY_IDX, this.id);
		}
		console.warn("Deleting entry with ID " + this.entries[index].id + " from index " + index);
		this.entries.splice(index, 1);

		// When an item is spliced from an array, all the succeeding items have their index decremented.
		// Update entryMap to the correct indices.
		for (let i = index; i < this.entries.length; i++) {
			this.entryMap[this.entries[i].id] -= 1;
		}
    }

	/**
	 * Find the index of an entry in this document.
	 * Returns undefined if no entry with ID targetId exists.
	 * (This is an alternative to entryMap.)
	 * @param targetId The ID of the entry to find
	 */
	getEntryIndexById(targetId: number) : number | undefined {
		for (let i = 0; i < this.entries.length; i++) {
			if (this.entries[i].id === targetId) {
				return i;
			}
		}
		return undefined;
	}

	/**
	 * Iteratively rebuilds all Date objects in this document, optionally in a single entry.
	 *
	 * @param index (Optional) The entries array index of the entry to rebuild Dates in.
	 */
	rebuildDates(index?: number) : void {
		if (index && index >= this.entries.length) {
			throw new DataError(DataErrorType.DOC_BAD_ENTRY_IDX, this.id);
		}

		let stack;
		if (typeof index === "undefined") {	// An entry index is not provided
			stack = this.getRootNodes();	// Use the entire entry list
		} else {							// An entry index is provided - can be 0
			stack = [ this.entries[index].root ];	// Use only the provided entry
		}

		while (stack.length) {
			const node = stack.shift() as BaseNode;
			if (node && node.createdAt) node.createdAt = new Date(node.createdAt);
			if (node && node.updatedAt) node.updatedAt = new Date(node.updatedAt);
			node && node.children && stack.push(...node.children);	// Push the children to the stack, if any
		}
	}

	/**
	 * Find and return a node by ID.
     * Iteratively searches for a node with ID equals targetId, in the provided entry or all entries of the document.
	 *
	 * @param targetId The ID of the node to be retrieved.
	 * @param index (Optional) The entries array index of the entry to search in.
	 * @return A reference to the node if found, undefined otherwise
     */
	find(targetId: number, index?: number) : BaseNode | undefined {
		if (index && index >= this.entries.length) {
			throw new DataError(DataErrorType.DOC_BAD_ENTRY_IDX, this.id);
		}

		let stack;
		if (typeof index === "undefined") {	// An entry index is not provided
			stack = this.getRootNodes();	// Search the entire entry list
		} else {							// An entry index is provided - can be 0
			stack = [ this.entries[index].root ];	// Search only in the provided entry
		}

		while (stack.length) {
			const node = stack.shift() as BaseNode;
			if (node.id === targetId) {
				return node;
			}
			node && node.children && stack.push(...node.children);	// Push the children to the stack, if any
		}
		return undefined;
	}

    /**
     * Validate this document against the restrictions set in the specification.
     */
    validate() {
      // TODO
    }

    /**
     * Saves a document by posting it to the server where it is persisted to the database
     */
    save() {
        // TODO
    }
}

/**
 * Keeps track of the current and next ID for entries and nodes in each document.
 * IDs start at 1.
 */
export class IDCounter {

    documents: { [id: number]: number };
    private static instance: IDCounter;

    private constructor() {
        this.documents = {};
    }

    static getInstance() : IDCounter {
        if(IDCounter.instance == null) {
            IDCounter.instance = new IDCounter();
        }
        return IDCounter.instance;
    }

	/**
	 * @param doc ID of the Document for which to get an ID
	 */
    getNextId(doc: number) : number {
        if(typeof(this.documents[doc]) !== "undefined") {
            this.documents[doc] +=1;
        } else {
            this.documents[doc] = 1;
        }
        return this.documents[doc];
    }

	/**
	 * @param doc ID of the Document for which to get an ID
	 */
    getCurrentId(doc: number) : number {
        if(typeof(this.documents[doc]) !== "undefined") {
            return this.documents[doc];
        } else {
            return 1;
        }
    }
}
