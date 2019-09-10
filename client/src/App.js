import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import {store} from "./state/store";
import TestComponent from "./components/main";

function App() {
  return (
    <Provider store={store}>
        <div className="App">
        <TestComponent/>
        </div>
    </Provider>
  );
}

export default App;
