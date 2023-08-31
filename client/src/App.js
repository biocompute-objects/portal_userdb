
import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ReactGA from "react-ga4";

function initializeReactGA(){
  ReactGA.initialize("G-RP8P4D7VWX");
  ReactGA.send({ hitType: "pageview", page: global.window.location.pathname });
}

function App() {
  initializeReactGA();
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
