import { BaseNode } from "./base";
import { INode, ITwoChildren } from "../interfaces";
import { JunctionType, NodeType } from "../enums";

import NormNode from "./norm";
import ConventionNode from "./convention";
import NegationNode from "./negation";
import ComponentNode from "./component";
import SubcomponentNode from "./subcomponent";

/**
 * The Junction node is the main building block of horizontal nesting.
 * It is used to combine nodes with logical operators.
 */
export default class JunctionNode extends BaseNode implements ITwoChildren {
   nodeType: NodeType = NodeType.junction;
   children!: [INode, INode];   // Two children
   junctionType!: JunctionType;

   /**
    * Creates a new Junction node without children.
    *
    * @param document The ID of the document this node belongs to
    * @param parent (Optional) The ID of the node this node is a child of (the parent's children array must be set separately)
    */
   constructor(document: number, parent?: number) {
       super(document, parent);
       this.children = [ new BaseNode(document), new BaseNode(document) ]; // Dummy children
   }

   setJunction(junctionType: JunctionType) {
       this.junctionType = junctionType;
   }

   getLeft() : INode {
       return this.children[0];
   }

   getRight() : INode {
       return this.children[1];
   }

   /**
    * Creates a Norm or Convention node as child of this node.
    * NOTE: This function will overwrite any existing descendants in the given index without warning.
    * @param deontic Whether to create a Norm or Convention node
    *               (whether the statement contains a Deontic)
    * @param index The index of this node's children array in which the Norm/Convention node should reside
    * @param origin (Optional) The ID of the node this node is a reference to
    */
   createNormOrConventionNode(deontic: boolean, index: 0 | 1, origin?: number) {
       this.children[index] = (deontic) ? new NormNode(this.document, this.id, origin)
           : new ConventionNode(this.document, this.id, origin);
   }
}
