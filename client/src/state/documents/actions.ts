import { INode } from "../../core/model/interfaces";
import axios, { AxiosResponse } from "axios";
import { API_CALL_BEGIN, API_CALL_SUCCESS, API_CALL_ERROR } from "../apiCall/actions";

export const GET_DOCUMENT_RESPONSE = "GET_DOCUMENT_RESPONSE";
export const GET_DOCUMENT_RESPONSE_FETCHED = "GET_DOCUMENT_RESPONSE_FETCHED";
export const CREATE_DOCUMENT_RESPONSE = "CREATE_DOCUMENT_RESPONSE";
export const CREATE_DOCUMENT_RESPONSE_THEN = "CREATE_DOCUMENT_RESPONSE_THEN";
export const LOAD_DOCUMENT_RESPONSE = "LOAD_DOCUMENT_RESPONSE";

export const GET_DOCUMENT = "GET_DOCUMENT";
export const getDocument = (document_id: number) => ({
    type: GET_DOCUMENT,
    document_id: document_id
});

export const SET_ENTRY_INDEX = "SET_ENTRY_INDEX";
export const setEntryIndex = (entryIndex: number) => ({
    type: SET_ENTRY_INDEX,
    payload: entryIndex
});

export const SET_SAVED = "SET_SAVED";
export const setSaved = () => ({
    type: SET_SAVED
});

export const SET_ACTIVE_NODE = "SET_ACTIVE_NODE";
export const setActiveNode = (node: INode) => ({
    type: SET_ACTIVE_NODE,
    payload: node
});

export const LOAD_DOCUMENT = "LOAD_DOCUMENT";
export const loadDocumentFromString = (documentString: string, onSuccess, onError) => ({
    type: LOAD_DOCUMENT,
    payload: documentString,
    onSuccess,
    onError
});

/* For Management Project */
export const createDocument = (name, description, visibility, onSuccess, onError) => async dispatch => {
    dispatch({ type: API_CALL_BEGIN });
    axios({
        url: "/documents",
        method: "post",
        data: {
            name,
            description,
			visibility_id: visibility,
			project_id: 1,	// NB: Hardcoded project ID for now - should take the current project
            forest: []
        }
    })
    .then((response: AxiosResponse) => {
        dispatch({
            type: CREATE_DOCUMENT_RESPONSE,
            payload: response.data
        });
        dispatch({
            type: API_CALL_SUCCESS,
            payload: "Document created!"
        });
        onSuccess(response.data.document_id);
    })
    .catch(() => {
        let errorMsg = "Something went wrong, we couldn't create the document. Please try again.";
        dispatch({
            type: API_CALL_ERROR,
            payload: errorMsg
        });
        onError(errorMsg);
    });
};
