/*
  The App component is the root component/wrapper for all pages of the app.
  Fixed UI elements such as the navbar should be placed here.
*/

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import LoginContainer from "./components/login/loginContainer";
import RegisterContainer from "./components/register/registerContainer";
import PasswordResetContainer from "./components/accountActions/pwdResetContainer";
import ViewDocumentComponent from "./components/documents/viewDocument";
import ProjectsPage from "./components/projects/projectsPage";
import DocumentsPage from "./components/documents/documentsPage";

// Config
import appConfig from "./core/config/appConfig";
import axios from "axios";

// Firebase
import firebase, { rrfConfig } from "./core/config/firebase";

function App() {
	useEffect(() => {
		axios.defaults.baseURL = appConfig.api.baseUrl;
		axios.defaults.timeout = 1000;
	}, []);	// This will only run once

	const reactReduxFirebaseProps = {
		firebase,
		config: rrfConfig,
		dispatch: store.dispatch
	}

    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;
