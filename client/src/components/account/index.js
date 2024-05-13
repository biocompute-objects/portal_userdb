// src/components/account/index.js

import React, { useEffect } from "react";
import { Button, Card, Container } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userInfo } from "../../slices/accountSlice";
import Profile from "./Profile";
import Servers from "./Servers";
import PasswordReset from "./passwordReset";

export default function AccountPage() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.account.user);

  useEffect(() => {
    dispatch(userInfo())
  }, [])

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container title='Account Page'>
      <PasswordReset 
        open={open}
        setOpen={setOpen}
      />
      <Card>
        <Button
          variant="outlined"
          onClick={()=> setOpen(true)}
        >Change Password</Button>
        <Button
          type='submit'
          variant="contained"
          color="secondary"
          onClick={() => {dispatch(logout())}}
        >Log Out</Button>
        <Profile />
        <Servers />
      </Card>
    </Container>
  )
}