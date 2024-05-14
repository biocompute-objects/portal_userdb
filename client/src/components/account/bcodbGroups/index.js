import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DbInfo from "./dbInfo";
import Groups from "./groups";
import Permissions from "./permissions";
import { groupInfo } from "../../../slices/accountSlice";
import NotificationBox from "../../NotificationBox";

export default function GroupsPage () {
  const params = useParams()
  const dispatch = useDispatch()
  const bcodb = useSelector((state) => state.account.user.bcodbs[params.id]);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (bcodb.length === 0) {
      navigate("/profile")
    }
    const { token, public_hostname, group_permissions } = bcodb
    const index = params.id
    dispatch(groupInfo({group_permissions, token, public_hostname, index}))
      .unwrap()
      .catch((error) => {
        console.log(error)        
      })
  }, [])

  return (
    <Container>
      <NotificationBox />
      <DbInfo />
      <Groups />
      <Permissions />
    </Container>
  )
}