import React from "react";
import { Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ReactJson from "react-json-view"
import { updateBco } from "../../slices/bcoSlice";

import "../../styles.css";

export const TreeView = () => {
  const bco = useSelector(state => state.bco.data);
  // const [ bcodbInfo, setBcodbInfo ] = useState([])
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(updateBco(event.updated_src))
  };

  return (
    <Card>
      <Paper>
        <Typography variant='h4'> JSON Tree View</Typography>
      </Paper>
      <CardContent  align='left'>
        <ReactJson 
          src={bco}
          onEdit={handleChange}
          onDelete={handleChange}
          onAdd={handleChange}
        />
      </CardContent>

      <CardContent>
        <Grid container spacing={2}> 
          
          
          

        </Grid>
      </CardContent>
    </Card>
  )
}