// src/components/auth/Login.js

import React, { useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { GoogleLogin } from "react-google-login";
import * as Yup from "yup";
import { MyTextField } from "../builder/specialFeilds";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { login, googleLogin } from "../../slices/accountSlice";
import NotificationBox from "../NotificationBox";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const onGoogleLoginFailure = (response) => {
  console.log(response);
}

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

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

  const onGoogleLoginSuccess = (response) => {
    setLoading(true);
    const idToken = response.tokenId;
    console.log(idToken)
    dispatch(googleLogin(idToken))
      .unwrap()
      .then(() => {
        navigate("/");
        global.window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(false);
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
  }

  const handleClose = () => {
    setOpen(false);
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Box display="flex" flexdirection="column" height="100%" >
        <Container>
          <Grid item>
            <Typography variant="h4">Sign in</Typography>
            <Typography>Sign in using your Portal credentials</Typography>
            <Typography component={Link} to='/register'>Don&apos;t have an account? Sign up here</Typography>
          </Grid>
          <br/>
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign with Google"
            onSuccess={onGoogleLoginSuccess}
            onFailure={onGoogleLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
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
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </Button>
              </div>
              <Button onClick={() => setOpen(true)}>Forgot password? Reset it here</Button>
            </Form>
          </Formik>
        </Container>
        <NotificationBox />
        <Dialog open={open}>
          <DialogContent>
            <DialogTitle>Password Reset</DialogTitle>
            <DialogContentText>
            Enter your email address.
            If there is an account associated with that address we will provide you a link to
            reset your password.
            </DialogContentText>
            <TextField
              required
              id="email-for-password-reset"
              label="Email address"
              variant="filled"
              value={resetEmail}
              onChange={(e) =>{setResetEmail(e.target.value)}}
            />
          </DialogContent>
          <DialogActions>
            <Button
              id="cancle-resetPassword"
              onClick={handleSubmit}
              variant="outlined"
              color="primary"
              disabled={!resetEmail}
            >Submit</Button>
            <Button
              id="cancle-resetPassword"
              onClick={handleClose}
              variant="outlined"
              color="secondary"
            >Cancle</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Login;