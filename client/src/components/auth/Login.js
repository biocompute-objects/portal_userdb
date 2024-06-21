// src/components/auth/Login.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { GoogleLogin } from "react-google-login";
import * as Yup from "yup";
import { MyTextField } from "../builder/specialFeilds";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { forgotPassword, login, googleLogin, orcidLogIn } from "../../slices/accountSlice";
import { useSearchParams } from "react-router-dom";
import LoadingComponent from '../LoadingComponent'; // Import the LoadingComponent component

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const orcid_id = process.env.REACT_APP_ORCID_CLIENT_ID;
const orcidUrl = process.env.REACT_APP_ORCID_URL;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const onGoogleLoginFailure = (response) => {
  console.log(response);
}

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const { isLoggedIn } = useSelector((state) => state.account);
  const code = searchParams.get("code");
  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(() => {
    if (code !== null) {
      console.log("response", code);
      dispatch(orcidLogIn(code))
        .unwrap()
        .catch((error) => {
          console.log(error)
          navigate("/login");
        })
    }
  }, [code, dispatch, navigate]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
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
  });

  const minimumLoadingTime = 5000; //minimum loading tim 3 seconds

  const onGoogleLoginSuccess = (response) => {
    setLoading(true);
    const idToken = response.tokenId;
    console.log(idToken)
    dispatch(googleLogin(idToken))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, minimumLoadingTime);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);
    dispatch(login({ username, password }))
      .unwrap()
      .then((response) => {
        console.log(response)
        navigate("/");
        global.window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    setOpen(false);
    dispatch(forgotPassword(resetEmail))
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      });
    setLoading(false);
  }

  const handleClose = () => {
    setOpen(false);
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Box display="flex" flexDirection="column" height="100%">
          <Container>
            <Grid item>
              <Typography variant="h4">Sign in</Typography>
              <Typography>Sign in using your Portal credentials</Typography>
              <Typography component={Link} to='/register'>Don&apos;t have an account? Sign up here</Typography>
            </Grid>
            <br />
            <GoogleLogin
              clientId={googleClientId}
              buttonText="Sign with Google"
              onSuccess={onGoogleLoginSuccess}
              onFailure={onGoogleLoginFailure}
              cookiePolicy={"single_host_origin"}
            /><br /><br />
            <a href={`${orcidUrl}/oauth/authorize?client_id=${orcid_id}&response_type=code&scope=/authenticate&redirect_uri=${serverUrl}/login`}>
              <Button
                variant="outlined"
              >
                <img
                  alt="ORCID Sign in"
                  src="https://orcid.org/assets/vectors/orcid.logo.icon.svg"
                  width="25"
                />
                <Typography variant="subtitle1">Sign in with ORCID</Typography>
              </Button>
            </a>
            <Typography variant="h5">Or</Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form>
                <Grid item>
                  <MyTextField name="username" type="username" label='User Name' />
                </Grid>

                <Grid item>
                  <MyTextField name="password" type="password" label='Password' />
                </Grid>

                <div className="form-group">
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                    color='primary'
                    variant="contained"
                  >
                    {loading ? <LoadingComponent /> : 'Login'}
                  </Button>
                </div>
                <Button onClick={() => setOpen(true)}>Forgot password? Reset it here</Button>
              </Form>
            </Formik>
          </Container>
          <Dialog open={open}>
            <DialogContent>
              <DialogTitle>Password Reset</DialogTitle>
              <DialogContentText>
                Enter your email address. If there is an account associated with that address we will provide you a link to reset your password.
              </DialogContentText>
              <TextField
                required
                id="email-for-password-reset"
                label="Email address"
                variant="filled"
                value={resetEmail}
                onChange={(e) => { setResetEmail(e.target.value) }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                id="submit-resetPassword"
                onClick={handleSubmit}
                variant="outlined"
                color="primary"
                disabled={!resetEmail}
              >Submit</Button>
              <Button
                id="Cancel-resetPassword"
                onClick={handleClose}
                variant="outlined"
                color="secondary"
              >Cancel</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Container>
  );
};

export default Login;
