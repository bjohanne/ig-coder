//@flow
import update from 'immutability-helper';
import { TEST_ACTION_RESPONSE } from "./actiontypes";

const initialState = {
    test: null
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case TEST_ACTION_RESPONSE:
            return update(state, { test: { $set: action.payload } });
        default:
            return state;
    }
};
export default reducer;