import { BaseNode } from "./";
import { NodeType } from "../enums";

/**
 * This is the base class for RegulativeStatement and ConstitutiveStatement.
 * Its only use is to provide a shorter check for a union type of the two child classes.
 */
export default class StatementNode extends BaseNode {
    nodeType: NodeType = NodeType.statement;
}
