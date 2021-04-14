import {Arg, ContextType, JunctionType, NodeType} from "../../core/model/enums";
import {ITextContent} from "../../core/model/interfaces";

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

export const SET_REPHRASED = "SET_REPHRASED";
export const setRephrased = (entryIndex: number, rephrased: string) => ({
    type: SET_REPHRASED,
    entryIndex,
    rephrased
});
export const SET_REPHRASED_RESPONSE = "SET_REPHRASED_RESPONSE";

export const UNSET_REPHRASED = "UNSET_REPHRASED";
export const unsetRephrased = (entryIndex: number) => ({
    type: UNSET_REPHRASED,
    entryIndex
});
export const UNSET_REPHRASED_RESPONSE = "UNSET_REPHRASED_RESPONSE";

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

export const TURN_FUNCDEP_ON = "TURN_FUNCDEP_ON";
export const turnFunctionallyDependentOn = (entryIndex: number, nodeId: number) => ({
    type: TURN_FUNCDEP_ON,
    entryIndex,
    nodeId
});
export const TURN_FUNCDEP_ON_RESPONSE = "TURN_FUNCDEP_ON_RESPONSE";

export const TURN_FUNCDEP_OFF = "TURN_FUNCDEP_OFF";
export const turnFunctionallyDependentOff = (entryIndex: number, nodeId: number) => ({
    type: TURN_FUNCDEP_OFF,
    entryIndex,
    nodeId
});
export const TURN_FUNCDEP_OFF_RESPONSE = "TURN_FUNCDEP_OFF_RESPONSE";

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

export const SET_JUNCTION_TYPE = "SET_JUNCTION_TYPE";
export const setJunctionType = (entryIndex: number, nodeId: number, junctionType: JunctionType) => ({
    type: SET_JUNCTION_TYPE,
    entryIndex,
    nodeId,
    junctionType
});
export const SET_JUNCTION_TYPE_RESPONSE = "SET_JUNCTION_TYPE_RESPONSE";

export const UNSET_JUNCTION_TYPE = "UNSET_JUNCTION_TYPE";
export const unsetJunctionType = (entryIndex: number, nodeId: number) => ({
    type: UNSET_JUNCTION_TYPE,
    entryIndex,
    nodeId
});
export const UNSET_JUNCTION_TYPE_RESPONSE = "UNSET_JUNCTION_TYPE_RESPONSE";

export const SET_TEXT_CONTENT = "SET_TEXT_CONTENT";
export const setTextContent = (entryIndex: number, nodeId: number, textContent: ITextContent) => ({
    type: SET_TEXT_CONTENT,
    entryIndex,
    nodeId,
    textContent
});
export const SET_TEXT_CONTENT_RESPONSE = "SET_TEXT_CONTENT_RESPONSE";

export const UNSET_TEXT_CONTENT = "UNSET_TEXT_CONTENT";
export const unsetTextContent = (entryIndex: number, nodeId: number) => ({
    type: UNSET_TEXT_CONTENT,
    entryIndex,
    nodeId
});
export const UNSET_TEXT_CONTENT_RESPONSE = "UNSET_TEXT_CONTENT_RESPONSE";

/* ---------------------Children--------------------- */
// Add

export const ADD_CHILD_TO_STATEMENT = "ADD_CHILD_TO_STATEMENT";
export const addChildToStatement = (entryIndex: number, parentId: number, childIndex: number) => ({
    type: ADD_CHILD_TO_STATEMENT,
    entryIndex,
    parentId,
    childIndex
});
export const ADD_CHILD_TO_STATEMENT_RESPONSE = "ADD_CHILD_TO_STATEMENT_RESPONSE";

export const ADD_CHILD_TO_COMPONENT = "ADD_CHILD_TO_COMPONENT";
export const addChildToComponent = (entryIndex: number, parentId: number, childType: NodeType) => ({
    type: ADD_CHILD_TO_COMPONENT,
    entryIndex,
    parentId,
    childType
});
export const ADD_CHILD_TO_COMPONENT_RESPONSE = "ADD_CHILD_TO_COMPONENT_RESPONSE";

export const ADD_CHILD_TO_JUNCTION = "ADD_CHILD_TO_JUNCTION";
export const addChildToJunction = (entryIndex: number, parentId: number, childType: NodeType, childIndex: number) => ({
    type: ADD_CHILD_TO_JUNCTION,
    entryIndex,
    parentId,
    childType,
    childIndex
});
export const ADD_CHILD_TO_JUNCTION_RESPONSE = "ADD_CHILD_TO_JUNCTION_RESPONSE";

export const ADD_CHILD_TO_PROPERTY = "ADD_CHILD_TO_PROPERTY";
export const addChildToProperty = (entryIndex: number, parentId: number, childType: NodeType) => ({
    type: ADD_CHILD_TO_PROPERTY,
    entryIndex,
    parentId,
    childType
});
export const ADD_CHILD_TO_PROPERTY_RESPONSE = "ADD_CHILD_TO_PROPERTY_RESPONSE";

// Delete

export const DELETE_CHILD_FROM_STATEMENT = "DELETE_CHILD_FROM_STATEMENT";
export const deleteChildFromStatement = (entryIndex: number, parentId: number, childIndex: number) => ({
    type: DELETE_CHILD_FROM_STATEMENT,
    entryIndex,
    parentId,
    childIndex
});
export const DELETE_CHILD_FROM_STATEMENT_RESPONSE = "DELETE_CHILD_FROM_STATEMENT_RESPONSE";

export const DELETE_CHILD_FROM_COMPONENT = "DELETE_CHILD_FROM_COMPONENT";
export const deleteChildFromComponent = (entryIndex: number, parentId: number, childIndex: number) => ({
    type: DELETE_CHILD_FROM_COMPONENT,
    entryIndex,
    parentId,
    childIndex
});
export const DELETE_CHILD_FROM_COMPONENT_RESPONSE = "DELETE_CHILD_FROM_COMPONENT_RESPONSE";

export const DELETE_CHILD_FROM_JUNCTION = "DELETE_CHILD_FROM_JUNCTION";
export const deleteChildFromJunction = (entryIndex: number, parentId: number, childIndex: number) => ({
    type: DELETE_CHILD_FROM_JUNCTION,
    entryIndex,
    parentId,
    childIndex
});
export const DELETE_CHILD_FROM_JUNCTION_RESPONSE = "DELETE_CHILD_FROM_JUNCTION_RESPONSE";

export const DELETE_CHILD_FROM_PROPERTY = "DELETE_CHILD_FROM_PROPERTY";
export const deleteChildFromProperty = (entryIndex: number, parentId: number) => ({
    type: DELETE_CHILD_FROM_PROPERTY,
    entryIndex,
    parentId
});
export const DELETE_CHILD_FROM_PROPERTY_RESPONSE = "DELETE_CHILD_FROM_PROPERTY_RESPONSE";
