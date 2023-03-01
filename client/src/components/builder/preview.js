import React, { useState } from "react";
import { Button, Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ReactJson from "react-json-view"
import { createDraftBco, updateDraftBco, publishDraftBco, validateBco } from "../../slices/bcoSlice";

export const Preview = () => {
  const bco = useSelector(state => state.bco.data);
  const valid = useSelector(state => state.bco.status);
  const dispatch = useDispatch();
  const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;

  const createDraft = () => {
    console.log("create", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(createDraftBco({bcoURL, bcoObject}))
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
    dispatch(publishDraftBco({bcoURL, bcoObject}))
  }

  const validate = () => {
    console.log("Validate", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(validateBco({bcoURL, bcoObject}))
    
  }

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
          { ( bco["object_id"].length > 1)
            ? (<Grid item xs>
              <Button 
                type='submit'
                variant="contained"
                color="primary"
                onClick={() =>  updateDraft()  }
              > Update Draft </Button>
            </Grid>)
            : (<Grid item xs>
              <Button
                type='submit'
                variant="contained"
                color="primary"
                onClick={() =>  createDraft()  }
              > Save as Draft </Button>
            </Grid>)
          }
          <Grid item xs>
            <Button
              id="validate"
              type='submit'
              variant="contained"
              color="primary"
              onClick={() => validate()}
            > Validate BCO</Button>
          </Grid>
          <Grid item xs>
            <Button
              type='submit'
              disabled={valid !== true}
              variant="contained"
              color="secondary"
              onClick={() =>  publish()  }
            > Publish </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}