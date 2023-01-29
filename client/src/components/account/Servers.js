// src/account/Servers.js

import React from "react";
import {
  Button, Card, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography
} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux";
import { removeBcoDb, groupsPermissions } from "../../slices/bcodbSlice";
import AddServer from "./AddServer";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  serverCard: {
    minWidth: 275,
    minHeight: "250px",
    maxWidth: "500px",
    textAlign: "left",
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 12,
  },
  heightened: {
    minHeight: "250px"
  },
  title: {
    fontSize: "37px",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Servers() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.account.user);
  const bcodbs = currentUser.bcodbs
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();

  const handleGroups = (database, index) => {
    console.log(database)
    dispatch(groupsPermissions(database))
    navigate(`/profile/bcodb/${index}`)
  };

  const dialogeOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeDb = (database) => {
    dispatch(removeBcoDb({database}))
      .unwrap()
      .catch((error) =>{
        console.log(error);
      })
    setOpen(false);
  };

  return (
    <Container elevation={2}>
      <Typography className={classes.title}>BCO databases</Typography>
      {
        bcodbs.map((database, index) => (
          <Card key={index} className={classes.serverCard}>
            <Button
              variant="contained"
              color="secondary"
              onClick={dialogeOpen}
            >Remove Database</Button>
            <Button
              variant="outlined"
              onClick={() => handleGroups(database, index)}
              disabled={database.recent_status !== "200"}
            >Groups/Permissions</Button>
            <CardHeader title={database.human_readable_hostname}/>
            
            <CardContent>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Typography>Token: </Typography>
                  <Typography>User Name: </Typography>
                  <Typography>Public Hostname: </Typography>
                  <Typography>Last Update:</Typography>
                  <Typography>Recent Status: </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    type='password'
                    value={database.token}
                    disabled
                  />
                  <Typography>
                    {database.bcodb_username}&emsp;
                  </Typography>
                  <Typography>
                    {database.public_hostname}&emsp;
                  </Typography>
                  <Typography>
                    {database.last_update}&emsp;
                  </Typography>
                  <Typography>
                    {database.recent_status}&emsp;
                  </Typography>
                </Grid>
                <Grid item>
                  <button onClick={() =>  global.navigator.clipboard.writeText(database.token)}>Copy</button><br/>
                  <button onClick={() =>  global.navigator.clipboard.writeText(database.bcodb_username)}>Copy</button><br/>
                  <button onClick={() =>  global.navigator.clipboard.writeText(database.public_hostname)}>Copy</button><br/>
                  <div></div><br/>
                  <div></div><br/>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Are you sure you want to remove this BCODB instance??</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Click CONFIRM to remove this BCODB: {database.human_readable_hostname}
                  </DialogContentText>
                  <br/>
                  <DialogContentText>
                    Click CANCLE to go back.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    id="confirm-removedb"
                    onClick={() => {removeDb(database)}}
                    variant="contained"
                    color="primary"
                  >Confirm</Button>
                  <Button
                    id="cancle-removedb"
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                  >Cancel</Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        ))
      }
      <br/>
      <AddServer />
      <br/>
    </Container>
  )
}