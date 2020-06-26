import { USER_REG_BEGIN, USER_REG_SUCCESS, USER_REG_ERROR } from "../users/actions";
import { Middleware, MiddlewareAPI } from "redux";

export const userMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => (action: any) => {
    switch (action.type) {
        case USER_REG_BEGIN:
            break;
        case USER_REG_SUCCESS:
            break;
        case USER_REG_ERROR:
            break;
        default:
            break;
    }
    next(action);
};
