import update from "immutability-helper";
import {
    OPEN_SNACKBAR,
    OPEN_SNACKBAR_WITH_DUR,
    OPEN_SNACKBAR_WITH_DATA,
    CLOSE_SNACKBAR
} from "./actions";
import { AUTH_SUCCESS, AUTH_ERROR } from "../user/actions";
import { API_CALL_SUCCESS, API_CALL_ERROR } from "../apiCall/actions";

interface uiState {
    snackbarOpen: boolean,
    snackbarColor: string,
    snackbarMessage: string,
    snackbarDuration: number
}

const initialState: uiState = {
    snackbarOpen: false,
    snackbarColor: "",
    snackbarMessage: "",
    snackbarDuration: 4000
};

const ui = (state: uiState = initialState, action: any) => {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return update(state, {
                snackbarOpen: {$set: true},
                snackbarDuration: {$set: 4000}
            });
        case OPEN_SNACKBAR_WITH_DUR:
            return update(state, {
                snackbarOpen: {$set: true},
                snackbarDuration: {$set: action.duration}
            });
        case OPEN_SNACKBAR_WITH_DATA:
            return update(state, {
                snackbarOpen: {$set: true},
                snackbarColor: {$set: action.color},
                snackbarMessage: {$set: action.message},
                snackbarDuration: {$set: action.duration}
            });
        case CLOSE_SNACKBAR:
            return update(state, {
                snackbarOpen: {$set: false}
            });
        case AUTH_SUCCESS:
            return update(state, {
                snackbarColor: {$set: "success"},
                snackbarMessage: {$set: action.payload}
            });
        case AUTH_ERROR:
            return update(state, {
                snackbarColor: {$set: "error"},
                snackbarMessage: {$set: action.payload}
            });
        case API_CALL_SUCCESS:
            return update(state, {
                snackbarColor: {$set: "success"},
                snackbarMessage: {$set: action.payload}
            });
        case API_CALL_ERROR:
            return update(state, {
                snackbarColor: {$set: "error"},
                snackbarMessage: {$set: action.payload}
            });
        default:
            return state;
    }
};

export default ui;
