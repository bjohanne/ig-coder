import {
    ComponentJunctionNode,
    ComponentNode,
    PropertyJunctionNode,
    PropertyNode,
    StatementJunctionNode,
    StatementNode
} from "./nodes";
import {NodeType, ComponentType, ContextType, JunctionType, Arg} from "./enums";
import {Entry} from "./entry";
import {TextContent} from "./textcontent";

/* Note that while most classes implement fromData(), this function is not defined in any interfaces. */

/**
 * The base contract for all Nodes
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
    getChildIndexById(targetId: number) : number,
    isDummy() : boolean,
    update() :  void,
    turnNegationOn() : void,
    turnNegationOff() : void
}

 /**
  * The contract for Document objects.
  * Deviation: In the Document class implementation, entries is required (but can be empty).
  * Defines no functions in order to support Document objects without a class.
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
 * The contract for Entry objects.
 * Defines no functions in order to support Entry objects without a class.
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
 * The contract for the TextContent container.
 * Defines no functions in order to support TextContent objects without a class.
 */
export interface ITextContent {
    content?: {
        main:   string,
        prefix: string,
        suffix: string
    }
}

/**
 * The base contract for Statement nodes
 */
export interface IStatementNode extends INode {
    contextType?: ContextType,
    setContextType(contextType: ContextType): void,
    unsetContextType(): void
}

/**
 * The contract for RegulativeStatement nodes
 */
export interface IRegulativeStatementNode extends IStatementNode {
    hasDirectObject(): boolean,
    hasIndirectObject(): boolean,
    hasDeontic(): boolean,
    hasOrElse(): boolean,
    getAttribute(): ComponentNode,
    getDirectObject(): ComponentNode,
    getIndirectObject(): ComponentNode,
    getDeontic(): ComponentNode,
    getAim(): ComponentNode,
    getActivationConditions(): ComponentNode,
    getExecutionConstraints(): ComponentNode,
    getOrElse(): ComponentNode,
    createDirectObject(): ComponentNode,
    deleteDirectObject(): void,
    createIndirectObject(): ComponentNode,
    deleteIndirectObject(): void,
    createDeontic(): ComponentNode,
    deleteDeontic(): void,
    createOrElse(): ComponentNode,
    deleteOrElse(): void
}

/**
 * The contract for ConstitutiveStatement nodes
 */
export interface IConstitutiveStatementNode extends IStatementNode {
    hasConstitutingProperties(): boolean,
    hasModal(): boolean,
    hasOrElse(): boolean,
    getConstitutingProperties(): ComponentNode,
    getModal(): ComponentNode,
    getConstitutiveFunction(): ComponentNode,
    getConstitutedEntity(): ComponentNode,
    getActivationConditions(): ComponentNode,
    getExecutionConstraints(): ComponentNode,
    getOrElse(): ComponentNode,
    createConstitutingProperties(): ComponentNode,
    deleteConstitutingProperties(): void,
    createModal(): ComponentNode,
    deleteModal(): void
    createOrElse(): ComponentNode,
    deleteOrElse() : void
}

/**
 * The contract for Component nodes
 */
export interface IComponentNode extends INode {
    componentType: ComponentType,
    text: TextContent,
    contextType?: ContextType,
    getText() : TextContent,
    setText(main?: string, prefix?: string, suffix?: string): void,
    unsetText(): void,
    setContextType(contextType: ContextType): void,
    unsetContextType(): void,
    getChild(childPos: number): INode,
    deleteChild(childPos: number): void,
    elevateFunctionallyDependent(targetId: number, isFD: Boolean): void,
    createStatementNode(type: Arg.regulative | Arg.constitutive): StatementNode,
    createStatementJunctionNode(): StatementJunctionNode,
    createComponentJunctionNode(): ComponentJunctionNode,
    createComponentNode(componentType: ComponentType): ComponentNode,
    createPropertyNode(): PropertyNode,
    createPropertyJunctionNode(): PropertyJunctionNode
}

/**
 * The base contract for Junction nodes
 */
export interface IJunctionNode extends INode {
    junctionType: JunctionType,
    text: TextContent,
    setJunction(junctionType: JunctionType): void,
    getText() : TextContent,
    setText(main?: string, prefix?: string, suffix?: string): void,
    unsetText(): void,
    getLeft(): INode,
    getRight(): INode,
    deleteLeft(): void,
    deleteRight(): void
}

/**
 * The contract for StatementJunction nodes
 */
export interface IStatementJunctionNode extends IJunctionNode {
    createStatementJunctionNode(position: Arg.left | Arg.right): StatementJunctionNode,
    createStatementNode(type: Arg.regulative | Arg.constitutive, position: Arg.left | Arg.right) : StatementNode
}

/**
 * The contract for ComponentJunction nodes
 */
export interface IComponentJunctionNode extends IJunctionNode {
    componentType: ComponentType,
    createComponentJunctionNode(position: Arg.left | Arg.right): ComponentJunctionNode,
    createComponentNode(componentType: ComponentType, position: Arg.left | Arg.right) : ComponentNode
}

/**
 * The contract for PropertyJunction nodes
 */
export interface IPropertyJunctionNode extends IJunctionNode {
    isFunctionallyDependent: Boolean,
    makeFunctionallyDependent(): void,
    makeNotFunctionallyDependent(): void,
    setFunctionallyDependent(isFD: Boolean): void
    createPropertyNode(position: Arg.left | Arg.right): PropertyNode,
    createPropertyJunctionNode(position: Arg.left | Arg.right): PropertyJunctionNode
}

/**
 * The contract for Property nodes
 */
export interface IPropertyNode extends INode {
    text: TextContent,
    isFunctionallyDependent: Boolean,
    contextType?: ContextType,
    makeFunctionallyDependent(): void,
    makeNotFunctionallyDependent(): void,
    setFunctionallyDependent(isFD: Boolean): void,
    getText(): TextContent,
    setText(content?: string, prefix?: string, suffix?: string): void,
    unsetText(): void,
    setContextType(contextType: ContextType): void,
    unsetContextType(): void,
    deleteChild(childPos: number): void,
    createStatementNode(type: Arg.regulative | Arg.constitutive): StatementNode,
    createStatementJunctionNode(): StatementJunctionNode,
    createPropertyNode(): PropertyNode,
    createPropertyJunctionNode(): PropertyJunctionNode
}
