import React from 'react';
import {Card, Typography, CardContent, TextField, Grid} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext, setValues } from 'formik';
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

    function fixDateTime(fieldValue) {
        //console.log("inside")
        if (typeof(fieldValue) != "string") {
            //console.log(fieldValue)
            const datetime_string = fieldValue.utc().toISOString();
            //console.log(datetime_string)
            return datetime_string;
        }
        //console.log("Outside: ", typeof(fieldValue))
        return fieldValue
   }

  
   const dispatch = useDispatch();
   const provenanceDomain = useSelector(state => state.bco.data.provenance_domain)

  
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
                        (myData, {setSubmitting, setValues}) => {
                            setSubmitting(true);
                            console.log(myData)
                            const created = fixDateTime(myData["created"]);
                            const modified = fixDateTime(myData["modified"]);
                            const start_time = fixDateTime(myData["embargo"]["start_time"]);
                            const end_time = fixDateTime( myData["embargo"]["end_time"]);
                            const payload = {...myData, 
                                created: created, 
                                modified: modified, 
                                embargo: {
                                    start_time: start_time,
                                    end_time: end_time
                                }
                             }
                            // console.log(payload)
                            //setValues(payload);
                            dispatch(updateProvenanceDomain(payload));
                            setSubmitting(false);
                        }
                    }
                >
                  {
                    ({values, isSubmitting,errors}) => (
                        <Form>
                             <Grid container spacing={2}>
                                    <MyTextField name="name" type="input" placeholder="Name" label='Name'/>
                                    <MyTextField name="version" type="input" placeholder="Version" label="Version"/>
                                    <MyTextField name="license" type="input" placeholder="License" label="License"/>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item lg={12}>
                                        <MyTextField name="derived_from" type="input" placeholder="Derived From"  label="Derived From"/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item md={2}>
                                        <span> Created: </span>
                                    </Grid>
                                    <Grid item md={3}>
                                        
                                        <DatePickerField name="created" type="input" placeholder="Created"/>
                                    </Grid>
                                    <Grid item md={2}> 
                                        <span> Modified: </span>
                                    </Grid>
                                    <Grid item md={3}> 
                                        <DatePickerField name="modified" type="input" placeholder="Modified"/>              
                                    </Grid>
                                </Grid> 
                                <Grid container spacing={4} justifyContent="center">
                                <Grid item md={12} align='left' >
                                    <Typography variant="h6">-- Embargo --</Typography>
                                </Grid> 
                                </Grid>
                                <Grid container spacing={2}>                        
                                    <Grid item md={2}>
                                        <span> Start time: </span>
                                    </Grid>
                                    <Grid item md={3}>
                                        <DatePickerField name="embargo.start_time" type="input" placeholder="Start Time"/>
                                    </Grid>
                                    <Grid item md={2}> 
                                        <span> End Time: </span>               
                                    </Grid>
                                    <Grid item md={3}>
                                        <DatePickerField name="embargo.end_time" type="input" placeholder="End Time"/>               
                                    </Grid>
                                </Grid>
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