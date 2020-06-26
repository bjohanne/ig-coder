import update from 'immutability-helper';
import { USER_REG_BEGIN, USER_REG_SUCCESS, USER_REG_ERROR } from '../users/actions';

const INITIAL_STATE = {
    loading: false,
    error: null
};

const userReducer = (state: any = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case USER_REG_BEGIN:
            return update(state, {
                loading: {$set: true},
                error: {$set: null}
            });
        case USER_REG_SUCCESS:
            return update(state, {
                loading: {$set: false},
                error: {$set: null}
            });
        case USER_REG_ERROR:
            return update(state, {
                loading: {$set: false},
                error: {$set: action.error}
            });
        default:
            return state;
    };
};

export default userReducer;
