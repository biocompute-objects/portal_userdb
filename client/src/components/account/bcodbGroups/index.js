import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DbInfo from "./dbInfo";
import Groups from "./groups";
import Permissions from "./permissions";

export default function GroupsPage () {
  const params = useParams()
  const bcodb = useSelector((state) => state.account.user.bcodbs[params.id]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (bcodb.length === 0) {
      navigate("/profile")
    }
  }, [])

  return (
    <Container>
      <DbInfo />
      <Groups />
      <Permissions />
    </Container>
  )
}