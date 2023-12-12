// src/layouts/MainLayout/index.js

import React from "react";
import { Button } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import ObjectNavBar from "./ObjectNavBar";
import ObjectSideBar from "./objectSideBar";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { updateDraftBco, createDraftBco, publishDraftBco } from "../slices/bcoSlice";
import SaveDraftButton from "./SaveDraftButton";

export default function ObjectLayout ()  {
  const [domain, setDomain] = React.useState(0);
  const dispatch = useDispatch()
  const bco = useSelector(state => state.bco.data);
  const prefix = useSelector(state => state.bco.prefix);
  const bcoStatus = useSelector(state => state.bco.status);
  const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;
  const allowUpdate = (bcoStatus === "writing") ? (true) : (false)
  const allowPublish = (bcoStatus === "valid") ? (true) : (false)

  const publishDraft = () => {
    const bcoURL = BCODB_URL;
    const bcoObject = bco;
    dispatch(publishDraftBco({bcoURL, bcoObject, prefix}));
  };

  const updateDraft = () => {
    console.log("Update", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    if (bco.object_id === "") {
      dispatch(createDraftBco({bcoURL, bcoObject, prefix}))
    } else {
      dispatch(updateDraftBco({bcoURL, bcoObject}))
    }
  }

  return (
    <div className="outlet-root">
      <ObjectNavBar />
      <div className="outlet-container">
        <div className="sidebar-wrapper">
          <div className="sidebar-content">
            <ObjectSideBar
              className="object-sidebar"
              domain={domain}
              setDomain={setDomain}
            />
          </div>
          <div className="button-container">
            <div className="button-wrapper">
              <SaveDraftButton updateDraft={updateDraft} allowUpdate={allowUpdate} />
              <Button
                variant="contained"
                color="primary"
                onClick={publishDraft}
                disabled={!allowPublish}
              >
                Publish BCO
              </Button>
            </div>
          </div>
        </div>
        <div className="outlet-content">
          <Outlet context={{ domain, setDomain }} />
        </div>
      </div>
    </div>
  );
}

