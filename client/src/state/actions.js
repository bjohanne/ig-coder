import {
    TEST_ACTION,
    TEST_ACTION_RESPONSE,
    GET_DOCUMENT,
    GET_DOCUMENT_RESPONSE
} from "./actiontypes";

export const testAction = () => ({
    type: TEST_ACTION
});

export const testActionResponse = (payload) => ({
    type: TEST_ACTION_RESPONSE,
    payload: payload
});

export const getDocument = (document_id) => ({
    type: GET_DOCUMENT,
    document_id: document_id
});

export const getDocumentResponse = (payload) => ({
    type: GET_DOCUMENT_RESPONSE,
    payload: payload
});
