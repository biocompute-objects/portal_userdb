import { useState } from 'react';
import { 
  Button, Card, CardContent, Container, Grid, makeStyles, TextField, Typography
} from '@material-ui/core'
import { FieldArray, Form, Formik } from 'formik';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import AddServer from './AddServer';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  serverCard: {
    minWidth: 275,
    minHeight: '250px',
    maxWidth: '500px',
    textAlign: 'left',
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 12,
  },
  heightened: {
    minHeight: '250px'
  },
  title: {
    fontSize: '37px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Servers() {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.account.user);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <Container elevation={2}>
      <Typography className={classes.title}>BCO databases</Typography>

      <Formik
        initialValues={currentUser.bcodbs}
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
                    <Card className={classes.serverCard} key={index}>
                      <CardContent>
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
                              {value.bcodb_username}&emsp;
                              <button onClick={() =>  navigator.clipboard.writeText(value.bcodb_username)}>Copy</button>
                            </Typography>
                            <Typography>
                              {value.public_hostname}&emsp;
                              <button onClick={() =>  navigator.clipboard.writeText(value.public_hostname)}>Copy</button>
                            </Typography>
                          </Grid>
                          <Grid item>
                        </Grid>
                      </Grid>
                      </CardContent>
                      <Button
                          disabled={isSubmitting}
                          type='submit'
                          variant="contained"
                          color="secondary"
                        >Remove Database</Button>
                    </Card>
                  ))}
                </Grid>
              )
              }
            />
          </Form>
        )}
      </Formik>
      <AddServer />
      <br/>
    </Container>
  )
}