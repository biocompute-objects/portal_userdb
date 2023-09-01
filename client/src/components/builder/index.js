import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { DescriptionDomain } from "./descriptionDomain";
import { ProvenanceDomain } from "./provenanceDomain";
import { UsabilityDomain } from "./usabilityDomain";
import { ParametricDomain } from "./parametricDomain";
import { IODomain } from "./ioDomain";
import { ExecutionDomain } from "./executionDomain";
import { TreeView } from "./treeView";
import { ExtensionDomain } from "./extensionDomain";
import { RawJson } from "./rawJson";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

export default function BuilderColorCode () {
  const bco = useSelector(state => state.bco.data);
  const {domain, setDomain} = useOutletContext()
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

  const onSave = () => {
    console.log(domain)
    setDomain(domain+1)
  }

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
            <ProvenanceDomain onSave={onSave}/>
          </TabPanel>
          <TabPanel domain={domain} index={1}>
            <UsabilityDomain onSave={onSave}/>
          </TabPanel>
          <TabPanel domain={domain} index={2}>
            <DescriptionDomain onSave={onSave}/>
          </TabPanel>
          <TabPanel domain={domain} index={3}>
            <ExtensionDomain onSave={onSave}/>
          </TabPanel>
          <TabPanel domain={domain} index={4}>
            <ParametricDomain onSave={onSave}/>
          </TabPanel>
          <TabPanel domain={domain} index={5}>
            <IODomain onSave={onSave}/>
          </TabPanel>
          <TabPanel domain={domain} index={6}>
            <ExecutionDomain onSave={onSave}/>
          </TabPanel>
          <TabPanel domain={domain} index={8}>
            <RawJson onSave={onSave}/>
          </TabPanel>
          <TabPanel domain={domain} index={9}>
            <TreeView onSave={onSave}/>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}