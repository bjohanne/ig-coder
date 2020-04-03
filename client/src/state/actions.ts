import {
    GET_DOCUMENT,
    GET_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT,
    CREATE_DOCUMENT_RESPONSE,
    ADD_ENTRY_TO_DOCUMENT,
    SAVE_DOCUMENT_REQUEST
} from "./actionTypes";
import Document from "../core/model/document";

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

export const addEntryToDocument = ((entry: { documentId: number, content: string }) => ({
    type: ADD_ENTRY_TO_DOCUMENT,
    payload: entry
}));

export const saveDocumentRequest = (document: any) => ({
    type: SAVE_DOCUMENT_REQUEST,
    payload: document
});
