import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import reducer from "./reducer";
import {documentMiddleware} from "./middleware";
import { composeWithDevTools } from 'redux-devtools-extension';

let allReducers = combineReducers({
    reducer
});

const persistConfig = {
  key: 'root',
  storage
}

/*
,
  blacklist: ['currentDocument']
*/

const persistedReducer = persistReducer(persistConfig, allReducers)

const middleWares = [documentMiddleware];

const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(...middleWares),
    )
);

const persistor = persistStore(store);

export { store, persistor };
