

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "./components/App";



/*
let el = document.createElement("root");

document.addEventListener("DOMContentLoaded", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,

    document.body.appendChild(el)
  );
});
*/

import React from 'react';
import { createRoot } from 'react-dom/client';
//import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
