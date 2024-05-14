// src/components/viewer/index.js

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ProvenanceView, UsabilityView, DescriptionView, ExtensionView,
  ExecutionView, ParametricView, IoView, ErrorView, RawJson, TreeView
} from "./cardViews";
import { getPubBco } from "../../slices/bcoSlice";
import "../../App.css"
import { useOutletContext } from "react-router-dom";
import biocomputing from "../../images/biocomputing.gif"
import ThirdBox from "../ThirdBox";

export default function BcoViewer () {
  // const biocomputing =  "../../images/biocomputing.gif";
  const {domain, setDomain} = useOutletContext()
  const dispatch = useDispatch();
  const bco = useSelector(state => state.bco.data)
  const bcoStatus =  useSelector(state => state.bco.status)
  const bcoError = useSelector(state => state.bco.error || "");

  function validURL(url) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    const object_id = global.window.location.search.substring(1)
    if (validURL(object_id) === true) {
      
      dispatch(getPubBco(object_id))
        .unwrap()
        .then(() => {
          // navigate("/viewer")
        })
        .catch(() => {
          console.log("Error");
        });
    }
  }, [])

  function TabPanel(props) {
    const { children, domain, index, ...other } = props;
    return (
      
      <div
        role="tabpanel"
        hidden={domain !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {domain === index && (
          <Container>
            {children}
          </Container>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    domain: PropTypes.any.isRequired,
  };

  return (  
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md>
          <Card>
            <CardContent>
              <Typography>
                  Object ID: {bco.object_id}
              </Typography>
              <Typography>
                  Spec Version: {bco.spec_version}
              </Typography>
              <Typography>
                  ETag: {bco.etag}
              </Typography>
            </CardContent>
          </Card>
          <br/>
          {
            bcoStatus === "idle" ?(
              <><TabPanel domain={domain} index={0}>
                <ProvenanceView />
              </TabPanel><TabPanel domain={domain} index={1}>
                <UsabilityView />
              </TabPanel><TabPanel domain={domain} index={2}>
                <DescriptionView />
              </TabPanel><TabPanel domain={domain} index={3}>
                <ExtensionView />
              </TabPanel><TabPanel domain={domain} index={4}>
                <ParametricView />
              </TabPanel><TabPanel domain={domain} index={5}>
                <IoView />
              </TabPanel><TabPanel domain={domain} index={6}>
                <ExecutionView />
              </TabPanel><TabPanel domain={domain} index={7}>
                <ErrorView />
              </TabPanel><TabPanel domain={domain} index={8}>
                <RawJson />
              </TabPanel><TabPanel domain={domain} index={9}>
                <TreeView />
              </TabPanel></>
            ) :( 
              <Card>
                {bcoStatus === "loading" ?(
                  <CardContent>
                    <ThirdBox
                      title="Loading"
                      image={biocomputing}
                      imageAlt="loading..."
                    />
                  </CardContent>
                ) :(
                  <CardContent>
                    <ThirdBox
                      title="Failed to get BCO"
                      content={JSON.stringify(bcoError)}
                    />
                  </CardContent>
                )}
              </Card>
            )}
        </Grid>
      </Grid>
    </>
  )
}