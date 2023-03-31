import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Button, Box, Card, CardHeader, Container, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MyTextField } from "../builder/specialFeilds";
import * as Yup from "yup";
import {resetPassword} from "../../slices/accountSlice";


export default function PasswordReset() {
  const dispatch = useDispatch();

  return (
    <Container>
      <Card>
        <CardHeader title="Password Reset"/>
        <Box display="flex" flexdirection="column" height="100%" justifyContent="center" >
          <Grid item>
            <Typography>Sign in using your Portal credentials</Typography>
            <Typography component={Link} to='/register'>Don&apos;t have an account? Sign up here</Typography>
            <Formik
              initialValues={{
                token:global.window.location.search.substring(1),
                newPassword: ""
              }}
              validationSchema={Yup.object().shape({
                newPassword: Yup.string()
                  .test(
                    "len",
                    "The password must be between 6 and 40 characters.",
                    (val) =>
                      val &&
                      val.toString().length >= 6 &&
                      val.toString().length <= 40
                  )
                  .required("This field is required!"),
              })}
              onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                console.log(values.newPassword, values.token)
                dispatch(resetPassword(values))
                setSubmitting(false);
              }}
            >
              {({isSubmitting}) => (
                <Form>
                  <Grid item>
                    <MyTextField name="newPassword" type="password" lable="New Password" placeholder="New Password" isRequired/>
                  </Grid>
                  <Grid item>
                    <MyTextField name="token" type="name" lable="Reset Token" placeholder="Reset Token" isRequired/>
                  </Grid>
                  <Button
                    disabled={isSubmitting}
                    type='submit'
                    variant="outlined"
                    color="primary"
                  >Submit </Button>
                </Form>
              )}
            </Formik>
          </Grid>
        </Box>
      </Card>
    </Container>
    
  )
}