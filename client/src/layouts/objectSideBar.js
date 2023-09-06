import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Grid, ListItem, ListItemText } from "@material-ui/core";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useDispatch, useSelector } from "react-redux";
import { updateDraftBco } from "../slices/bcoSlice";

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
  const dispatch = useDispatch()
  const bco = useSelector(state => state.bco.data);
  const bcoStatus = useSelector(state => state.bco.status);
  const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;
  const allowUpdate = (bcoStatus === "writing") ? (true) : (false)
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

  const updateDraft = () => {
    console.log("Update", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(updateDraftBco({bcoURL, bcoObject}))
  }

  return (
    <Card className='sidebar'>
      <Grid item>
        {
          (global.window.location.pathname === "/builder") ? (
            <><Button
              variant="contained"
              color="primary"
              onClick={updateDraft}
              disabled={allowUpdate}
            >Submit BCO</Button><div className="grow" /></>
          ) : (<></>)
        }
        <ListItem></ListItem>
        {data.map((item, index) => (
          <ListItem selected={ domain===index } domain={index} button key={index} onClick={() => {handleChange(index)}} {...a11yProps(index)}>
            <DataObjectIcon />{" "}<ListItemText primary={item.name} />
          </ListItem>
        ))}
      </Grid>
    </Card>
  )
}