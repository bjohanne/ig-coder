import {
    TEST_ACTION,
    TEST_ACTION_RESPONSE,
    GET_DOCUMENT,
    GET_DOCUMENT_RESPONSE,
    ADD_DOCUMENT,
    ADD_DOCUMENT_RESPONSE,
    ADD_ENTRY_TO_DOCUMENT,
    ADD_ENTRY_WITH_TOKENIZATION,
    SAVE_DOCUMENT_REQUEST
} from "./actionTypes";
import {Middleware, MiddlewareAPI} from "redux";
import axios, {AxiosResponse} from "axios";
import {toast} from 'react-toastify';
import appConfig from "../core/config/appConfig";

export const basicMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => (action: any) => {
    if (action.type === TEST_ACTION) {
        axios.get(`${appConfig.api.baseUrl}/test/`).then((response: AxiosResponse) => {
            store.dispatch({type: TEST_ACTION_RESPONSE, payload: response.data});
        });
    }
    next(action);
};

export const documentMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => (action: any) => {
    switch (action.type) {
        case GET_DOCUMENT:
            axios.get(`${appConfig.api.baseUrl}/documents/${action.document_id}`).then((response: AxiosResponse) => {
                store.dispatch({type: GET_DOCUMENT_RESPONSE, payload: response.data});
            });
            break;
        case ADD_DOCUMENT:
            console.log(action.document);
            axios.post(`${appConfig.api.baseUrl}/documents`, action.document).then((response) => {
                store.dispatch({type: ADD_DOCUMENT_RESPONSE, payload: response.data});
            });
            break;
        case ADD_ENTRY_TO_DOCUMENT:
            axios.post(`${appConfig.api.baseUrl}/tokenize`, action.payload).then((response) => {
                store.dispatch({
                    type: ADD_ENTRY_WITH_TOKENIZATION,
                    payload: {content: action.payload.content, tokenization: response.data}
                });
            });
            break;
        case SAVE_DOCUMENT_REQUEST:
            axios.patch(`${appConfig.api.baseUrl}/documents`, action.payload).then((response) => {
                let toaster = response.status === 204 ? toast.success : toast.error;
                toaster('Document saved!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false
                });
            });
            break;
        default:
            break;
    }
    next(action);
};
