import update from 'immutability-helper';
import { PROCESS_BEGIN, PROCESS_SUCCESS, PROCESS_ERROR } from "../apiRequest/actions";
import { LOGIN_USER, LOGOUT_USER } from "./actions";
import Document from "../../core/model/document";

const INITIAL_STATE = {
    loading: false,
    error: null,
    token: null
};

const userReducer = (state: any = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case PROCESS_BEGIN:
            return update(state, {
                loading: {$set: true},
                error: {$set: null}
            });
        case PROCESS_SUCCESS:
            return update(state, {
                loading: {$set: false},
                error: {$set: null}
            });
        case PROCESS_ERROR:
            return update(state, {
                loading: {$set: false},
                error: {$set: action.error}
            });
        case LOGIN_USER:
            return update(state, {
                token: {$set: action.token}
            });
        case LOGOUT_USER:
            return update(state, {
                token: {$set: null}
            });
        case "persist/REHYDRATE":
            // This is a "manual override" for rehydrating Redux state from local storage. Happens on page load/refresh.

            if (!action.payload) {
                return state;
            }
            console.log(action)

            return update(state, {token: {$set: action.payload}})
        default:
            return state;
    };
};

export default userReducer;
