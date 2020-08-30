import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { composeWithDevTools } from "redux-devtools-extension";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import { documentMiddleware } from "./documents/middleware";

import { firebaseReducer } from "react-redux-firebase";
import documents from "./documents/reducer";
import user from "./user/reducer";
import ui from "./ui/reducer";

//import { reactReduxFirebase } from "react-redux-firebase";
//import { compose } from "redux";
//import firebase from "../core/config/firebase";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [
        "documents",
        "user",
        "ui",
        "firebase"
    ]
}

const documentConfig = { key: "documents", storage }

const userConfig = { key: "user", storage }

const uiConfig = { key: "ui", storage,
    blacklist: [
        "snackbarOpen",
        "snackbarColor",
        "snackbarMessage",
        "snackbarDuration"
    ]
}

const firebaseConfig = { key: "firebase", storage, stateReconciler: hardSet }

const rootReducer = combineReducers({
    documents: persistReducer(documentConfig, documents),
    user: persistReducer(userConfig, user),
    ui: persistReducer(uiConfig, ui),
    firebase: persistReducer(firebaseConfig, firebaseReducer)
});

const allMiddlewares = [documentMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);

// @ts-ignore: Expression not callable (typeof reactReduxFirebase has no call signatures). - Most likely this is replaced by ReactReduxFirebaseProvider.
//const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(createStore);

const store = createStore(
    persistedReducer,
    //{},
    composeWithDevTools(
        applyMiddleware(thunk, ...allMiddlewares) // NB: thunk must come first, otherwise async actions won't work
    )
);

const persistor = persistStore(store);

export { store, persistor };
