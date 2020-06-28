import update from 'immutability-helper';
import { PROCESS_BEGIN, PROCESS_SUCCESS, PROCESS_ERROR } from "../apiRequest/actions";

const INITIAL_STATE = {
    loading: false,
    error: null
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
        default:
            return state;
    };
};

export default userReducer;
