import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ReactJson from "react-json-view"
import { 
  createDraftBco,
  updateDraftBco,
  publishDraftBco,
  validateBco,
  setPrefix,
  updateETag,
  updateBco,
} from "../../slices/bcoSlice";
import objectHash from "object-hash";
import { FileUpload, handleDownloadClick } from "../fileHandeling";
import "../../styles.css";

export const Preview = () => {
  const [prefixHolder, setPrefixHolder] = useState("");
  // const [ bcodbInfo, setBcodbInfo ] = useState([])
  const jsonData = useSelector((state) => state.bco.data);
  const [bco, setBco] = useState(useSelector(state => state.bco.data));
  const prefix = useSelector(state => state.bco.prefix);
  const bcoErrors = useSelector(state => state.bco.error);
  const bcoStatus = useSelector(state => state.bco.status);
  const dispatch = useDispatch();
  const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;
  
  let isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  
  const bcodbs = (isLoggedIn
    ? useSelector((state) => state.account.user.bcodbs)
    : []);

  const hash = (bco) => objectHash(bco,{ excludeKeys: function(key) {
    if (( key === "object_id" ) || (key === "etag") || (key === "spec_version")) {
      return true;
    }
    return false;
  }
  })

  useEffect(() => {
    const etag = hash(bco)
    dispatch(updateETag(etag))
  }, [])

  const createDraft = () => {
    console.log("create", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(createDraftBco({bcoURL, bcoObject}))
  }

  const updateDraft = () => {
    console.log("Update", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(updateDraftBco({bcoURL, bcoObject}))
  }

  const publish = () => {
    console.log("Publish", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(publishDraftBco({prefix, bcoURL, bcoObject}))
  }

  const validate = () => {
    console.log("Validate", BCODB_URL, bco)
    const bcoURL = BCODB_URL
    const bcoObject = bco
    dispatch(validateBco({bcoURL, bcoObject}))
    
  }

  const handleChange = (event) => {
    dispatch(updateBco(event.updated_src))
    const etag = hash(bco)
    dispatch(updateETag(etag))
  };

  return (
    <Card>
      <Paper>
        <Typography variant='h4'> Preview</Typography>
      </Paper>
      <CardContent  align='left'>
        <ReactJson 
          src={bco}
          onEdit={handleChange}
          onDelete={handleChange}
          onAdd={handleChange}
        />
      </CardContent>
      {
        bcoStatus === "invalid"
          ? (
            <Card>
              <CardHeader title="BCO Errors"/>
              <CardContent  align='left'>
                <ReactJson src={bcoErrors}/>
              </CardContent>
            </Card>
          )
          : (<></>)
      }
      <CardContent>
        <Grid container spacing={2}> 
          {
            (prefix !== null)
              ? (<></>)
              : (<Grid container justifyContent="center" spacing={2}>
                <Grid item >
                  <TextField
                    value={prefixHolder}
                    onChange={(event) => setPrefixHolder(event.target.value)}
                  />
                  <Button
                    disabled={prefixHolder.length < 3 || prefixHolder.length > 5}
                    onClick={() => dispatch(setPrefix(prefixHolder))}
                  >Set Prefix</Button>
                  {/* <select>{
                    bcodbs.map((database, index) => {
                      {console.log(database.human_readable_hostname, index)}
                      <option value={index} key={index}>{database.human_readable_hostname}</option>
                    })
                  }</select> */}
                </Grid>
              </Grid>)
          }
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
                disabled={prefix === null}
                color="primary"
                onClick={() =>  createDraft()  }
              > Save as Draft </Button>
            </Grid>)
          }
          <Grid item xs>
            <Button
              id="validate"
              type='submit'
              variant="contained"
              color="primary"
              onClick={() => validate()}
            > Validate BCO</Button>
          </Grid>
          <Grid item xs>
            <Button
              type='submit'
              disabled={bcoStatus !== "valid"}
              variant="contained"
              color="secondary"
              onClick={() =>  publish()  }
            > Publish </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button 
              className="download-button"
              type='submit'
              variant="contained"
              color="primary"
              onClick={() => {handleDownloadClick(jsonData)}}
            > Download BCO</Button>
          </Grid>
          <Grid item>
            <Button 
              type='submit'
              variant="contained"
              color="primary"
            > Upload </Button>
          </Grid>
          <Grid item className="upload-grid">
            <label htmlFor="bcoUpload">Upload a BCO</label>
            <FileUpload />
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  )
}