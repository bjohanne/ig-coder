/*
  The App component is the root component/wrapper for all pages of the app.
  Fixed UI elements should also be defined here.
*/

import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import { store, persistor } from "./state/store";
import { PersistGate } from "redux-persist/integration/react";
import ReactTooltip from "react-tooltip";

// Components
import Navbar from "./components/common/navbar";
import HomeComponent from "./components/home";
import DocumentComponent from "./components/document";
import NewDocumentComponent from "./components/newDocument";
import LoginContainer from "./components/login/loginContainer";
import RegisterContainer from "./components/register/registerContainer";
import NotFoundComponent from "./components/notFound";
import {ToastContainer} from 'react-toastify';

// Styles
import 'react-toastify/dist/ReactToastify.css';

// Config
import appConfig from "./core/config/appConfig";
import * as firebase from "firebase/app";
import {firebaseConfig} from "./core/config/appConfig";
import ProjectsPage from "./components/projects/projectsPage";
import DocumentsPage from "./components/documents/documentsPage";

function App() {
	firebase.initializeApp(firebaseConfig);
    return (
        <Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className="App container-fluid">
					<Router>
						<Navbar/>
						<Switch>{/* Inside a Switch, only one Route is rendered at a time */}
							<Route exact path={`${appConfig.client.path}/`} component={HomeComponent}/>
							<Route exact path={`${appConfig.client.path}/documents/new`} component={NewDocumentComponent}/>
							<Route exact path={`${appConfig.client.path}/documents/:id`} component={DocumentComponent}/>
							<Route exact path={`${appConfig.client.path}/login`} component={LoginContainer}/>
							<Route exact path={`${appConfig.client.path}/register`} component={RegisterContainer}/>
							<Route exact path={`${appConfig.client.path}/projects/:tab`} component={ProjectsPage}/>
							<Route exact path={`${appConfig.client.path}/projects/project/:projectid/:tab`} component={DocumentsPage}/>
							<Route path='*' component={NotFoundComponent} />
						</Switch>
					</Router>
				</div>
				{/* Default toaster settings */}
				<ToastContainer
					bodyClassName="toast-body"
					position="bottom-center"
					autoClose={3500}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick={true}
					pauseOnFocusLoss={true}
					pauseOnHover={true}
					draggable={false}
				/>
                <ReactTooltip delayHide={1000} effect="solid" />
			</PersistGate>
        </Provider>
    );
}

export default App;
