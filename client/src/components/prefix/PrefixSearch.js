// src/components/prefix/PrefixSearch.js

import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Field, Form, Formik  } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { searchPrefixRegistry } from "../../slices/prefixSlice";
import { MyTextField } from "../builder/specialFeilds";


export default function PrefixSearch({setAddPrefix}) {
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const dispatch = useDispatch();

  const registerPrefix = () => {
    setAddPrefix(true);
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <Formik
            initialValues={{
              radio: "all",
              search: "",
            }}
            // validationSchema={{}}
            onSubmit={(values, {setSubmitting, resetForm }) => {
              setSubmitting(true);
              if (values.search === "") {
                const data = {
                  radio: values.radio,
                  search: "None"
                };
                dispatch(searchPrefixRegistry({data}))
              } else {
                const data = [
                  values.radio,
                  values.search
                ];
                dispatch(searchPrefixRegistry(data))
              }
              resetForm()
              setSubmitting(false);
            }}
          >
            {({values, isSubmitting, resetForm}) => (
              <Form>
                <Grid container justifyContent="center">
                  <Grid item>
                Search Type:&nbsp;&nbsp;
                    <Field type='radio' name='radio' value='mine' disabled={!isLoggedIn}/>
                &nbsp;&nbsp;My Prefixes&nbsp;&nbsp;
                    <Field type='radio' name='radio' value='all' disabled={values.index === "None"}/>
                &nbsp;&nbsp;Return all&nbsp;&nbsp;
                    <Field type='radio' name='radio' value='search' disabled={values.index === "None"}/>
                &nbsp;&nbsp;Search Prefix Name
                  </Grid>
                </Grid>
                <br/>
                <Grid container justifyContent="center">
                  <Grid item>
                    {
                      (values.radio !== "search")
                        ? (<div />)
                        : (<MyTextField name='search' lable='Search Prefix' placeholder='Prefix name'/>)
                    }&nbsp;&nbsp;
                  &nbsp;&nbsp;
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                    >
                  Search
                    </Button>
                  </Grid>
                  <Grid item>
                &nbsp;&nbsp;
                    <Button
                      disabled={isSubmitting}
                      color="primary"
                      variant="contained"
                      type="reset"
                      onClick={resetForm}
                    >
                  Clear Search
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </CardContent>
      <CardContent>
        <Button
          variant="contained"
          color="primary"
          disabled={!isLoggedIn}
          onClick={registerPrefix}
        >Register new prefix
        </Button>
      </CardContent>
    </Card>
  )
}