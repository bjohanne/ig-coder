import {
    GET_DOCUMENT,
    GET_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT,
    CREATE_DOCUMENT_RESPONSE,
    SAVE_DOCUMENT_REQUEST
} from "./actionTypes";
import {Middleware, MiddlewareAPI} from "redux";
import axios, {AxiosResponse} from "axios";
import {toast} from 'react-toastify';
import appConfig from "../core/config/appConfig";

export const documentMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => (action: any) => {
    switch (action.type) {
        case GET_DOCUMENT:
			let storeDocuments = store.getState().reducer.documents;
			let foundDocument = storeDocuments.find((document: any) => document.id === Number(action.document_id));

			if (foundDocument) { // A document with the provided ID already exists in state
				store.dispatch({type: GET_DOCUMENT_RESPONSE, payload: foundDocument});
			} else { // Need to query the server
				axios.get(`${appConfig.api.baseUrl}/documents/${action.document_id}`).then((response: AxiosResponse) => {
					response.data.forest = [];	// Turn the forest back into a JS array (needed string on the server)
					store.dispatch({type: GET_DOCUMENT_RESPONSE, payload: response.data});
				});
			}
			break;
        case CREATE_DOCUMENT:
            axios.post(`${appConfig.api.baseUrl}/documents`, action.payload).then((response) => {
				response.data.forest = [];	// Turn the forest back into a JS array (needed string on the server)
                store.dispatch({type: CREATE_DOCUMENT_RESPONSE, payload: response.data});
            });
            break;
        case SAVE_DOCUMENT_REQUEST:
            axios.patch(`${appConfig.api.baseUrl}/documents`, action.payload).then((response) => {
                let toaster = response.status === 200 ? toast.success : toast.error;
                toaster('Document saved!');
            });
            break;
        default:
            break;
    }
    next(action);
};
