
import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ReactGA from "react-ga4";

function initializeReactGA() {
  const version = new Date().toISOString(); // Use the current timestamp as the version
  const gaTrackingId = "G-RP8P4D7VWX";

  ReactGA.initialize(gaTrackingId, { gaOptions: { storage: "none" } });
  ReactGA.send({
    hitType: "pageview",
    page: global.window.location.pathname,
  });

  const script = global.document.createElement("script");
  script.src = `https://www.google-analytics.com/ga.js?v=${version}`;
  script.async = true;
  global.document.head.appendChild(script);
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
