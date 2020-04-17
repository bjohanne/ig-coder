/*
  The App component is the root component/wrapper for all pages of the app.
  Fixed UI elements should also be defined here.
*/

import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import { store, persistor } from "./state/store";
import { PersistGate } from "redux-persist/integration/react";

// Components
import Navbar from "./components/common/navbar";
import HomeComponent from "./components/home";
import DocumentComponent from "./components/document";
import NewDocumentComponent from "./components/newDocument";
import NotFoundComponent from "./components/notFound";
import {ToastContainer} from 'react-toastify';
import LoginContainer from "./components/login/loginContainer";
import RegisterContainer from "./components/register/registerContainer";

// Styles
import 'react-toastify/dist/ReactToastify.css';

// Config
import appConfig from "./core/config/appConfig";
import * as firebase from "firebase/app";
import {firebaseConfig} from "./core/config/appConfig";


function App() {
	firebase.initializeApp(firebaseConfig);
    return (
        <Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className="App container-fluid px-0">{/* Added px-0 to remove horizontal padding */}
					<Navbar/>
					<BrowserRouter>
						<Switch>{/* Inside a Switch, only one Route is rendered at a time */}
							<Route exact path={`${appConfig.client.path}/`} component={HomeComponent}/>
							<Route exact path={`${appConfig.client.path}/documents/new`} component={NewDocumentComponent}/>
							<Route exact path={`${appConfig.client.path}/documents/:id`} component={DocumentComponent}/>
							<Route exact path={`${appConfig.client.path}/login`} component={LoginContainer}/>
							<Route exact path={`${appConfig.client.path}/register`} component={RegisterContainer}/>
							<Route path='*' component={NotFoundComponent} />
						</Switch>
					</BrowserRouter>
				</div>
				{/* Default toaster settings */}
				<ToastContainer
					bodyClassName="toast-body"
					position="bottom-center"
					autoClose={3500}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={true}
					rtl={false}
					pauseOnFocusLoss={true}
					pauseOnHover={true}
					draggable={false}
				/>
			</PersistGate>
        </Provider>
    );
}

export default App;
