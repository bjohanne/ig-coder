import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from 'redux-thunk';
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { documentMiddleware } from "./documents/middleware";
import documentReducer from "./documents/reducer";
import { userMiddleware } from "./users/middleware";
import userReducer from "./users/reducer";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    documentReducer,
    userReducer
});

const allMiddlewares = [documentMiddleware, userMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk, ...allMiddlewares)); // It's important that thunk comes first, otherwise async actions won't work

const persistor = persistStore(store);

export { store, persistor };
