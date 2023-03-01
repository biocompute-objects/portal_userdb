import React, { useState } from "react";
import { Button, Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ReactJson from "react-json-view"
import { createDraftBco, updateDraftBco } from "../../slices/bcoSlice";

export const Preview = () => {
  const bco = useSelector(state => state.bco.data);
  const dispatch = useDispatch();
  const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;

  const saveDraft = () => {
    console.log("Preview", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(createDraftBco({bcoURL, bcoObject}))
  }

  const updateDraft = () => {
    console.log("Preview", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(updateDraftBco({bcoURL, bcoObject}))
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
                onClick={() =>  saveDraft()  }
              > Save as Draft </Button>
            </Grid>)
          }
          <Grid item xs>
            <Button
              type='submit'
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