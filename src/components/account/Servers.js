import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core'
import { FieldArray, Form, Formik } from 'formik';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { account } from "../../slices/accountSlice";

export default function Servers() {
  const currentUser = useSelector((state) => state.account.user);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>BCO databases</Typography>
      </CardContent>
      <Formik
        initialValues={currentUser.apiinfo}
        onSubmit={(values, {setSubmitting}) => {
          console.log(values);
        }}
      >
        {({values, isSubmitting, errors}) => (
          <Form>
            <FieldArray
              name='data_bases'
              render={arrayHelpers => (
                <Grid item>
                  {values.map((value, index) => (
                    <CardContent key={index}>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <Typography>Database name:</Typography>
                          <Typography>Token: </Typography>
                          <Typography>User Name: </Typography>
                          <Typography>Public Hostname: </Typography>
                        </Grid>
                        <Grid item>
                          <Typography>
                            {value.human_readable_hostname}&emsp;
                            <button onClick={() =>  navigator.clipboard.writeText(value.human_readable_hostname)}>Copy</button>
                          </Typography>
                          <TextField
                            type='password'
                            value={values.token}
                            disabled
                          />
                            <button onClick={() =>  navigator.clipboard.writeText(value.token)}>Copy</button>
                          <Typography>
                            {value.username}&emsp;
                            <button onClick={() =>  navigator.clipboard.writeText(value.username)}>Copy</button>
                          </Typography>
                          <Typography>
                            {value.public_hostname}&emsp;
                            <button onClick={() =>  navigator.clipboard.writeText(value.public_hostname)}>Copy</button>
                          </Typography>
                        </Grid>
                        <Grid item>
                          
                          
                        </Grid>
                      </Grid>
                      <Button
                        disabled={isSubmitting}
                        type='submit'
                        variant="contained"
                        color="secondary"
                      >Remove Database</Button>
                    </CardContent>
                  ))}
                </Grid>
              )
              }
            />
          </Form>
        )}
      </Formik>
    </Card>
  )
}