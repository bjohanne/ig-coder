import {createStore, combineReducers, applyMiddleware} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import reducer from "./reducer";
import {documentMiddleware} from "./middleware";

let allReducers = combineReducers({
    reducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['currentDocument']
}
 
const persistedReducer = persistReducer(persistConfig, allReducers)

const middleWares = [documentMiddleware];

const store = createStore(persistedReducer, applyMiddleware(...middleWares));

const persistor = persistStore(store);

export { store, persistor };