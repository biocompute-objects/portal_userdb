import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { GoogleLogin } from 'react-google-login';
import * as Yup from "yup";
import { MyTextField } from "../builder/specialFeilds";
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { login, googleLogin } from '../../slices/accountSlice';
import { clearMessage } from '../../slices/messageSlice';

const clientId = '404409424650-a1hh4j6m9r3998v16siia2lum9un21ip.apps.googleusercontent.com'

const onGoogleLoginFailure = (response) => {
  console.log(response);
}

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.account);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const onGoogleLoginSuccess = (response) => {
    setLoading(true);
    const idToken = response.tokenId;
    console.log(idToken)
    dispatch(googleLogin(idToken))
      .unwrap()
      .then(() => {
        navigate("/");
        window.location.reload();
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
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // if (isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Card display="flex" flexdirection="column" height="100%" >
      <CardContent>
        <Grid item>
          <Typography variant="h4">Sign in</Typography>
          <Typography>Sign in using your Portal credentials</Typography>
          <Typography component={Link}>Forgot password? Reset it here</Typography>
        </Grid>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <Grid item>
              <MyTextField name="username" type="username" label='User Name' />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </Grid>

            <Grid item>
              <MyTextField name="password" type="password" label='Password' />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
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
            <Typography component={Link} to='/register'>Don't have an account? Sign up here</Typography>
          </Form>
        </Formik>
      </CardContent>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in or create an account with Google"
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </Card>
  );
};

export default Login;
