//@flow
import {
    TEST_ACTION,
    TEST_ACTION_RESPONSE,
    GET_DOCUMENT,
    GET_DOCUMENT_RESPONSE,
    ADD_DOCUMENT,
    ADD_DOCUMENT_RESPONSE
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
  switch (action.type) {
    case GET_DOCUMENT:
      axios.get(`${appconfig.api.baseUrl}/documents/${action.document_id}`).then((response) => {
        store.dispatch({ type: GET_DOCUMENT_RESPONSE, payload: response.data });
      });
      break;
    case ADD_DOCUMENT:
      axios.post(`${appconfig.api.baseUrl}/documents`, action.document).then((response) => {
        store.dispatch({ type: ADD_DOCUMENT_RESPONSE, payload: response.data });
      });
      break;
    default:
      break;
  }
  next(action);
};
