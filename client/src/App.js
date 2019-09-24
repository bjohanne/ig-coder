/*
  The App component is the root component/wrapper for all pages of the app.
  Fixed UI elements should also be defined here.
*/

import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { store } from "./state/store";

// Components
import Navbar from "./components/common/navbar";
import HomeComponent from "./components/home";
import DocumentComponent from "./components/document";
import NewDocumentComponent from "./components/newDocument";

function App() {
  return (
  <Provider store={ store }>
    <Navbar/>
    <div className="App container-fluid">
      <BrowserRouter>
        <Switch>{/* Inside a Switch, only one Route is rendered at a time */}
          <Route exact path="/" component={ HomeComponent } />
          <Route exact path="/document/new" component={ NewDocumentComponent } />
          <Route exact path="/documents/:id/" component={ DocumentComponent } />
          {/* When none of the above match, <NoMatch> will be rendered (if we need a 404 page) */}
          {/*<Route component={NoMatch} />*/}
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
  );
}

export default App;
