import * as React from "react";
import { useSelector, useDispatch} from "react-redux"
import { Card, CardContent, Typography, Grid, Button, Paper } from "@material-ui/core";


import { fetchBco, updateObjectId } from "../../slices/bcoSlice";

import axios from "axios";

import ReactJson from 'react-json-view'

export const Preview = () => {

  const bco = useSelector(state => state.bco.data);
  const dispatch = useDispatch();
  
  const USERS_URL = process.env.REACT_APP_USERDB_URL;
  const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;

  const [draftButton, setDraftButton] = React.useState("Save as Draft");
  const [currentObjId, setCurrentObjId] = React.useState("k");
  
  if (bco["object_id"] != undefined && bco["object_id"].length > 0) {
    setDraftButton("Update Draft");
  }

  let counter = 0;
  const saveDraft = async () => {
    console.log("Saving as Draft ....")
    console.log(" USERS_URL: " , USERS_URL)
    console.log(" BCODB_URL: " , BCODB_URL)
    counter +=1;
    console.log(" Counter: " , counter)
    const response = await axios.post(`${BCODB_URL}objects/drafts/create/`, {
        "POST_api_objects_draft_create": [
            {
              "prefix": "BCO",
              "owner_group": "bco_drafter",
              "schema": "IEEE",
              "contents": 
              bco
            }
          ]
      }, {
        headers: {
          "Authorization": `Token ${JSON.parse(localStorage.getItem("user"))["bcodbs"][0]["token"]}`,
          "Content-Type": "application/json"
        }
      });
    
    if (response.data && response.data[0]["status_code"] == "201" ) {
        counter +=1;
        console.log(" Counter: " , counter)
        console.log("aaa: ", response.data[0]["object_id"]);
        setCurrentObjId(response.data[0]["object_id"]);
        
    }
  };
  React.useEffect( () => {
    console.log("Use Effect: ", currentObjId);
    counter +=1;
    console.log(" Counter: " , counter);
    if (currentObjId.length >1 ) {
        //dispatch(fetchBco([currentObjId, JSON.parse(localStorage.getItem("user"))["bcodbs"][0]["token"]]))
        dispatch(updateObjectId(currentObjId));
    }
  }, [currentObjId]);

  const publish = () => {
    console.log("Publishing .....")
  };
  
  return (
    <Card>
      <Paper>
        <Typography variant='h4'> Preview</Typography>
      </Paper>
      <CardContent  align='left'>
            { <ReactJson src={bco}/> }
      </CardContent>
      <CardContent>
        <Grid container spacing={2}> 
            <Grid item xs>
                <Button type='submit' variant="contained" color="primary" onClick={() =>  saveDraft()  }> {draftButton} </Button>
            </Grid>
            <Grid item xs>
                <Button type='submit' variant="contained" color="secondary" onClick={() =>  publish()  }> Publish </Button>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
     
  )
}