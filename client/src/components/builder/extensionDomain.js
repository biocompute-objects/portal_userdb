import * as React from "react";
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, TextField, Typography, Grid, Button, Paper, Select, MenuItem, InputLabel} from "@material-ui/core";
import { addExtension, addExtensionDomain, deleteExtensionDomain } from "../../slices/bcoSlice"
import { MyTextField } from "./specialFeilds";
import { Extension } from "./extension";

export const  ExtensionDomain = ({onSave}) => {
  const dispatch = useDispatch();
  const extensionDomain = useSelector(state => state.bco.data.extension_domain)
  const [newSchema, setNewSchema] = React.useState("")
  let has_extension = extensionDomain.length > 0

  const addExtension = async () => {
    await fetch(newSchema)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(has_extension, jsonData);
        dispatch(addExtensionDomain({extension_schema: newSchema}))
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
        alert(`Fetch schema from '${newSchema}' FAILED: ${error}`);
      });
    setNewSchema("");
  };

  const removeRows = (index) => {
    dispatch(deleteExtensionDomain({index}))
  };

  return (
    <Card>
      <Paper>
        <Typography variant='h4'> Extension Domain</Typography>
      </Paper>
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
                color="primary"
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
      <CardContent>
        <Button
          onClick={() => onSave()}
          variant="contained"
          color="primary"
          disableElevation
        >Save</Button>
      </CardContent>
    </Card>
  )
}