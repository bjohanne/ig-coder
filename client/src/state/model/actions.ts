import {Arg} from "../../core/model/enums";

export const CREATE_ROOT_NODE = "CREATE_ROOT_NODE";
export const createRootNode = (entryIndex: number, nodeType: Arg.regulative | Arg.constitutive | Arg.statementjunction) => ({
    type: CREATE_ROOT_NODE,
    entryIndex,
    nodeType
});
export const CREATE_ROOT_NODE_RESPONSE = "CREATE_ROOT_NODE_RESPONSE";

export const CLEAR_TREE = "CLEAR_TREE";
export const clearTree = (entryIndex: number) => ({
    type: CLEAR_TREE,
    entryIndex
});
export const CLEAR_TREE_RESPONSE = "CLEAR_TREE_RESPONSE";
