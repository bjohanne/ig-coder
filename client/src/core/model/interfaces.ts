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
    children: INode[],  // NOTE: Why not just store the IDs of the children, like with parent?
    createdAt: Date,
    updatedAt: Date
 }

 /**
  * An ABDICO component.
  * Content holds the text that most narrowly fits the component type.
  * Prefix and suffix hold the rest of the clause that belongs to the component,
  * like prepositions. Example: "against a certified operation", an Object.
  * "a certified operation" is the content; "against" is the prefix.
  */
 export interface IComponent {
    componentType: ComponentType,
    content: string,
    prefix: string;
    suffix: string;
 }

 /**
  * Node types that can have a Junction as a child need to implement createJunction.
  * These types are Component and Subcomponent.
  * Right now this is implemented by all nodes through BaseNode.
  */
 export interface ICanHaveJunction {

 }
