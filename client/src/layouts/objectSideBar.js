import React from "react";
import PropTypes from "prop-types";
import { Card, Container, Grid, ListItem, ListItemText } from "@material-ui/core";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { ExecutionDomain } from "../components/builder/executionDomain";

const data = [
  {
    name: "Provenance Domain",
    domain: "provenance_domain"
  },
  {
    name: "Usability Domain",
    domain: "usability_domain"
  },
  {
    name: "Description Domain",
    domain: "description_domain"
  },
  {
    name: "Extension Domain (Optional)",
    domain: "extension_domain"
  },
  {
    name: "Parametric Domain",
    domain: "parametric_domain"
  },
  {
    name: "IO Domain",
    domain: "io_domain"
  },
  {
    name: "Execution Domain",
    domain: "execution_domain"
  },
  {
    name: "Error Domain",
    domain: "error_domain"
  },
  {
    name: "Raw JSON View",
    domain: "raw_json"
  },
  {
    name: "Tree View",
    domain: "tree_view"
  }
];

export default function ObjectSideBar ({domain, setDomain}) {
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
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (newValue) => {
    setDomain(newValue);
  };  

  return (
    <Card className='sidebar'>
      <Grid item>
        {data.map((item, index) => (
          <ListItem selected={ domain===index } domain={index} button key={index} onClick={() => {handleChange(index)}} {...a11yProps(index)}>
            <DataObjectIcon />{" "}<ListItemText primary={item.name} />
          </ListItem>
        ))}
      </Grid>
    </Card>
  )
}