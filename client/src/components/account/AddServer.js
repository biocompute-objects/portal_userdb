import * as React from 'react';
import Button from '@mui/material/Button';
import { Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { authenticateBcoDb } from '../../slices/accountSlice';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid
} from '@mui/material';
import { LargeTextField } from '../builder/specialFeilds';
import * as Yup from "yup";

export default function AddServer() {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  // const re = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add BCODB
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a BCODB Instance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the hostname below and click &#34;Request Server Information&#34;
            to confirm that you are adding the correct server.
          </DialogContentText>
          <br/>
          <DialogContentText>
            The returned server information is based on the token you provide.
            You must have already received a token from this server.
          </DialogContentText>
           <Formik
            initialValues= {{token: '3f5504d88a5085d0452b19350fb6f82ae7097dd0', hostname: 'http://localhost:8000'}}
            validationSchema={Yup.object().shape({
              token: Yup.string()
                .required("This field is required!"),
              hostname: Yup.string()
                // .matches(re,'URL is not valid')
                .required("This field is required!"),
            })}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(true);
              console.log('server add', values);
              dispatch(authenticateBcoDb(values))
                .unwrap()
                .catch(() => {
                  setSubmitting(false)
                });
              window.location.reload()
              setSubmitting(false);
              handleClose();
            }}
          >
            {({values, isSubmitting}) => (
             <Form>
              <Grid container spacing={2}>
                <Grid item>
                  <LargeTextField name='token' label='Token' isRequired/>
                </Grid>
                <Grid item>
                  <LargeTextField name='hostname' label='Host Name (URL)' isRequired/>
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
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}