import React, { useState } from "react";
import { DescriptionDomain } from "./descriptionDomain";
import { ProvenanceDomain } from "./provenanceDomain";
import { UsabilityDomain } from "./usabilityDomain";
import { ParametricDomain } from "./parametricDomain";
import { IODomain } from "./ioDomain";
import { ExtensionDomain } from "./extensionDomain";
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DataObjectIcon from "@mui/icons-material/DataObject";
import {
  ListItemText,
  Grid,
  Card,
  Paper,
  TextField,
  Container
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import "./sidebar.css";
import { fetchBco } from "../../slices/bcoSlice";

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
  const [bco, setBco] = useState("https://biocomputeobject.org/BCO_000064/DRAFT")
  const dispatch = useDispatch();
  const state = useSelector(state=>state)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  console.log(state)
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const token = "38b71c708c37f85dbd38e8d295c7c548fbe1bdc0"

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
          <Grid container spacing={2}>
            <Grid item>
              <div className='sidebar'>
                {data.map((item, index) => (
                  <ListItem selected={value === index} value={index} button key={index} onClick={() => {handleChange(index)}} {...a11yProps(index)}>          
                    <DataObjectIcon />{" "}<ListItemText primary={item.name} />
                  </ListItem>
                ))}
                    
              </div>
              <div className='object'>
                <TextField
                  value={bco}
                  onChange={(event) => setBco(event.target.value)}
                  placeholder="https://biocomputeobject.org/BCO_000064/DRAFT"
                />
                <button onClick={() => dispatch(fetchBco([bco, token]))}>retrieve</button>
              </div>
            </Grid>
            <Grid item xs={12} md>
                                
              <TabPanel value={value} index={0}>
                <ProvenanceDomain/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UsabilityDomain/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <DescriptionDomain/>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <ParametricDomain/>
              </TabPanel>
              <TabPanel value={value} index={5}>
                <IODomain/>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ExtensionDomain/>
              </TabPanel>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <br/>
      {/* <button>
                Submit
            </button> */}
      <pre align='left'>
        <code>
          {/* {JSON.stringify(state['bco']['data']['extension_domain'],undefined, 2)} */}
        </code>
      </pre>
    </Container>
  )
}