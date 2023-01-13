// src/account/Servers.js

import React from "react";
import {
  Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography
} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux";
import { removeBcoDb } from "../../slices/accountSlice";
import AddServer from "./AddServer";

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
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Typography>Database name:</Typography>
                  <Typography>Token: </Typography>
                  <Typography>User Name: </Typography>
                  <Typography>Public Hostname: </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {database.human_readable_hostname}&emsp;
                    <button onClick={() =>  global.navigator.clipboard.writeText(database.human_readable_hostname)}>Copy</button>
                  </Typography>
                  <TextField
                    type='password'
                    value={database.token}
                    disabled
                  />
                  <button onClick={() =>  global.navigator.clipboard.writeText(database.token)}>Copy</button>
                  <Typography>
                    {database.bcodb_username}&emsp;
                    <button onClick={() =>  global.navigator.clipboard.writeText(database.bcodb_username)}>Copy</button>
                  </Typography>
                  <Typography>
                    {database.public_hostname}&emsp;
                    <button onClick={() =>  global.navigator.clipboard.writeText(database.public_hostname)}>Copy</button>
                  </Typography>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </CardContent>
            <Button
              variant="contained"
              color="secondary"
              onClick={dialogeOpen}
            >Remove Database</Button>
          </Card>
        ))
      }
      <br/>
      <AddServer />
      <br/>
    </Container>
  )
}