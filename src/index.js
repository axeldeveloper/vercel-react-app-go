import React from 'react';
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
//import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import './index.css';
//import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "./components/App";

// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

let el = document.createElement("root");

document.addEventListener("DOMContentLoaded", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  
    document.body.appendChild(el)
  );
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
