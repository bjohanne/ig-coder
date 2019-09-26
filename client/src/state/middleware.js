//@flow
import {
    GET_DOCUMENT,
    GET_DOCUMENT_RESPONSE,
    TEST_ACTION,
    TEST_ACTION_RESPONSE
} from "./actiontypes";
import { Store } from "redux";
import axios from "axios";
import appconfig from "../core/config/appconfig"



export const basicMiddleware = (store: Store) => (next: any) => (action: any) => {
    if (action.type === TEST_ACTION) {
        axios.get(`${appconfig.api.baseUrl}/test/`).then((response) => {
            store.dispatch({ type: TEST_ACTION_RESPONSE, payload: response.data });
        });
    }
    next(action);
};

export const documentMiddleware = (store: Store) => (next: any) => (action: any) => {
    if (action.type === GET_DOCUMENT) {
        axios.get(`${appconfig.api.baseUrl}/documents/${action.document_id}`).then((response) => {
            store.dispatch({ type: GET_DOCUMENT_RESPONSE, payload: response.data });
        })
    }
    next(action);
};
