import * as React from "react";
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, TextField, Typography, Grid, Button, Paper, CardHeader, IconButton } from "@material-ui/core";
import { addExtensionDomain, getExtension, deleteExtensionDomain, updateModified } from "../../slices/bcoSlice"
import { Extension } from "./extension";
import { Next } from "./components";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from "@mui/material/Tooltip";

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
    dispatch(updateModified())
    setNewSchema("");
  };

  const removeRows = (index) => {
    dispatch(deleteExtensionDomain({index}))
    dispatch(updateModified())
  };

  return (
    <Card className="object-domain">
      <CardHeader
        title={
          <span className="bold-title">
            Extension Domain
            <Tooltip title="Explanation of Extension Domain">
              <Button size="small" href='https://wiki.biocomputeobject.org/index.php?title=Extension-domain'>
                <HelpOutlineIcon />
              </Button>
            </Tooltip>
          </span>
        }
        action={
          <Button
            onClick={() => onSave()}
            variant="contained"
            color="primary"
            disableElevation
          >Next</Button>}
      />
      <CardContent>
        <Grid justifyContent="center" alignItems="center">
          <Typography>
              Top add an extension enter a valid URL for the extension schema
              below and hit the &apos;ADD EXTENSION&apos; button.
          </Typography>
          <TextField
            fullWidth
            onChange={(e) => setNewSchema(e.target.value)}
            value={newSchema}
          />
          <IconButton
            className="add-button"
            // variant="contained"
            disabled={!newSchema}
            onClick={() => addExtension()}>
            <AddCircleIcon style={{ fontSize: 24}} />
              {/* Add Extension */}
          </IconButton>
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
                // variant="contained"
                // color="secondary"
                className="delete-button"
                disableElevation
                fullWidth
                onClick={() => removeRows(index)}>
                <RemoveCircleIcon fontSize="23" />
              
                {/* Remove */}
              </Button>
            </CardContent>)
        }))
        : (<CardContent></CardContent>)
      }
    </Card>
  )
}