// src/layouts/MainLayout/index.js

import React from "react";
import { Outlet } from "react-router-dom";
import ObjectNavBar from "./ObjectNavBar";
import ObjectSideBar from "./objectSideBar";
import "../App.css";
import NotificationBox from "../components/NotificationBox";

export default function ObjectLayout ()  {
  const [domain, setDomain] = React.useState(0);
  return (
    <div className="outlet-root">
      <ObjectNavBar />
      <NotificationBox/>
      <div className="outlet-container">
        <ObjectSideBar
          className="object-sidebar"
          domain={domain}
          setDomain={setDomain}
        />
        <div className="outlet-content">
          <Outlet context={{domain, setDomain}}/>
        </div>
      </div>
    </div>
  );
}
