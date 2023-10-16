import * as React from "react";
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, TextField, Typography, Grid, Button, CardHeader } from "@material-ui/core";
import { addExtensionDomain, getExtension, deleteExtensionDomain } from "../../slices/bcoSlice"
import { Extension } from "./extension";
import "../../App.css";

export const  ExtensionDomain = ({onSave}) => {
  const dispatch = useDispatch();
  const extensionDomain = useSelector(state => state.bco.data.extension_domain)
  const [newSchema, setNewSchema] = React.useState("")

  const errorSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "message": {
        "type": "string"
      }
    },
    "required": [
      "message"
    ]
  }

  const addExtension = async () => {
    dispatch(getExtension({newSchema}))
      .unwrap()
      .then((
        dispatch(addExtensionDomain({extension_schema: newSchema}))
      ))
      .catch((error) => {
        console.log("ERROR: ", error)
      });
    setNewSchema("");
  };

  const removeRows = (index) => {
    dispatch(deleteExtensionDomain({index}))
  };

  return (
    <Card className="object-domain">
      <CardHeader
        title="Extension Domain"
        action={
          <Button
            onClick={() => onSave()}
            variant="contained"
            color="primary"
            disableElevation
          >Next</Button>}
      />
      <CardContent>
        <Grid>
          <Typography>
              Top add an extension enter a valid URL for the extension schema
              below and hit the &apos;ADD EXTENSION&apos; button.
          </Typography>
          <TextField
            fullWidth
            onChange={(e) => setNewSchema(e.target.value)}
            value={newSchema}
          />
          <Button
            variant="contained"
            disabled={!newSchema}
            onClick={() => addExtension()}
          >
              Add Extension
          </Button>
        </Grid>
      </CardContent>
      { (extensionDomain.length > 0)
        ? ( extensionDomain.map((extension, index) => {
          return (
            <CardContent key={index}>
              <Extension
                extension={extension}
                schemaUrl={extension.extension_schema}
                index={index}
                allExtensions={extensionDomain}
              />
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                fullWidth
                onClick={() => removeRows(index)}
              >
                Remove
              </Button>
            </CardContent>)
        }))
        : (<CardContent></CardContent>)
      }
    </Card>
  )
}