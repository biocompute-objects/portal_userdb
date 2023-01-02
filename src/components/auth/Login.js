import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { GoogleLogin } from 'react-google-login';
import * as Yup from "yup";
import { MyTextField } from "../builder/specialFeilds";
import { Button, Card, CardContent, Grid } from '@material-ui/core';

import { login } from '../../slices/accountSlice';
import { clearMessage } from '../../slices/messageSlice';

const clientId = '404409424650-a1hh4j6m9r3998v16siia2lum9un21ip.apps.googleusercontent.com'

const responseGoogle = (response) => {
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

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Card display="flex" flexdirection="column" height="100%" >
      <CardContent className="card card-container">
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
          </Form>
        </Formik>
      </CardContent>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
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
