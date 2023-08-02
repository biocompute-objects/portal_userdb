import { Box, Button, Card, CardContent, CardHeader, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBco } from "../../slices/bcoSlice";
export const RawJson = () => {
  const dispatch = useDispatch()
  const [bco, setBco] = useState(useSelector(state => state.bco.data))
  const [jsonErrors, setJsonErrors] = useState("");
  const rawContents = JSON.stringify(bco, null, 4);

  const setInput = (value) => {
    let holder = {};
    try {
      holder = JSON.parse(value);
      setJsonErrors("")
      console.log("All Good")
    } catch (e) {
      setJsonErrors(e)
      console.log("Caught: " + e.message)
    }
    setBco(holder);
  };

  return (
    <Card>
      <CardHeader title="Raw JSON View"/>
      <CardContent>
        {
          jsonErrors !== ""
            ? (<Box  style={{
              backgroundColor: "red"
            }}
            >{jsonErrors.message}</Box>)
            : (<Box></Box>)
        }
        <Box>
          <TextField
            color="primary"
            fullWidth
            id="outlined-multiline-static"
            multiline
            minRows={25}
            defaultValue={rawContents}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
          />
        </Box>
        <br/>
        <Button 
          disabled={jsonErrors !== ""}
          variant="contained"
          color="primary"
          onClick={() => dispatch(updateBco(bco))}
        > Submit Changes </Button>
      </CardContent>
    </Card>)
}