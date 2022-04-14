//import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Bootstrap v4.0.0 */}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />

      {/* Fonte Roboto */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />

      {/* Icones Material */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />

      {/* Garante renderização e zoom para mobile */}
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
