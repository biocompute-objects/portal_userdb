import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardContent, Grid } from "@material-ui/core";
import { Formik, Form, } from "formik";
import { MyTextField } from "../builder/specialFeilds";
import { account } from "../../slices/accountSlice";
import * as Yup from "yup";

const Profile = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.account.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
        >
          <Formik
            initialValues={{
              username: currentUser.userinfo.username,
              first_name: currentUser.userinfo.first_name,
              last_name: currentUser.userinfo.last_name,
              email: currentUser.profile.email,
              public: currentUser.profile.public,
              affiliation: currentUser.profile.affiliation,
              orcid: currentUser.profile.orcid
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email()
                .email("This is not a valid email.")
                .required("This field is required!"),
              profile: Yup.object({
                orcid: Yup.string().url()
                  .matches(/(\d{4}-){3}\d{3}(\d|X)/ , "This is not a valid ORCID")
              }),
            })}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(true);
              dispatch(account(values));
              setSubmitting(false);
            }}
          >
            {({values, isSubmitting}) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item>
                    <MyTextField name='first_name' label='First Name' isRequired/>
                  </Grid>
                  <Grid item>
                    <MyTextField name='last_name' label='Last Name' isRequired/>
                  </Grid>
                  <Grid item>
                    <MyTextField name='email' label='Email address' isRequired/>
                  </Grid>
                  <Grid item>
                    <MyTextField name='public' label='public account'/>
                  </Grid>
                  <Grid item>
                    <MyTextField name='affiliation' label='Affiliation'/>
                  </Grid>
                  <Grid item>
                    <MyTextField name='orcid' label='ORCID'/>
                  </Grid>
                </Grid>
                <div style={{padding: 20}}> 
                  <Button
                    disabled={isSubmitting}
                    type='submit'
                    variant="contained"
                    color="primary"
                  >Update profile </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Profile;