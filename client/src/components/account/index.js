// src/components/account/index.js

import React from "react";
import { Button, Card, Container } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/accountSlice";
import Profile from "./Profile";
import Servers from "./Servers";
import NotificationBox from "../NotificationBox";

export default function AccountPage() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.account.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container title='Account Page'>
      <NotificationBox />
      <Card>
        <Profile />
        <Servers />
      </Card>
      <Button
        type='submit'
        variant="contained"
        color="secondary"
        onClick={() => {dispatch(logout())}}
      >Log Out</Button>
    </Container>
  )
}