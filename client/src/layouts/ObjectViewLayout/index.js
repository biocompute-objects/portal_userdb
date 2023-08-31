// src/layouts/MainLayout/index.js

import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./ObjectNavBar";
import "../../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%"
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden"
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto"
  }
}));

export default function ObjectLayout ()  {

  return (
    <div className="viewer-root">
      <div className="viewer-container">
        <div className="viewer-content">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
