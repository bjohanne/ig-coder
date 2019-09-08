//@flow
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import {middleware} from "./middleware";

let allReducers = combineReducers({
    reducer
});

export const store = createStore(allReducers, applyMiddleware(middleware));
