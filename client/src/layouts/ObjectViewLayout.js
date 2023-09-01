// src/layouts/MainLayout/index.js

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./ObjectNavBar";
import "../App.css";

export default function ObjectLayout ()  {

  return (
    <div className="outlet-root">
      <div className="outlet-container">
        <div className="outlet-content">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
