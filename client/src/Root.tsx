/*
  The Root component wraps the App component and gives it access to the store.
*/

import React from "react";
import {Provider} from "react-redux";
import {store} from "./state/store";
import App from "./App";

function Root() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

export default Root;
