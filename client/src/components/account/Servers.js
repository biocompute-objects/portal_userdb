// src/account/Servers.js

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { removeBcoDb, resetToken } from "../../slices/accountSlice";
import AddServer from "./AddServer";
import { useNavigate } from "react-router-dom";

export default function Servers() {
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = useState(useSelector((state) => state.account.user));
  const bcodbs = currentUser.bcodbs
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();

  const handleGroups = (index) => {
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

  const handleTokenReset = (index) => {
    const { public_hostname, token } = bcodbs[index]
    dispatch(resetToken({public_hostname, token}))
      .unwrap()
      .then((response) => {
        setCurrentUser(response.user)
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  return (
    <Container elevation={2}>
      <Typography className={"Account-Servers-title"}>BCO databases</Typography>
      {
        bcodbs.map((database, index) => (
          <Card key={index} className={"Account-Servers-server-card"}>
            <CardHeader title={database.human_readable_hostname}/>
            <CardContent>
              <Button
                variant="outlined"
                color="secondary"
                onClick={dialogeOpen}
              >Remove Database</Button>
              <Button
                variant="outlined"
                onClick={() => handleTokenReset(index)}
                disabled={database.recent_status !== "200"}
              >Reset API Token</Button>
              <br/><br/>
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
                    variant="standard"
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
                    Click CANCEL to go back.
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
                    id="cancel-removedb"
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