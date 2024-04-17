// src./components/prefix/prefixRegister.js

import React, { useState } from "react";
import * as Yup from "yup";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core"; 
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { registerPrefix } from "../../slices/prefixSlice";
import { LargeTextField, MyTextField } from "../builder/specialFeilds";

export default function PrefixRegister({isLoggedIn}) {
  const dispatch = useDispatch();
  const [addPrefix, setAddPrefix] = useState(false);
  
  const handleClose =() => {
    setAddPrefix(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={!isLoggedIn}
        onClick={() => setAddPrefix(true)}
      >Register new prefix</Button>
      
      <Dialog open={(addPrefix === true)}>
        <DialogTitle id="register-prefix">
          <Typography variant="h5">
        Register a new BCO Prefix
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              prefix:"",
              public: "true",
              description: ""
            }}
            validationSchema={Yup.object().shape({
              prefix: Yup.string()
                .test(
                  "len",
                  "The prefix must be between 3 and 5 characters.",
                  (val) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 5
                )
                .required("This field is required!")
            })}
            onSubmit={(values, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              dispatch(registerPrefix({values}))
              setAddPrefix(false);              
              resetForm();
              setSubmitting(false);
            }}
          >
            {({values, isSubmitting}) => (
              <Form>
                <MyTextField name="prefix" placeholder="BCODB Prefix" />
                <br/>Public prefix:&nbsp;&nbsp;
                <Field type='radio' name='public' value='true' />
                &nbsp;&nbsp;Private prefix:&nbsp;&nbsp;
                <Field type='radio' name='public' value='false' />
                <LargeTextField name='description' placeholder='Prefix description'/>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                  variant="outlined"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
        Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}