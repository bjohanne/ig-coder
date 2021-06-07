/*
  The Root component wraps the App component and gives it access to the store.
  This is because the App DOM has two different versions depending on whether Management mode is on.
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
