import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view"
import { DescriptionDomain } from "./descriptionDomain";
import { ProvenanceDomain } from "./provenanceDomain";
import { UsabilityDomain } from "./usabilityDomain";
import { ParametricDomain } from "./parametricDomain";
import { IODomain } from "./ioDomain";
import { ExecutionDomain } from "./executionDomain";
import { TreeView } from "./treeView";
import { ExtensionDomain } from "./extensionDomain";
import { RawJson } from "./rawJson";
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DataObjectIcon from "@mui/icons-material/DataObject";
import NotificationBox from "../NotificationBox";
import { FileUpload, handleDownloadClick } from "../fileHandeling";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  Grid,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import "./sidebar.css";
import { 
  createDraftBco,
  updateDraftBco,
  getDraftBco,
  publishDraftBco,
  validateBco,
  deriveBco,
  setPrefix,
  updateETag,
} from "../../slices/bcoSlice";
import { prefixList } from "../../slices/prefixSlice";
import objectHash from "object-hash";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto"
  },
}));

const data = [
  {
    name: "Provenance Domain"
  },
  {
    name: "Usability Domain"
  },
  {
    name: "Description Domain"
  },
  {
    name: "Extension Domain (Optional)"
  },
  {
    name: "Parametric Domain"
  },
  {
    name: "IO Domain"
  },
  {
    name: "Execution Domain"
  },
  {
    name: "Raw JSON View"
  },
  {
    name: "Tree View"
  }
];

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "SteelBlue",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "darkgray",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "lightgrey",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    }
  },
  selected: {}
})(MuiListItem);


export const  BuilderColorCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bco = useSelector(state => state.bco.data);
  const prefix = useSelector(state => state.bco.prefix);
  const bcoErrors = useSelector(state => state.bco.error);
  const jsonData = useSelector((state) => state.bco.data);
  const bcoStatus = useSelector(state => state.bco.status);
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;
  const [expanded, setExpanded] = useState(false);
  const [bcodb, setBcodb] = useState("");

  let isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  
  const bcodbs = (isLoggedIn
    ? useSelector((state) => state.account.user.bcodbs)
    : []);

  const prefixStatus = useSelector((state) => state.prefix.status)

  const prefixes = (isLoggedIn
    ? useSelector((state) => state.prefix.data)
    : ["BCO"]);

  const hash = (bco) => objectHash(bco,{ excludeKeys: function(key) {
    if (( key === "object_id" ) || (key === "etag") || (key === "spec_version")) {
      return true;
    }
    return false;
  }
  })

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const createDraft = () => {
    const bcoURL = bcodb
    const bcoObject = bco
    dispatch(createDraftBco({bcoURL, bcoObject, prefix}))
  }
  
  const validate = () => {
    console.log("Validate", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(validateBco({bcoURL, bcoObject}))
  }

  const updateDraft = () => {
    console.log("Update", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(updateDraftBco({bcoURL, bcoObject}))
  }

  const publish = () => {
    console.log("Publish", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(publishDraftBco({prefix, bcoURL, bcoObject}))
  }

  function validURL(url) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    if (validURL(bco["object_id"]) === true) {
      navigate(`/builder?${bco["object_id"]}`);
    }
  }, [bco])

  useEffect(()=> {
    const etag = hash(bco)
    dispatch(updateETag(etag))
    const object_id = global.window.location.search.substring(1)
    if (validURL(object_id) === true) {
      dispatch(getDraftBco(object_id))
        .unwrap()
        .then(() => {
          console.log(bcoStatus)
        })
        .catch((error) => {
          console.log("Error", error);
          global.window.close()
        });
    }

  }, [])

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onSave = () => {
    console.log(value)
    setValue(value+1)
  }

  const  handleDerive = (jsonData) => {
    navigate("/builder")
    dispatch(deriveBco(jsonData))
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Card>
            {children}
          </Card>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
    
  return (
    <Container>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <NotificationBox />
          <Grid container spacing={2}>
            <Card>
              <Grid item>
                <div className='sidebar'>
                  {data.map((item, index) => (
                    <ListItem 
                      selected={value === index}
                      value={index}
                      button key={index}
                      onClick={() => {handleChange(index)}} 
                      {...a11yProps(index)}
                    >          
                      <DataObjectIcon />{" "}<ListItemText primary={item.name} />
                    </ListItem>
                  ))}
                  <br/>
                  <CardActions disableSpacing>
                    <CardHeader title="Tools"/>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    { ( bco["object_id"] !== "")
                      ? (<Grid item xs>
                        <Button 
                          type='submit'
                          variant="contained"
                          color="primary"
                          onClick={() =>  updateDraft()  }
                        > Update Draft </Button>
                      </Grid>)
                      : (<Grid item xs>
                        <Formik
                          initialValues={{
                            database: ""
                          }}
                          onSubmit={(values) => {
                            dispatch(prefixList(values.database))
                            setBcodb(values.database)
                            console.log(values.database)                        
                          }}
                        >
                          {({values}) => ( 
                            <Form>
                              <Typography>
                            Select BCODB
                              </Typography>
                              <Field as='select' name='database'>
                                <option value="" key=""></option>
                                {bcodbs.map((database, index) => (
                                  <option value={database.public_hostname} key={index}>{database.hostname}</option>
                                ))
                                }
                              </Field>
                              <br/>
                              <br/>
                              <Button
                                id="bcodb"
                                type='submit'
                                variant="outlined"
                                color="primary"
                              >Get Prefixes</Button>
                            </Form>
                          )}
                        </Formik>
                        <br/>
                        {
                          prefixStatus !== "fulfilled"
                            ? (<div>empty</div>)
                            : (<Formik
                              initialValues={{
                                prefix: ""
                              }}
                              onSubmit={(prefixValues) => {
                                dispatch(setPrefix(prefixValues.prefix))                  
                              }}
                            >
                              {({prefixValues}) => (
                                <Form>
                                  <Typography>
                                Select Prefix
                                  </Typography>
                                  <Field as='select' name='prefix'>
                                    <option value="" key="">  </option>
                                    {prefixes.map((prefix, index) => (
                                      <option value={prefix} key={index}>{prefix}</option>
                                    ))
                                    }
                                  </Field>
                                  <br/>
                                  <br/>
                                  <Button
                                    id="prefix"
                                    type='submit'
                                    variant="outlined"
                                    color="primary"
                                  >Save Prefix</Button>
                                </Form>
                              )}
                            </Formik>)
                        }
                        <br/>
                        <Button
                          type='submit'
                          variant="contained"
                          disabled={prefix === null}
                          color="primary"
                          onClick={() =>  createDraft()  }
                        > Save as Draft </Button>
                      </Grid>)
                    }
                    <br/>
                    <Grid item xs>
                      <Button
                        type='submit'
                        disabled={bcoStatus !== "valid"}
                        variant="contained"
                        color="secondary"
                        onClick={() =>  publish()  }
                      > Publish </Button>
                    </Grid>
                    <br/>
                    <Grid item xs>
                      <Button
                        id="validate"
                        type='submit'
                        variant="contained"
                        color="primary"
                        onClick={() => validate()}
                      > Validate BCO</Button>
                    </Grid>
                    <br/>
                    <Grid item>
                      <Button 
                        className="download-button"
                        type='submit'
                        variant="contained"
                        color="primary"
                        onClick={() => {handleDownloadClick(jsonData)}}
                      > Download BCO</Button>
                    </Grid>
                    <br/>
                    <Grid item className="upload-grid">
                      <label htmlFor="bcoUpload">Upload a BCO</label>
                      <FileUpload />
                    </Grid>
                    <br/>
                    <Grid item>
                      <Button 
                        className="derive-button"
                        type='submit'
                        variant="contained"
                        color="primary"
                        onClick={() => {handleDerive(jsonData)}}
                      > Derive BCO </Button>
                    </Grid>
                  </Collapse>
                </div>
              </Grid>
            </Card>
            <Grid item xs={8} md>
              {
                bcoStatus === "invalid"
                  ? (
                    <Card>
                      <CardHeader title="BCO Errors"/>
                      <CardContent  align='left'>
                        <ReactJson src={bcoErrors}/>
                      </CardContent>
                    </Card>
                  )
                  : (<></>)
              }
              <TabPanel value={value} index={0}>
                <ProvenanceDomain onSave={onSave} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UsabilityDomain onSave={onSave} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <DescriptionDomain onSave={onSave} />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <ParametricDomain onSave={onSave} />
              </TabPanel>
              <TabPanel value={value} index={5}>
                <IODomain onSave={onSave} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ExtensionDomain onSave={onSave} />
              </TabPanel>
              <TabPanel value={value} index={6}>
                <ExecutionDomain onSave={onSave} />
              </TabPanel>
              <TabPanel value={value} index={7}>
                <RawJson onSave={onSave}/>
              </TabPanel>
              <TabPanel value={value} index={8}>
                <TreeView/>
              </TabPanel>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <br/>
    </Container>
  )
}