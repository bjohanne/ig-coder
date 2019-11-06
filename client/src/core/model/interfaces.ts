import { NodeType, ComponentType, JunctionType } from "./enums";
import ComponentNode from "./nodes/component";

/**
 * The interface implemented by all nodes
 */
export interface INode {
    id:       number,
    document: number,   // ID of the Document this node belongs to
    nodeType: NodeType;
    origin?:  number,    // ID of the node this node is a reference to (optional)
    parent?:  number,    // ID of the node this node is a child of (undefined if root)
    children: INode[],   // Array of child nodes, more specified in the implementations
    createdAt: Date,
    updatedAt: Date
}

/**
 * The contract for the Component class
 */
 export interface IComponent {
    content: {
        main: string,
        prefix?: string,
        suffix?: string
    }
 }

/**
 * Common members for Norm and Convention nodes
 */
 export interface INormAndConvention {
     setEntry(statement: string) : void,
     getAttributes() : ComponentNode,
     getObject() : ComponentNode,
     getAim() : ComponentNode,
     getConditions() : ComponentNode
 }


 /**
  * Common members for Component and Subcomponent nodes
  */
 export interface IComponentAndSubNode {
     setContent(content?: string, prefix?: string, suffix?: string) : void
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
