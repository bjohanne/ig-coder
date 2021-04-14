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


/* OLD, not in use */

export const PRE_SET_ACTIVE_NODE = "PRE_SET_ACTIVE_NODE";
export const preSetActiveNode = (node: INode) => ({
    type: PRE_SET_ACTIVE_NODE,
    payload: node
});

export const ADD_ENTRY_TO_DOCUMENT = "ADD_ENTRY_TO_DOCUMENT";
export const addEntryToDocument = ((entry: { documentId: number, content: string, hasDeontic: boolean }) => ({
    type: ADD_ENTRY_TO_DOCUMENT,
    payload: entry
}));

export const SAVE_DOCUMENT_REQUEST = "SAVE_DOCUMENT_REQUEST";
export const saveDocumentRequest = (document: any) => ({
    type: SAVE_DOCUMENT_REQUEST,
    payload: document
});

export const UPDATE_ENTRY = "UPDATE_ENTRY";
export const updateEntry = (node: any) => ({
    type: UPDATE_ENTRY,
    payload: node
});

export const ADD_JUNCTION = "ADD_JUNCTION";
export const addJunction = (parentNode: any) => ({
    type: ADD_JUNCTION,
    payload: parentNode
});

export const UPDATE_JUNCTION = "UPDATE_JUNCTION";
export const updateJunction = (payload: any) => ({
    type: UPDATE_JUNCTION,
    payload
});

export const UPDATE_NEGATION = "UPDATE_NEGATION";
export const updateNegation = (payload: any) => ({
    type: UPDATE_NEGATION,
    payload
});

/* This one is used, though */

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
