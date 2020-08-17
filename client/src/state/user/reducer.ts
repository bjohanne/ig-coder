import update from "immutability-helper";
import { AUTH_BEGIN, AUTH_SUCCESS, AUTH_ERROR } from "./actions";

interface IUserState {
    loading: Boolean
}

const initialState: IUserState = {
    loading: false
};

const user = (state: IUserState = initialState, action: any) => {
    switch (action.type) {
        case AUTH_BEGIN:
            return update(state, {
                loading: {$set: true}
            });
        case AUTH_SUCCESS:
            return update(state, {
                loading: {$set: false}
            });
        case AUTH_ERROR:
            return update(state, {
                loading: {$set: false}
            });
        default:
            return state;
    };
};

export default user;
