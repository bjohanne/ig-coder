import {
    GET_DOCUMENT,
    GET_DOCUMENT_RESPONSE,
    GET_DOCUMENT_RESPONSE_FETCHED,
    CREATE_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT_RESPONSE_THEN,
    SAVE_DOCUMENT_REQUEST,
    PRE_SET_ACTIVE_NODE,
    SET_ACTIVE_NODE
} from "./actions";
import { Middleware, MiddlewareAPI } from "redux";
import axios, { AxiosResponse, AxiosError } from "axios";
import Document from "../../core/model/document";
import {API_CALL_ERROR} from "../apiCall/actions";
import {OPEN_SNACKBAR} from "../ui/actions";

export const documentMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => (action: any) => {
    switch (action.type) {
        case GET_DOCUMENT:
			let storeDocuments = store.getState().documents.documentList;
			let foundDocument = storeDocuments.find((document: any) => document.id === Number(action.document_id));
            let doc;

			if (foundDocument) { // A document with the provided ID already exists in state
                doc = Document.fromData(foundDocument);
				store.dispatch({type: GET_DOCUMENT_RESPONSE, payload: doc});
			} else { // Need to query the server
				axios.get(`/documents/${action.document_id}`)
                .then((response: AxiosResponse) => {
                    doc = Document.fromData(response.data);
                    store.dispatch({type: GET_DOCUMENT_RESPONSE_FETCHED, payload: doc});
				})
                .catch((error: AxiosError) => {
                    store.dispatch({type: API_CALL_ERROR, error});
                    store.dispatch({type: OPEN_SNACKBAR});
                });
			}
			break;
        case CREATE_DOCUMENT_RESPONSE:
            let createdDocument = new Document(action.payload.name, action.payload.description, action.payload.id);
            store.dispatch({type: CREATE_DOCUMENT_RESPONSE_THEN, payload: createdDocument})
            break;
        case SAVE_DOCUMENT_REQUEST:
            axios.patch("/documents", action.payload).then((response) => {
                //let toaster = response.status === 200 ? toast.success : toast.error;
                //toaster('Document saved!');
                // Render a Snackbar and wait for the response there
            });
            break;
        case PRE_SET_ACTIVE_NODE:
            if(action.payload.node.data.nodeType !== "Component") {
                store.dispatch({type: SET_ACTIVE_NODE, payload: action.payload });
                action.payload.togglefunc();
                return;
            }
            // extract the entry text, pass it to the endpoint
            //let parent = action.payload.node.parent.data as IRegulativeStatementNode;
            //let data = { entry: parent.entry.content }    // TODO FIX
            axios.post("/entities", "DUMMY STRING").then((response) => {
                store.dispatch({type: SET_ACTIVE_NODE, payload: Object.assign(action.payload, { ents: response.data["ent"], pos: response.data["pos"] }) });
                action.payload.togglefunc();
            })
            break;
        default:
            break;
    }
    next(action);
};
