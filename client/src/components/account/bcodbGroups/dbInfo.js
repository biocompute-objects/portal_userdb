import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function DbInfo () {
  const params = useParams()
  const bcodb = useSelector((state) => state.account.user.bcodbs[params.id]);
  return (
    <Card>
      <CardHeader title={bcodb.human_readable_hostname}/>
      <CardContent>
        <Typography>
          {bcodb.bcodb_username}
        </Typography>
        <Typography>
          {bcodb.hostname}
        </Typography>
        <Typography>
          {bcodb.public_hostname}
        </Typography>
        <Typography>
          {bcodb.token}
        </Typography>
        <Typography>
          {bcodb.last_update}
        </Typography>
      </CardContent>
    </Card>
  )
}