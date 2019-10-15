import { INode, IComponent } from "./interfaces";
import { CompositeNode, ComponentNode, JunctionNode } from "./typenodes";
import { JunctionType } from "./enums";
import Entry from "./entry";

/**
 * A Document represents a policy.
 */
export default class Document {
    entryList: INode[] = [];  // Array of references to root nodes of all entries in the document, in chronological order
    // NOTE: Could we refer to the nodes just by ID since all IDs within a Document are unique?

    constructor(public documentTitle: string, public documentDescription: string, public documentId: number) {
      this.documentTitle = documentTitle;
      this.documentDescription = documentDescription;
      this.documentId = documentId;
    }

    /**
     * Create the root node for a policy
     */
    createRoot(text: string) {
        this.entryList[0] = Object.assign(new CompositeNode(), {
            document: this.documentId,
            id: NodeCounter.getInstance().getNextNodeId(this.documentId),
            parent: null,
            origin: null,
            entry: Entry.createEntry(text),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    /*createComponentNode(parent: INode, component: IComponent, origin?: number)  :ComponentNode {
        return ComponentNode.createComponentNode(parent, component, origin);
    }

    createJunction(parent: INode, junctionType: JunctionType, ...children: INode[]) :JunctionNode {
        return JunctionNode.createJunction(parent, junctionType, ...children);
    }

    createCompositeNode(parent: INode, entry: Entry, origin?: number) :CompositeNode {
        return CompositeNode.createCompositeNode(parent, entry, origin);
    }*/

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
        // Save this document to the server
    }
}

/**
 * Keeps track of the next ID in each document
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
