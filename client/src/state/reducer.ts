
import update from 'immutability-helper';
import Document from "../core/model/document";
import {
    TEST_ACTION_RESPONSE,
    GET_DOCUMENT_RESPONSE,
    ADD_DOCUMENT_RESPONSE
} from "./actiontypes";

interface IInitialState {
    document: Document | null
}

const initialState: IInitialState = {
    document: null
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case TEST_ACTION_RESPONSE:
            return update(state, { test: { $set: action.payload } });
        case GET_DOCUMENT_RESPONSE:
            return update(state, { document: { $set: action.payload }});
        case ADD_DOCUMENT_RESPONSE:
            return update(state, { document: { $set: action.payload }});
        default:
            return state;
    }
};

export default reducer;
