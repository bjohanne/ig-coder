/*
  The App component is the root component/wrapper for all pages of the app.
  Fixed UI elements should also be defined here.
*/

import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import {store} from "./state/store";

// Components
import Navbar from "./components/common/navbar";
import HomeComponent from "./components/home";
import DocumentComponent from "./components/document";
import NewDocumentComponent from "./components/newDocument";
import NewEntryComponent from "./components/newEntry"
import NotFoundComponent from "./components/notFound";
import {ToastContainer} from 'react-toastify';

// Styles
import 'react-toastify/dist/ReactToastify.css';

// Config
import appConfig from "./core/config/appConfig";

function App() {
    return (
        <Provider store={store}>
            <Navbar/>
            <div className="App container-fluid">
                <BrowserRouter>
                    <Switch>{/* Inside a Switch, only one Route is rendered at a time */}
                        <Route exact path={`${appConfig.client.path}/`} component={HomeComponent}/>
                        <Route exact path={`${appConfig.client.path}/documents/new`} component={NewDocumentComponent}/>
                        <Route exact path={`${appConfig.client.path}/documents/:id`} component={DocumentComponent}/>
                        <Route exact path={`${appConfig.client.path}/documents/:id/entries/new`} component={NewEntryComponent}/>
                        <Route path='*' component={NotFoundComponent} />
                    </Switch>
                </BrowserRouter>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={true}
                draggable
                pauseOnHover
            />
        </Provider>
    );
}

export default App;
