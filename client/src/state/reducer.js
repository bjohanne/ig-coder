//@flow
import update from 'immutability-helper';
import {
    TEST_ACTION_RESPONSE,
    GET_DOCUMENT_RESPONSE,
} from "./actiontypes";

const initialState = {
    test: null,
    document: {"name": "", "description": ""},
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case TEST_ACTION_RESPONSE:
            return update(state, { test: { $set: action.payload } });
        case GET_DOCUMENT_RESPONSE:
            return update(state, { document: { $set: action.payload }});
        default:
            return state;
    }
};
export default reducer;