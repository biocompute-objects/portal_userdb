import * as React from "react";
import { useSelector} from "react-redux"
import { Card, CardContent, Typography, Grid, Button, Paper } from "@material-ui/core";
import { addExtension, addExtensionDomain, deleteExtensionDomain } from "../../slices/bcoSlice"

import ReactJson from 'react-json-view'

export const Preview = () => {

  const bco = useSelector(state => state.bco.data);

  const saveDraft = () => {
    console.log("Saving as Draft ....")
  };
  const publish = () => {
    console.log("Publishing .....")
  };
  
  return (
    <Card>
      <Paper>
        <Typography variant='h4'> Preview</Typography>
      </Paper>
      <CardContent  align='left'>
            <ReactJson src={bco}/>
      </CardContent>
      <CardContent>
        <Grid container spacing={2}> 
            <Grid item xs>
                <Button type='submit' variant="contained" color="primary" onClick={() => { saveDraft() } }> Save As Draft </Button>
            </Grid>
            <Grid item xs>
                <Button type='submit' variant="contained" color="secondary" onClick={() => { publish() } }> Publish </Button>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
     
  )
}