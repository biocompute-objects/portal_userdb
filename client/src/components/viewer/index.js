// src/components/viewer/index.js

import React, { useEffect, useState } from "react";
import {
  Button, Card, CardActions, CardHeader, CardContent, Collapse, Container, Grid, ListItem, ListItemText, Paper,
  Typography
} from "@material-ui/core";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ProvenanceView, UsabilityView, DescriptionView, ExtensionView,
  ExecutionView, ParametricView, IoView, ErrorView
} from "./cardViews";
import { FileUpload, handleDownloadClick } from "../fileHandeling";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getPubBco } from "../../slices/bcoSlice";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const data = [
  {
    name: "Provenance Domain",
    value: "provenance_domain"
  },
  {
    name: "Usability Domain",
    value: "usability_domain"
  },
  {
    name: "Description Domain",
    value: "description_domain"
  },
  {
    name: "Extension Domain (Optional)",
    value: "extension_domain"
  },
  {
    name: "Parametric Domain",
    value: "parametric_domain"
  },
  {
    name: "IO Domain",
    value: "io_domain"
  },
  {
    name: "Execution Domain",
    value: "execution_domain"
  },
  {
    name: "Error Domain",
    value: "error_domain"
  }
];

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

export default function BcoViewer () {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const bco = useSelector(state => state.bco.data)
  const [expanded, setExpanded] = useState(false);
  const jsonData = useSelector((state) => state.bco.data);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
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
    value: PropTypes.any.isRequired,
  };

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
  return (
    
    <Container>
      <Grid container spacing={2}>
        <Card className='sidebar'>
          <Grid item>
            {data.map((item, index) => (
              <ListItem selected={ value===index } value={index} button key={index} onClick={() => {handleChange(index)}} {...a11yProps(index)}>
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
            </Collapse>
          </Grid>
        </Card>
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
          <TabPanel value={value} index={0}>
            <ProvenanceView/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UsabilityView/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DescriptionView/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ExtensionView/>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ParametricView/>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <IoView/>
          </TabPanel>
          <TabPanel value={value} index={6}>
            <ExecutionView/>
          </TabPanel>
          <TabPanel value={value} index={7}>
            <ErrorView/>
          </TabPanel>
        </Grid>
      </Grid>
    </Container>

  )
}