import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Card, CardContent, Typography, Grid, Button, Paper, Select, MenuItem, InputLabel} from "@material-ui/core";
import { Formik, Field, FieldArray, ErrorMessage, useField, useFormikContext, setValues } from 'formik';
import { updateExtensionDomain } from './rootSlice'
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { Form } from "@rjsf/material-ui";

const schema = {
    type: "object",
    properties: {
      title: {
        type: "string"
      },
      done: {
        type: "boolean"
      }
    }
  };

  const onSubmit = ({formData}) => {
    console.log(formData)
  };

  const uiSchema = {
    "ui:order": ["extension_schema", "*"],
    "extension_schema": {
        "ui:readonly": true
    }
  }

  const formData = {
    title: "First task",
    done: true
  };

export const  ExtensionDomain = () => {
  const dispatch = useDispatch();
  const extensionDomain = useSelector(state => state.bco.data.extension_domain)
  let has_extension = extensionDomain.length > 0
  console.log('has_extension', has_extension)
  return (
    <Card>
        <Paper>
          <Typography variant='h4'> Extension Domain</Typography>
        </Paper>
        <CardContent>
          <Formik
            initialValues={
                extensionDomain
            }
            onSubmit={
              (myData, {setSubmitting, setValues}) => {
                setSubmitting(true);
                console.log('myData', myData);
                dispatch(updateExtensionDomain(myData));
                setSubmitting(false);
              }
            }
            validate={
              (values) => {
                const errors = {};
                return errors;
              }
            }>
            {
              ({values, isSubmitting, errors, setFieldValue}) => (
                values.map((extension, index) => (
                  <Typography>{extension.extension_schema}</Typography><Button>Add</Button>
                ))
              )
            }
            </Formik>
        </CardContent>
    </Card>
  )
}