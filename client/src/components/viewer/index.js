// src/components/viewer/index.js

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ProvenanceView, UsabilityView, DescriptionView, ExtensionView,
  ExecutionView, ParametricView, IoView, ErrorView, RawJson, TreeView
} from "./cardViews";
import { getPubBco } from "../../slices/bcoSlice";
import "../../App.css"
import { useOutletContext } from "react-router-dom";

export default function BcoViewer () {
  const {domain, setDomain} = useOutletContext()
  const dispatch = useDispatch();
  const bco = useSelector(state => state.bco.data)
  console.log(domain)
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
    console.log("index", object_id)
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
          <TabPanel domain={domain} index={0}>
            <ProvenanceView/>
          </TabPanel>
          <TabPanel domain={domain} index={1}>
            <UsabilityView/>
          </TabPanel>
          <TabPanel domain={domain} index={2}>
            <DescriptionView/>
          </TabPanel>
          <TabPanel domain={domain} index={3}>
            <ExtensionView/>
          </TabPanel>
          <TabPanel domain={domain} index={4}>
            <ParametricView/>
          </TabPanel>
          <TabPanel domain={domain} index={5}>
            <IoView/>
          </TabPanel>
          <TabPanel domain={domain} index={6}>
            <ExecutionView/>
          </TabPanel>
          <TabPanel domain={domain} index={7}>
            <ErrorView/>
          </TabPanel>
          <TabPanel domain={domain} index={8}>
            <RawJson/>
          </TabPanel>
          <TabPanel domain={domain} index={9}>
            <TreeView/>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}