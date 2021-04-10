/*
  The App component handles routing and showing all pages of the appSettings, as well as config.
  Fixed UI elements such as the navbar belong here.
*/

import React, { useEffect } from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./state/store";
import ReactTooltip from "react-tooltip";
import Container from "react-bootstrap/Container";
import "./App.css";

// Wrappers
import AuthLoader from "./components/routeWrappers/authLoader";
import HomeRoute from "./components/routeWrappers/home";
import AuthenticationRoute from "./components/routeWrappers/authPage";
import ProtectedRoute from "./components/routeWrappers/protected";

// Components
import SnackbarComponent from "./components/common/snackbar";
import Navbar from "./components/common/navbar";
import NotFoundComponent from "./components/notFound";
import WelcomeComponent from "./components/welcome";
import LoginContainer from "./components/login/loginContainer";
import RegisterContainer from "./components/register/registerContainer";
import PasswordResetContainer from "./components/accountActions/pwdResetContainer";
import ViewDocumentComponent from "./components/documents/viewDocument";
import ViewEntryComponent from "./components/documents/viewEntry";
import ProjectsPage from "./components/projects/projectsPage";
import DocumentsPage from "./components/documents/documentsPage";

// Config
import appConfig from "./core/config/urlConfig";
import axios from "axios";

// Firebase
import firebase, { rrfConfig } from "./core/config/firebase";

function App(props) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { inManagementMode, changed } = props;

	useEffect(() => {
		axios.defaults.baseURL = appConfig.api.baseUrl;
		axios.defaults.timeout = 1500;
	}, []);

	/*	This creates a pop-up every time the user closes the tab/browser if they have unsaved work.
		However, everything is saved automatically so it uses an artificial check for whether there is unsaved work.
		It's annoying, so commented away for now.

	const alertUser = (e: BeforeUnloadEvent) => {
		if (changed) {
			// Cancel the event
			e.preventDefault(); // If you prevent default behavior in Mozilla Firefox, prompt will always be shown
			// Chrome requires returnValue to be set
			e.returnValue = "";
		}
	}

	useEffect(() => {
		// Warn the user before closing the tab/navigating elsewhere, if there are unsaved changes
		window.addEventListener("beforeunload", alertUser);
		return () => {
			window.removeEventListener("beforeunload", alertUser)
		}
	})
	*/

	const reactReduxFirebaseProps = {
		firebase,
		config: rrfConfig,
		dispatch: store.dispatch
	}

	if (inManagementMode) {	// Management layer ON
		return (
			<ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
				<PersistGate loading={null} persistor={persistor}>
					<Container fluid className="App">
						<AuthLoader>
							<Router>
								<Navbar/>
								<Switch>
									<HomeRoute exact path="/" />
									<AuthenticationRoute exact path="/login" component={LoginContainer} />
									<AuthenticationRoute exact path="/register" component={RegisterContainer} />
									<AuthenticationRoute exact path="/resetpass" component={PasswordResetContainer} />
									<ProtectedRoute exact path="/documents/:id" component={ViewDocumentComponent} />
									<ProtectedRoute exact path="/projects/:tab" component={ProjectsPage} />
									<ProtectedRoute exact path="/projects/project/:projectid/:tab" component={DocumentsPage} />
									<Route path="*" component={NotFoundComponent} />
								</Switch>
							</Router>
						</AuthLoader>
					</Container>
					<SnackbarComponent />
					<ReactTooltip delayHide={1000} effect="solid" />
				</PersistGate>
			</ReactReduxFirebaseProvider>
		);

	} else {							// Management layer OFF
		return (
			<PersistGate loading={null} persistor={persistor}>
				<Container fluid className="App">
					<Router>
						<Navbar/>
						<Switch>
							<Route exact path="/" component={WelcomeComponent} />
							<Route exact path="/documents/:id" component={ViewDocumentComponent} />
							<Route exact path="/documents/:docid/entries/:entryid" component={ViewEntryComponent} />
							<Route path="*" component={NotFoundComponent} />
						</Switch>
					</Router>
				</Container>
				<SnackbarComponent />
				<ReactTooltip delayHide={1000} effect="solid" />
			</PersistGate>
		);
	}
}

const mapStateToProps = (state: any) => ({
	inManagementMode: state.appSettings.mode.management,
	changed: state.documents.changed
});

export default connect(
	mapStateToProps,
	null
)(App);
