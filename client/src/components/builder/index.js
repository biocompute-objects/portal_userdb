import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, Container, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import ReactJson from "react-json-view"
import { DescriptionDomain } from "./descriptionDomain";
import { ProvenanceDomain } from "./provenanceDomain";
import { UsabilityDomain } from "./usabilityDomain";
import { ParametricDomain } from "./parametricDomain";
import { IODomain } from "./ioDomain";
import { ExecutionDomain } from "./executionDomain";
import { ErrorDomain } from "./errorDomain";
import { TreeView } from "./treeView";
import { ExtensionDomain } from "./extensionDomain";
import { RawJson } from "./rawJson";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import objectHash from "object-hash";
import NotificationBox from "../NotificationBox";

import {
  getDraftBco,
  updateETag,
} from "../../slices/bcoSlice";

export default function BuilderColorCode () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bco = useSelector(state => state.bco.data);
  const bcoError = useSelector(state => state.bco.error);
  const {domain, setDomain} = useOutletContext()
  const hash = (bco) => objectHash(bco,{ excludeKeys: function(key) {
    if (( key === "object_id" ) || (key === "etag") || (key === "spec_version")) {
      return true;
    }
    return false;
  }
  })

  function TabPanel(props) {
    const { children, domain, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={domain !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
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
    if (domain === 9) {
      setDomain(0)
    } else {
      setDomain(domain+1)
    }
  }

  function validURL(url) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }
  
  useEffect(()=> {
    const etag = hash(bco)
    dispatch(updateETag(etag))
    const object_id = global.window.location.search.substring(1)
    if (validURL(object_id) === true) {
      dispatch(getDraftBco(object_id))
        .unwrap()
        .then(() => {
          // console.log(bcoStatus)
        })
        .catch((error) => {
          console.log("Error", error);
          global.window.close()
        });
    }

  }, [])
  
  useEffect(() => {
    if (validURL(bco["object_id"]) === true) {
      navigate(`/builder?${bco["object_id"]}`);
    }
  }, [bco])

  return (  

    <Grid container spacing={2}>
      <NotificationBox />
      <Grid item className="object-contents">
        <Card spacing={2}>
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
        <Card>
          {
            bcoError !== null
              ? (<>
                <CardHeader title="BCO Errors"/>
                <CardContent>
                  <ReactJson src={bcoError[0]}/>
                </CardContent>
              </>)
              : (<></>)
          }
        </Card>
        <br/>
        <TabPanel  domain={domain} index={0}>
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
        <TabPanel domain={domain} index={7}>
          <ErrorDomain onSave={onSave}/>
        </TabPanel>
        <TabPanel domain={domain} index={8}>
          <RawJson onSave={onSave}/>
        </TabPanel>
        <TabPanel domain={domain} index={9}>
          <TreeView onSave={onSave}/>
        </TabPanel>
      </Grid>
    </Grid>
  )
}