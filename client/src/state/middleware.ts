import {
    GET_DOCUMENT,
    GET_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT,
    CREATE_DOCUMENT_RESPONSE,
    SAVE_DOCUMENT_REQUEST,
    PRE_SET_ACTIVE_NODE,
    SET_ACTIVE_NODE
} from "./actionTypes";
import {Middleware, MiddlewareAPI} from "redux";
import axios, {AxiosResponse} from "axios";
import {toast} from 'react-toastify';
import appConfig from "../core/config/appConfig";
import { INormAndConvention } from "../core/model/interfaces";

export const documentMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => (action: any) => {
    switch (action.type) {
        case GET_DOCUMENT:
			let storeDocuments = store.getState().reducer.documents;
			let foundDocument = storeDocuments.find((document: any) => document.id === Number(action.document_id));

			if (foundDocument) { // A document with the provided ID already exists in state
				store.dispatch({type: GET_DOCUMENT_RESPONSE, payload: foundDocument});
			} else { // Need to query the server
				axios.get(`${appConfig.api.baseUrl}/documents/${action.document_id}`).then((response: AxiosResponse) => {
					//response.data.forest = [];	// Turn the forest back into a JS array (needed string on the server)
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
        case PRE_SET_ACTIVE_NODE:
            if(action.payload.node.data.nodeType !== "Component") {
                store.dispatch({type: SET_ACTIVE_NODE, payload: action.payload });
                action.payload.togglefunc();
                return;
            }

            // extract the entry text, pass it to the endpoint
            let parent = action.payload.node.parent.data as INormAndConvention;
            let data = { entry: parent.entry.content }
            axios.post(`${appConfig.api.baseUrl}/entities`, data).then((response) => {
                store.dispatch({type: SET_ACTIVE_NODE, payload: Object.assign(action.payload, { ents: response.data["ent"], pos: response.data["pos"] }) });
                action.payload.togglefunc();
            })
            break;
        default:
            break;
    }
    next(action);
};
