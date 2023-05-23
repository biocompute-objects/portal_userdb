
import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
// import TagManager from "react-gtm-module";
import ReactGA from "react-ga4";

function initializeReactGA(){
  ReactGA.initialize("G-RP8P4D7VWX");
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}
// function initializeReactGA() {
//     TagManager.initialize({gtmId:'GTM-TD6W6Q2'});
//   }

function App() {
  initializeReactGA();
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
