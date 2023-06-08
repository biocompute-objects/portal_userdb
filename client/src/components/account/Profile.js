import React, { useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardContent, CardHeader, Grid, Typography } from "@material-ui/core";
import { Formik, Form, } from "formik";
import { MyTextField } from "../builder/specialFeilds";
import { account } from "../../slices/accountSlice";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import { orcidAdd, orcidRemove } from "../../slices/accountSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.account.user);
  const orcidUrl = process.env.REACT_APP_ORCID_URL
  const orcid_id = process.env.REACT_APP_ORCID_CLIENT_ID
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code")

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (code !== null) {
      console.log("response", code);
      dispatch(orcidAdd(code))
        .unwrap()
        .then(() => {
          navigate("/profile");
        })
        .catch((error) => {
          console.log(error)
          navigate("/profile");
        })
    }
  }, [])

  return (
    <Card>
      <CardHeader title="User Profile"/>
      <CardContent>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
        >
          <Formik
            enableReinitialize
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
                    { (values.orcid.length > 3)
                      ? (<Typography>
                        <MyTextField name='orcid' label='ORCID' isDisabled/>
                        <Button
                          variant="outlined"
                          onClick={()=> {
                            dispatch(orcidRemove())
                          }}
                        >
                          <img  
                            alt="Remove ORCID"
                            src="https://orcid.org/assets/vectors/orcid.logo.icon.svg"
                            width="25"
                          />
                          <Typography variant="subtitle1" > Remove ORCID</Typography>
                        </Button>
                      </Typography>)
                      : ( <a href={`${orcidUrl}/oauth/authorize?client_id=${orcid_id}&response_type=code&scope=/authenticate&redirect_uri=${serverUrl}/profile`}>
                        <Button variant="outlined">
                          <img  
                            alt="ORCID Sign in"
                            src="https://orcid.org/assets/vectors/orcid.logo.icon.svg"
                            width="25"
                          />
                          <Typography variant="subtitle1" > Add ORCID</Typography>
                        </Button>
                      </a> )
                    }
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