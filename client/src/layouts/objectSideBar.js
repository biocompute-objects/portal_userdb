import React from "react";
import { Button, Card, Grid, ListItem, ListItemText } from "@mui/material";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateDraftBco, createDraftBco, publishDraftBco } from "../slices/bcoSlice";
import "../App.css"

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
  const navigate = useNavigate();
  const bco = useSelector(state => state.bco.data);
  const prefix = useSelector(state => state.bco.prefix);
  const bcoStatus = useSelector(state => state.bco.status);
  const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;
  const allowUpdate = (bcoStatus === "writing") ? (true) : (false)
  const allowPublish = (bcoStatus === "valid") ? (true) : (false)

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (newValue) => {
    setDomain(newValue);
  };  

  const publishDraft = () => {
    const bcoURL = BCODB_URL;
    const bcoObject = bco;
    dispatch(publishDraftBco({bcoURL, bcoObject, prefix}))
      .unwrap()
      .then((response) => {
        navigate(`/viewer?${response[0].identifier}`)
      })
      .catch((error) => {
        console.log(error)
      })

  };

  const updateDraft = () => {
    console.log("Update", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    if (bco.object_id === "") {
      dispatch(createDraftBco({bcoURL, bcoObject, prefix}))
    } else {
      dispatch(updateDraftBco({bcoURL, bcoObject}))
    }
  }

  return (
    <Card className='object-sidebar'>
      <Grid item>
        {data.map((item, index) => (
          <ListItem
            className=""
            selected={ domain===index }
            domain={index}
            button 
            key={index}
            onClick={() => {handleChange(index)}} {...a11yProps(index)}
          >
            <DataObjectIcon />{" "}<ListItemText primary={item.name} />
          </ListItem>
        ))}
        
      </Grid>
      <Grid item className='object-buttons'>
        {
          (global.window.location.pathname === "/builder" && prefix !== null) ? (
            <div >
              <Button
                variant="contained"
                color="primary"
                onClick={updateDraft}
                disabled={allowUpdate}
              >Save Draft BCO</Button>
              <div>
                <br/>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={publishDraft}
                disabled={!allowPublish}
              >Publish BCO</Button>
              
            </div>
          ) : (<></>)
        }
      </Grid>
    </Card>
  )
}