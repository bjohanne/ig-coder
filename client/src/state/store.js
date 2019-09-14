//@flow
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import { basicMiddleware, documentMiddleware } from "./middleware";

let allReducers = combineReducers({
    reducer
});

const middleWares = [basicMiddleware, documentMiddleware];

export const store = createStore(allReducers, applyMiddleware(...middleWares));
