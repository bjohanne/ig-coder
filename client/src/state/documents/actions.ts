import Document from "../../core/model/document";
import { INode } from "../../core/model/interfaces";

export const GET_DOCUMENT = "GET_DOCUMENT";
export const GET_DOCUMENT_RESPONSE = "GET_DOCUMENT_RESPONSE";

export const CREATE_DOCUMENT_RESPONSE = "CREATE_DOCUMENT_RESPONSE";

export const ADD_ENTRY_TO_DOCUMENT = "ADD_ENTRY_TO_DOCUMENT";
export const ADD_ENTRY_WITH_TOKENIZATION = "ADD_ENTRY_WITH_TOKENIZATION";

export const SAVE_DOCUMENT_REQUEST = "SAVE_DOCUMENT_REQUEST";

export const PRE_SET_ACTIVE_NODE = "PRE_SET_ACTIVE_NODE";
export const SET_ACTIVE_NODE = "SET_ACTIVE_NODE";
export const UPDATE_ENTRY = "UPDATE_ENTRY";

export const ADD_JUNCTION = "ADD_JUNCTION";
export const UPDATE_JUNCTION = "UPDATE_JUNCTION";
export const UPDATE_NEGATION = "UPDATE_NEGATION";


export const getDocument = (document_id: number) => ({
    type: GET_DOCUMENT,
    document_id: document_id
});

export const getDocumentResponse = (payload: Document) => ({
    type: GET_DOCUMENT_RESPONSE,
    payload: payload
});

export const createDocumentResponse = (payload: {name: string, description: string, id: number}) => ({
    type: CREATE_DOCUMENT_RESPONSE,
    payload
});

export const addEntryToDocument = ((entry: { documentId: number, content: string, hasDeontic: boolean }) => ({
    type: ADD_ENTRY_TO_DOCUMENT,
    payload: entry
}));

export const saveDocumentRequest = (document: any) => ({
    type: SAVE_DOCUMENT_REQUEST,
    payload: document
});

export const preSetActiveNode = (node: INode) => ({
    type: PRE_SET_ACTIVE_NODE,
    payload: node
});

export const setActiveNode = (node: any) => ({
    type: SET_ACTIVE_NODE,
    payload: node
});

export const updateEntry = (node: any) => ({
    type: UPDATE_ENTRY,
    payload: node
});

export const addJunction = (parentNode: any) => ({
    type: ADD_JUNCTION,
    payload: parentNode
})

export const updateJunction = (payload: any) => ({
    type: UPDATE_JUNCTION,
    payload: payload
});

export const updateNegation = (payload: any) => ({
    type: UPDATE_NEGATION,
    payload: payload
})
