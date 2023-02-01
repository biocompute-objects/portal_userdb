import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { register, googleRegister } from "../../slices/accountSlice";
import { clearMessage } from "../../slices/messageSlice";
import { MyTextField } from "../builder/specialFeilds";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import NotificationBox from "../NotificationBox";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID



const onGoogleLoginFailure = (response) => {
  console.log(response);
}

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate;

  const onGoogleLoginSuccess = (response) => {
    const data =  {
      last_name: response.profileObj.familyName,
      first_name: response.profileObj.givenName,
      username: response.profileObj.givenName+response.profileObj.familyName,
      email: response.profileObj.email,
      token: response.tokenId
    }
    dispatch(googleRegister(data))
      .unwrap()
      .then(() => {
        navigate("/login");
        global.window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleRegister = (values) => {
    const { username, email, password } = values;
    setSuccessful(false);
    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        navigate("/login");
        global.window.location.reload();
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  if (successful === true) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="col-md-12 signup-form">
      <Grid item>
        <Typography variant="h4">Create a new BCO Portal account</Typography>
        <br/>
        <GoogleLogin
          clientId={clientId}
          buttonText="Create BCO Portal account with Google"
          onSuccess={onGoogleLoginSuccess}
          onFailure={onGoogleLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
        <Typography variant="h5">Or</Typography>
        <Typography>Create your Portal credentials</Typography>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            confirm_password: ""
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val) =>
                  val &&
                  val.toString().length >= 3 &&
                  val.toString().length <= 20
              )
              .required("This field is required!"),
            email: Yup.string()
              .email("This is not a valid email.")
              .required("This field is required!"),
            password: Yup.string()
              .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val) =>
                  val &&
                  val.toString().length >= 6 &&
                  val.toString().length <= 40
              )
              .required("This field is required!"),
            confirm_password: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("This field is required!"),
          })}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(true)
            console.log(values)
            handleRegister(values)
            setSubmitting(false)
          }}
        >
          {({isSubmitting}) => (
            <Form>
              <Grid item>
                <Typography variant="h5">Optional Fields</Typography>
                <Grid item>
                  <MyTextField name="first_name" lable="First Name" placeholder="First Name" />
                </Grid>
                <Grid item>
                  <MyTextField name="last_name" lable="Last Name" placeholder="Last Name" />
                </Grid>
                <Typography variant="h5">Required Fields</Typography>
                <Grid item>
                  <MyTextField name="email" type= "email" lable="Email" placeholder="Email" isRequired/>
                </Grid>
                <Grid item>
                  <MyTextField name="username" lable="User Name" placeholder="User Name" isRequired/>
                </Grid>
                <Grid item>
                  <MyTextField name="password" type="password" lable="Password" placeholder="Password" isRequired/>
                </Grid>
                <Grid item>
                  <MyTextField name="confirm_password" type="password" lable="Confirm password" placeholder="Confirm password" isRequired/>
                </Grid>
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
      <NotificationBox />
    </Container>
  );
};

export default Register;
