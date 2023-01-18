// src/components/viewer/index.js

import React from "react";
import {
  Card, CardContent, Container, Grid, ListItem, ListItemText, Paper,
  Typography 
} from "@material-ui/core";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ProvenanceView, UsabilityView, DescriptionView, ExtensionView,
  ExecutionView, ParametricView, IoView
} from "./cardViews";

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
  }
];


export default function BcoViewer () {
  const [value, setValue] = React.useState(0);
  const bco = useSelector(state => state.bco.data)

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(bco[data[value].value])
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

  return (
    <Container>
      <Paper>
        <Grid container spacing={2}>
          <Grid item>
            {data.map((item, index) => (
              <ListItem selected={ value===index } value={index} button key={index} onClick={() => {handleChange(index)}} {...a11yProps(index)}>
                <DataObjectIcon />{" "}<ListItemText primary={item.name} />
              </ListItem>
            ))}
          </Grid>
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
          </Grid>
          <Grid item>
            <pre >
              <code>
                {JSON.stringify(bco[data[value].value],undefined, 2)}
              </code>
            </pre>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}