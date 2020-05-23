import {
    GET_DOCUMENT,
    GET_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT,
    CREATE_DOCUMENT_RESPONSE,
    ADD_ENTRY_TO_DOCUMENT,
    SAVE_DOCUMENT_REQUEST,
    SET_ACTIVE_NODE,
    UPDATE_ENTRY,
    PRE_SET_ACTIVE_NODE,
    ADD_JUNCTION,
    UPDATE_JUNCTION,
    UPDATE_NEGATION
} from "./actionTypes";
import Document from "../core/model/document";
import { INode } from "../core/model/interfaces";

export const getDocument = (document_id: number) => ({
    type: GET_DOCUMENT,
    document_id: document_id
});

export const getDocumentResponse = (payload: Document) => ({
    type: GET_DOCUMENT_RESPONSE,
    payload: payload
});

export const createDocument = (payload: any) => ({
    type: CREATE_DOCUMENT,
    payload: payload
});

export const createDocumentResponse = (payload: Document) => ({
    type: CREATE_DOCUMENT_RESPONSE,
    payload: payload
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