import React from 'react';
import {Card, Typography, CardContent, TextField, Grid} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext } from 'formik';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import { useSelector, useDispatch } from 'react-redux'
import { updateProvenanceDomain } from './rootSlice'

export const  ProvenanceDomain = () => {
    const MyTextField = ({placeholder,label, ...props}) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : "";
        return (
           <TextField
               placeholder={placeholder}
               label={label}
               {...field}
               helperText={errorText}
               error={!!errorText}
               variant='filled'
               margin='dense'
           />
        )
   }

   const DatePickerField = ({ placeholder,...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
      <Datetime
        {...field}
        {...props}
        placeholder={placeholder}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
      />
    );
    }

   const dispatch = useDispatch();
   const provenanceDomain = useSelector(state => state.provenance_domain)

    return (
        <>
           <Card style={{background: "#D8D8D8"}}> 
                <CardContent>
                    <Typography variant='h4'> Provenance Domain</Typography>
                </CardContent>
                <Formik
                    initialValues={
                        provenanceDomain
                    }
                    onSubmit={
                        (myData, {setSubmitting}) => {
                            setSubmitting(true);
                            //console.log(myData['created'])
                            const datetime_string = myData["created"].utc().toISOString();
                            console.log(datetime_string)
                            myData["created"] = datetime_string;
                            dispatch(updateProvenanceDomain(myData));
                            setSubmitting(false);
                        }
                    }
                >
                  {
                    ({values, isSubmitting,errors}) => (
                        <Form>
                            <MyTextField name="name" type="input" placeholder="Name" label='Name'/>
                            <MyTextField name="version" type="input" placeholder="Version" label="Version"/>
                                                 
                                <DatePickerField name="created" type="input" placeholder="Created" dateFormat="YYYY-MM-DD" utc="true"/>
                                <div>
                                <button disabled={isSubmitting} type='submit'> Save </button>
                            </div>
                        </Form>
                    )
                  }  

                </Formik>
           </Card>
        </>
    )
}