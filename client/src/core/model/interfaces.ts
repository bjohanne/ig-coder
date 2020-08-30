import { NodeType, ComponentType, JunctionType, SubtreeType } from "./enums";
import BaseNode from "./nodes/base";
import ComponentNode from "./nodes/component";
import { Entry } from "./entry";

/**
 * The interface implemented by all nodes
 */
export interface INode {
    id:       number,
    document: number,   // ID of the Document this node belongs to
    nodeType: NodeType,
	subtree?: SubtreeType,	// What type of subtree the node is part of, if any
    parent?:  number,		// ID of the node this node is a child of (undefined if root)
    origin?:  number,		// ID of the node this node is a reference to (optional)
    createdAt: Date,
    updatedAt: Date,
    children: INode[],   // Array of child nodes, more specified in the implementations
    isDummy() : boolean
 }

 /*
  * The interface for the Document class, with forest optional.
  * In the Document class implementation, forest is required.
  */
export interface IDocument {
	name: string,
	description: string,
	id: number,
	forest?: INode[]
}

/**
 * The contract for the Component class
 */
 export interface IComponent {
    content?: {
        main: string,
        prefix: string,
        suffix: string
    }
 }

 /**
 * The contract for the Entry class
 */
 export interface IEntry {
    content?: string
 }

/**
 * Common members for Norm and Convention nodes
 */
 export interface INormAndConvention {
     entry?: Entry,
     setEntry(statement: string) : void,
	 unsetEntry() : void,
     getAttributes() : ComponentNode,
     getObject() : BaseNode,
     getAim() : ComponentNode,
     getConditions() : ComponentNode
 }


 /**
  * Common members for Component and Subcomponent nodes
  */
 export interface IComponentAndSubNode {
     setContent(content?: string, prefix?: string, suffix?: string) : void,
	 unsetContent() : void
 }

 /**
  * Common members for node types that can/must have one child
  */
 export interface IOneChild {
     getChild() : INode
 }

/**
 * Common members for node types that can/must have two children
 */
 export interface ITwoChildren {
     getLeft() : INode,
     getRight() : INode
 }
