import { BaseNode, ComponentNode } from "./nodes";
import { NodeType, ContextType } from "./enums";
import { Entry } from "./entry";

/**
 * The interface implemented by all nodes
 */
export interface INode {
    /* ID of this Node, unique within its Document */
    id:         number,
    /* ID of the Document this node belongs to */
    document:   number,
    /* This Node's type/archetype/role in the statement tree */
    nodeType:   NodeType,
    /* Whether this Node's meaning is negated */
    isNegated:  boolean,
    /* ID of the node this node is a child of (undefined if root) */
    parent?:    number,
    /* The time and date this Node was created */
    createdAt:  Date,
    /* The time and date this Node was last changed */
    updatedAt:  Date,
    /* Array of child nodes of this Node */
    children:   INode[],
    isDummy() : boolean,
    update() :  void,
    rebuildDates() : void,
    turnNegationOn() : void,
    turnNegationOff() : void
 }

 /**
  * The contract for the Document class, with entries and entryMap optional.
  * In the Document class implementation, entries is required (but can be empty).
  */
export interface IDocument {
    /* Name/title of the Document */
	name:        string,
    /* Text describing the Document */
	description: string,
    /* ID of the Document */
	id:          number,
    /* Array of all statements in the Document, in chronological order */
	entries?:    Entry[],
    /* Mapping of entry IDs to indices in the entries array */
    entryMap?: { [id: number]: number }
}

/**
 * The contract for the Entry class
 */
export interface IEntry {
    /* ID of this Entry, unique within its Document */
    id:        number,
    /* ID of the Document this Entry belongs to */
    document:  number,
    /* The statement's root node */
    root?:     INode,
    /* The complete, undivided text of the statement */
    original?: string,
    /* Rephrased, prepared version of the statement for coding */
    prepared?: string
}

/**
 * The contract for the text content wrapper called Primitive
 */
 export interface IText {
    content?: {
        main:   string,
        prefix: string,
        suffix: string
    }
 }

/**
 * The contract for RegulativeStatement nodes
 */
 export interface IRegulativeStatementNode {
     getAttribute(): ComponentNode,
     getDirectObject(): BaseNode,
     getIndirectObject(): BaseNode,
     getDeontic(): BaseNode,
     getAim(): ComponentNode,
     getActivationConditions(): ComponentNode,
     getExecutionConstraints(): ComponentNode,
     getOrElse(): BaseNode,
}

/**
 * The contract for ConstitutiveStatement nodes
 */
export interface IConstitutiveStatementNode {
    getConstitutingProperties(): BaseNode,
    getModal(): BaseNode,
    getConstitutiveFunction(): ComponentNode,
    getConstitutedEntity(): ComponentNode,
    getActivationConditions(): ComponentNode,
    getExecutionConstraints(): ComponentNode,
    getOrElse(): BaseNode,
}

 /**
  * The contract for Component nodes
  */
 export interface IComponentNode {
     setText(content?: string, prefix?: string, suffix?: string): void,
	 unsetText(): void,
     setContextType(contextType: ContextType): void,
     unsetContextType(): void,
     getChild(childPos: number): INode | undefined,
     deleteChild(childPos: number) : void
 }

/**
 * The contract for Junction nodes
 */
 export interface IJunctionNode {
     getLeft(): INode | undefined,
     getRight(): INode | undefined,
     deleteChild(childPos: number) : void
}

/**
 * The contract for Property nodes
 */
export interface IPropertyNode {
    setText(content?: string, prefix?: string, suffix?: string): void,
    unsetText(): void,
    makeFunctionallyDependent(): void,
    makeNotFunctionallyDependent(): void,
    deleteChild(childPos: number) : void
}
