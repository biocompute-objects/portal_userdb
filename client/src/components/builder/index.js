import React, { useEffect } from "react";
import { DescriptionDomain } from "./descriptionDomain";
import { ProvenanceDomain } from "./provenanceDomain";
import { UsabilityDomain } from "./usabilityDomain";
import { ParametricDomain } from "./parametricDomain";
import { IODomain } from "./ioDomain";
import { ExecutionDomain } from "./executionDomain";
import { Preview } from "./preview";
import { ExtensionDomain } from "./extensionDomain";
import { RawJson } from "./rawJson";
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DataObjectIcon from "@mui/icons-material/DataObject";
import NotificationBox from "../NotificationBox";
import {
  ListItemText,
  Grid,
  Card,
  Paper,
  Container
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import "./sidebar.css";
import { getDraftBco } from "../../slices/bcoSlice";

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
    name: "Review & Publish"
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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const bcoStatus = useSelector(state => state.bco.error)
  
  function validURL(url) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

  useEffect(()=> {
    const object_id = global.window.location.search.substring(1)
    if (validURL(object_id) === true) {
      dispatch(getDraftBco(object_id))
        .unwrap()
        .then(() => {
          console.log(bcoStatus)
        })
        .catch(() => {
          console.log("Error");
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
              </div>
            </Grid>
            <Grid item xs={12} md>
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
                <Preview/>
              </TabPanel>
            </Grid>
          </Grid>
          <NotificationBox />
        </Paper>
      </div>
      <br/>
    </Container>
  )
}