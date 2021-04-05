import {IDocument, INode} from "./interfaces";
import {Entry} from "./entry";
import {DataError, DataErrorType} from "./errors";

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

		// If the entries parameter is provided, rebuild each tree in it.
		if (entries) {
			this.entries = []; // Empty the entry list - it will be rebuilt from the entries parameter
			for (let i = 0; i < entries.length; i++) {
				// For each entry, rebuild the tree starting with root.
				// All node type classes have their own fromData() function that takes an object of its type
				//  and creates a new object from that data.
				// The BaseNode class is responsible for checking the node type, calling the appropriate constructors
				//  and repeating the process for each of the node's children.

				let length = this.entries.push(Entry.fromData(entries[i]));
				this.entryMap[entries[i].id] = length - 1;	// Update entryMap - see createEntry()
			}
		}
    }

	/**
	 * Static factory method that takes an object containing name, description and ID
	 * and creates a new Document object. Convenience for when you have long arguments.
	 * @param data An object of type IDocument
	 * @return A new Document with the passed in properties
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
	 * @return The root node of the given entry. You must type assert its node type.
     */
    getRoot(entry?: number) : INode {
		if (typeof entry !== "undefined") {	// An entry index is provided
			if (entry < 0 || entry >= this.entries.length) {
				throw new DataError(DataErrorType.DOC_BAD_ENTRY_IDX, this.id);
			}
			return this.entries[entry].root;
		} else if (this.entries[0]) {		// No entry index provided - use first
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
	 * Get the specified Entry from this Document using entries array index.
	 * @param index The entries index of the Entry to get
	 */
	getEntry(index: number) : Entry {
		if (this.entries.length === 0) {
			throw new DataError(DataErrorType.DOC_NO_ENTRIES, this.id);
		}
		if (index < 0 || index >= this.entries.length) {
			throw new DataError(DataErrorType.DOC_BAD_ENTRY_IDX, this.id);
		}
		return this.entries[index];
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
	 * Find the index of an entry in this document using its ID.
	 * Returns -1 if no entry with ID targetId exists.
	 * (This is an alternative to entryMap.)
	 * @param targetId The ID of the entry to find
	 */
	getEntryIndexById(targetId: number) : number {
		for (let i = 0; i < this.entries.length; i++) {
			if (this.entries[i].id === targetId) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * Find and return a node by ID.
     * Iteratively searches for a node with ID equals targetId, in the provided Entry or all Entries of this Document.
	 *
	 * @param targetId The ID of the node to be retrieved.
	 * @param index (Optional) The entries array index of the entry to search in.
	 * @return A reference to the node if found, undefined otherwise. You must type assert its node type.
     */
	find(targetId: number, index?: number) : INode | undefined {
		if (index && index >= this.entries.length) {
			throw new DataError(DataErrorType.DOC_BAD_ENTRY_IDX, this.id);
		}

		let node: INode | undefined;
		if (typeof index === "undefined") {	// An entry index is not provided
			for (let i = 0; i < this.entries.length; i++) {
				node = this.entries[i].find(targetId);
				if (node) {
					return node;
				}
			}
		} else {							// An entry index is provided - can be 0
			return this.entries[index].find(targetId);
		}
	}

    /**
     * Validate this document against the restrictions set in the specification.
     */
    validate() {
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
