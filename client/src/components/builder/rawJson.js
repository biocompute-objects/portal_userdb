import { Box, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBco, writingBco, updateModified } from "../../slices/bcoSlice";

export const RawJson = ({onSave}) => {
  const dispatch = useDispatch()
  dispatch(writingBco(true))
  const [writing, setWriting] = useState(false);
  const [bco, setBco] = useState(useSelector(state => state.bco.data))
  const [jsonErrors, setJsonErrors] = useState("");
  const rawContents = JSON.stringify(bco, null, 4);

  const setInput = (value) => {
    let holder = {};
    try {
      setWriting(true)
      dispatch(writingBco(true))
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
      <CardHeader 
        title={
          <span className="bold-title">
          RAW JSON View
          </span>
        }
        action={        
          <Button 
            disabled={jsonErrors !== "" || !writing}
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(updateBco(bco));
              dispatch(updateModified());
              onSave()
            }}
          > Next </Button>}
      />
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
      </CardContent>
    </Card>)
}