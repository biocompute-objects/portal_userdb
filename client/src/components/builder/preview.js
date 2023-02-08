import * as React from "react";
import { useSelector} from "react-redux"
import { Card, CardContent, TextField, Typography, Grid, Button, Paper, Select, MenuItem, InputLabel} from "@material-ui/core";
import { addExtension, addExtensionDomain, deleteExtensionDomain } from "../../slices/bcoSlice"

import ReactJson from 'react-json-view'

export const Preview = () => {

  const bco = useSelector(state => state.bco.data);
  
  return (
    <Card>
      <Paper>
        <Typography variant='h4'> Preview</Typography>
      </Paper>
      <CardContent  align='left'>
       
        
            <ReactJson src={bco}/>
        
        </CardContent>
    </Card>
     
  )
}