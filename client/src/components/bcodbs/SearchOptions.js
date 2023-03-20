// src/components/bcodbs/index.js

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { MyTextField } from "../builder/specialFeilds";
import { seachBcodb } from "../../slices/searchSlice";

export default function SearchOptions ({setBcodbInfo}) {
  const [quickSearch, setQuickSearch] = useState('')
  const dispatch = useDispatch();
  let isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const bcodbs = (isLoggedIn
    ? useSelector((state) => state.account.user.bcodbs)
    : []);
  // const validationSchema = Yup.object().shape({
  //   action
  // })
  return (
    <Container>
      <Card>
        <CardHeader title="Quick Search"/>
        <CardContent>
          <TextField
            value={quickSearch}
            onChange={() => setQuickSearch()}
            placeholder="Search using BCO_ID"
          />
          <Button
          >Submit</Button>
        </CardContent>
      </Card>
      <Formik
        initialValues={{
          index: "None",
          action: "",
          search: ""
        }}
        // validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          if (values.index === "None") {
            const data = {
              token: "627626823549f787c3ec763ff687169206626149",
              public_hostname: "https://biocomputeobject.org",
              search: values.search,
              action: "bco_id"
            }
            setBcodbInfo([data.token, data.public_hostname])
            dispatch(seachBcodb(data))
          } else {
            const data = {
              public_hostname: bcodbs[values.index].public_hostname,
              token: bcodbs[values.index].token,
              search: values.search,
              action: values.action
            }
            setBcodbInfo([bcodbs[values.index].token, bcodbs[values.index].public_hostname])
            dispatch(seachBcodb(data))
          }
          setSubmitting(false);
        }}
      >
        {({values, isSubmitting}) => (
          <Form>
            <Card>
              <CardHeader title="Advanced Search"/>
              <CardContent>
                <Box>
                  <Typography>
                    1. Select from available BCODBs to display results
                  </Typography>

                  <Field as='select' name='index'>
                    <option value='None' key='None'>Public BCODB (not logged in)</option>
                    (isLoggedIn
                      ? {bcodbs.map((database, index) => (
                      <option value={index} key={index}>{database.human_readable_hostname}</option>
                    ))}
                      : <></>
                    )
                  </Field>
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                Search Type:&nbsp;&nbsp;
                <Field type='radio' name='action' value='mine' disabled={values.index === "None"}/>
                &nbsp;&nbsp;My BCOs&nbsp;&nbsp;
                <Field type='radio' name='action' value='prefix' disabled={values.index === "None"}/>
                &nbsp;&nbsp;Prefixs&nbsp;&nbsp;
                <Field type='radio' name='action' value='bco_id' />
                &nbsp;&nbsp;BCO IDs&nbsp;&nbsp;
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Box maxWidth={500}>
                  <Typography>
                    3. Enter search term:
                  </Typography>
                  <MyTextField name='search' label='Search BCO Db' />
                </Box>
              </CardContent>
            </Card>
            <Button 
              disabled={isSubmitting || values.action === ""}
              type='submit'
              variant="contained"
              color="primary"
            > Submit Search </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}