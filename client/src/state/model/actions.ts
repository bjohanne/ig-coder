import {Arg, ContextType} from "../../core/model/enums";

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

export const TURN_NEGATION_ON = "TURN_NEGATION_ON";
export const turnNegationOn = (entryIndex: number, nodeId: number) => ({
    type: TURN_NEGATION_ON,
    entryIndex,
    nodeId
});
export const TURN_NEGATION_ON_RESPONSE = "TURN_NEGATION_ON_RESPONSE";

export const TURN_NEGATION_OFF = "TURN_NEGATION_OFF";
export const turnNegationOff = (entryIndex: number, nodeId: number) => ({
    type: TURN_NEGATION_OFF,
    entryIndex,
    nodeId
});
export const TURN_NEGATION_OFF_RESPONSE = "TURN_NEGATION_OFF_RESPONSE";

export const SET_CONTEXT_TYPE = "SET_CONTEXT_TYPE";
export const setContextType = (entryIndex: number, nodeId: number, contextType: ContextType) => ({
    type: SET_CONTEXT_TYPE,
    entryIndex,
    nodeId,
    contextType
});
export const SET_CONTEXT_TYPE_RESPONSE = "SET_CONTEXT_TYPE_RESPONSE";

export const UNSET_CONTEXT_TYPE = "UNSET_CONTEXT_TYPE";
export const unsetContextType = (entryIndex: number, nodeId: number) => ({
    type: UNSET_CONTEXT_TYPE,
    entryIndex,
    nodeId
});
export const UNSET_CONTEXT_TYPE_RESPONSE = "UNSET_CONTEXT_TYPE_RESPONSE";
