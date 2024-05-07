import React from "react";
import { Button, Card, CardContent, CardHeader, Grid, Paper, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ReactJson from "react-json-view"
import { updateBco, updateModified } from "../../slices/bcoSlice";

export const TreeView = ({onSave}) => {
  const bco = useSelector(state => state.bco.data);
  // const [ bcodbInfo, setBcodbInfo ] = useState([])
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(updateBco(event.updated_src))
  };

  return (
    <Card>
      <CardHeader
        title={
          <span className="bold-title">
          JSON Tree View
          </span>}
        action={
          <Button 
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(updateBco(bco));
              dispatch(updateModified());
              onSave()
            }}
          > Next </Button>}
      />
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