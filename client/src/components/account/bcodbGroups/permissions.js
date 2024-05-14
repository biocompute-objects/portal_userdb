import React from "react";
import { Button, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { permInfo } from "../../../slices/accountSlice";
import { useParams } from "react-router-dom";
import { Field, FieldArray, Form, Formik } from "formik";

export default function Permissions () {
  const params = useParams();
  const dispatch = useDispatch();
  const bcodb = useSelector((state) => state.account.user.bcodbs[params.id]);

  const handlePerms = (perm, index) => {
    const { token, public_hostname } = bcodb;
    dispatch(permInfo({perm, token, public_hostname}))
  }

  return (
    <Card>
      <CardHeader title="Permissions"/>
      <CardContent>
        {bcodb.user_permissions.map((perm, index) => (
          <Button
            variant="outlined"
            key={index}
            onClick={() => {handlePerms(perm, index)}}
          >{perm}</Button>
        ))}
      </CardContent>
    </Card>
  )
}