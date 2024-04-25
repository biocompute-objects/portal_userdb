// src./components/prefix/prefixRegister.js

import React, { useState } from "react";
import * as Yup from "yup";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerPrefix } from "../../slices/prefixSlice";
import { LargeTextField, MyTextField } from "../builder/specialFeilds";


export default function PrefixRegister({isLoggedIn}) {
  const dispatch = useDispatch();
  const bcodbs = isLoggedIn
    ? useSelector((state) => state.account.user.bcodbs)
    : [];
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
        <DialogTitle id="register-prefix">Register a new BCO Prefix</DialogTitle>
        <Formik
          validateOnBlur={true}
          validateOnChange={true}
          initialValues={{
            prefix:"",
            public: "true",
            description: "",
            bcodb: bcodbs.length > 0 ? bcodbs[0].id : "",
          }}
          validationSchema={Yup.object().shape({
            prefix: Yup.string()
              .min(3, "The prefix must be at least 3 characters.")
              .max(5, "The prefix can be no more than 5 characters.")
              .required("This field is required!"),
            description: Yup.string()
              .required("This field is required!"),
            public_hostname: Yup.string()
              .url("Invalid URL format")
              .required("Website is required"),
          })}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            dispatch(registerPrefix({values}))
            setAddPrefix(false);              
            resetForm();
            setSubmitting(false);
          }}
        >
          {({values, isValid, isSubmitting}) => (
            <Form>
                
              <DialogContent>
                <MyTextField name="prefix" placeholder="BCODB Prefix" />
                <br/>Public prefix:&nbsp;&nbsp;
                <Field type='radio' name='public' value='true' />
                &nbsp;&nbsp;Private prefix:&nbsp;&nbsp;
                <Field type='radio' name='public' value='false' />
                <LargeTextField name='description' placeholder='Prefix description'/>
                <Field as="select" name="public_hostname">
                  <option value="">Select a BCODB</option>
                  {bcodbs.map(bcodb => (
                    <option key={bcodb.hostname} value={bcodb.public_hostname}>
                      {bcodb.human_readable_hostname}
                    </option>
                  ))}
                </Field>
              </DialogContent>  
              <DialogActions>
                <Button type="submit" disabled={!isValid} color="primary">Submit</Button>
                <Button onClick={handleClose} color="primary">
              Cancel
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  )
}