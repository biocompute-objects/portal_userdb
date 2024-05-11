import React, { useEffect } from "react";
import { 
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography

} from "@mui/material";
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
import NotificationBox from "../NotificationBox";
import biocomputing from "../../images/biocomputing.gif"
import ThirdBox from "../ThirdBox";

import {
  getDraftBco,
  getTempDraftBco,
} from "../../slices/bcoSlice";

export default function BuilderColorCode () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bco = useSelector(state => state.bco.data);
  const bcoStatus = useSelector(state => state.bco.status);
  const bcoError = useSelector(state => state.bco.error);
  const {domain, setDomain} = useOutletContext()
  
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
  const isUUID = (str) => {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(str);
  };

  function validURL(url) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }
  
  useEffect(()=> {
    const queryString = global.window.location.search.substring(1)
    
    if (validURL(queryString) === true) {
      dispatch(getDraftBco(queryString))
    }
    if (isUUID(queryString)) {
      console.log("UUID", queryString);
      dispatch(getTempDraftBco(queryString))
    }
  }, [])

  useEffect(() => {
    if (validURL(bco["object_id"]) === true && bco["object_id"].indexOf("?") === -1) {
      navigate(`/builder?${bco["object_id"]}`);
    }
  }, [bco])

  return (  

    <Grid container spacing={2}>
      <NotificationBox />
      <Stack className="object-contents" direction="column">
        <Card className="object-doamin" spacing={2}>
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
                  <ReactJson src={bcoError}/>
                </CardContent>
              </>)
              : (<></>)
          }
        </Card>
        <br/>
        {
          bcoStatus === "idle" ?(<>
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
      </Stack>
    </Grid>
  )
}