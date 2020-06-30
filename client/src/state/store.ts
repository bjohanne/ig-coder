import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from 'redux-thunk';
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';

import { documentMiddleware } from "./documents/middleware";
import documentReducer from "./documents/reducer";
import userReducer from "./users/reducer";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    documentReducer,
    userReducer
});

const allMiddlewares = [documentMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);

 // It's important that thunk comes first, otherwise async actions won't work
const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk, ...allMiddlewares),
    )
);

const persistor = persistStore(store);

export { store, persistor };
