import { ComponentType, NodeType } from "./enums";

/**
 * The interface implemented by all nodes
 */
export interface INode {
    document: number,
    nodeType: NodeType;
    id: number,
    origin: number | null,
    parent: number | null,
    children: INode[],
    createdAt: Date,
    updatedAt: Date
 }

 /**
  * An ABDICO component with text content.
  * Content holds the text that most narrowly fits the component type.
  * Prefix and suffix hold the rest of the clause that belongs to the component,
  * like prepositions. Example: "against a certified operation", an Object.
  * "a certified operation" is the content; "against" is the prefix.
  */
 export interface IComponent {
    componentType: ComponentType,
    content: string | null,
    prefix: string | null,
    suffix: string | null
 }

 /**
  * Node types that can have a Junction as a child need to implement createJunction.
  * This applies to Component, Subcomponent and Junction node types.
  * Right now this is implemented by all nodes through BaseNode.
  */
 /*export interface ICanHaveJunction {

 }*/
