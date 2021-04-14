import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { composeWithDevTools } from "redux-devtools-extension";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import { documentMiddleware } from "./documents/middleware";
import { modelMiddleware } from "./model/middleware";
import { firebaseReducer } from "react-redux-firebase";
import appSettings from "./appSettings/reducer";
import documents from "./documents/reducer";
import user from "./user/reducer";
import ui from "./ui/reducer";

const appConfig = { key: "appSettings", storage }

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
    appSettings: persistReducer(appConfig, appSettings),
    documents: persistReducer(documentConfig, documents),
    user: persistReducer(userConfig, user),
    ui: persistReducer(uiConfig, ui),
    firebase: persistReducer(firebaseConfig, firebaseReducer)
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: [    // Since each state category is persisted separately, exclude them from being persisted together
        "appSettings",
        "documents",
        "user",
        "ui",
        "firebase"
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const allMiddlewares = [documentMiddleware, modelMiddleware];

const store = createStore(
    persistedReducer,
    //{},
    composeWithDevTools(
        applyMiddleware(thunk, ...allMiddlewares) // NB: thunk must come first, otherwise async actions won't work
    )
);

const persistor = persistStore(store);

export { store, persistor };
