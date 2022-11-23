import React from 'react';
import {Card, Typography, CardContent, TextField, Grid, Button, Paper, Select, MenuItem, InputLabel} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext, setValues } from 'formik';
//import Datetime from 'react-datetime';
//import 'react-datetime/css/react-datetime.css';

import { useSelector, useDispatch } from 'react-redux'
import { updateProvenanceDomain, addEmbargo, deleteEmbargo } from './rootSlice'

export const  ProvenanceDomain = () => {
  const MyTextField = ({placeholder,label, isFullWidth, isRequired, isDisabled,...props}) => {
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
         fullWidth={isFullWidth}
         required={isRequired}
         disabled={isDisabled}
       />
    )
   }

   const MyDateTimeField = ({placeholder,label, isFullWidth, isRequired, isDisabled,...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
    <TextField
      placeholder={placeholder}
      label={label}
      {...field}
      type="datetime-local"
      fullWidth={isFullWidth}
      required={isRequired}
      disabled={isDisabled}
    />
    )
  }
  
/*
   const DatePickerField = ({ placeholder,disabled,...props }) => {
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
    console.log(typeof(fieldValue))
    if (typeof(fieldValue) != "string") {
      //console.log(fieldValue)
      const datetime_string = fieldValue.utc().toISOString();
      //console.log(datetime_string)
      return datetime_string;
    }
    //console.log("Outside: ", typeof(fieldValue))
    return fieldValue
   }
*/
  
   const dispatch = useDispatch();
   const provenanceDomain = useSelector(state => state.bco.data.provenance_domain)

  
  return (
    <>
       <Card> 
        <Paper>
          <Typography variant='h4'> Provenance Domain</Typography>
        </Paper>
        <CardContent>
        <Formik
          initialValues={
            provenanceDomain
          }
          onSubmit={
            (myData, {setSubmitting, setValues}) => {
              setSubmitting(true);
              console.log(myData)
              //const created = fixDateTime(myData["created"]);
              //const modified = fixDateTime(myData["modified"]);
               // const start_time = fixDateTime(myData["embargo"]["start_time"]);
               // const end_time = fixDateTime( myData["embargo"]["end_time"]);
               // const payload = {...myData, 
               //   created: created, 
               //   modified: modified, 
               //   embargo: {
              //    start_time: start_time,
              //    end_time: end_time
              //  }
              // }
              // console.log(payload)
              //setValues(payload);
              dispatch(updateProvenanceDomain(myData));// payload
              setSubmitting(false);
            }
          }
        >
          {
          ({values, isSubmitting,errors}) => (
            
            <Form>
              {/*console.log(values)*/}
              <Grid container spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs> 
                    <MyTextField name="name" type="input" placeholder="Name" label='Name' isRequired isFullWidth/>
                  </Grid>
                   
                  <Grid item xs>
                    <MyTextField name="version" type="input" placeholder="Version" label="Version" isRequired isFullWidth/>
                  </Grid>
                  <Grid item xs>
                    <MyTextField name="license" type="input" placeholder="License" label="License" isRequired isFullWidth/>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs>
                    <MyTextField name="derived_from" type="input" placeholder="Derived From"  label="Derived From" isFullWidth/>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs>
                    <Typography> Created: </Typography> 
                  </Grid>
                  <Grid item xs>
                    <MyDateTimeField  name="created" placeholder="Created" isDisabled isFullWidth/>
                  </Grid>
                  <Grid item xs> 
                    <Typography> Modified: </Typography>
                  </Grid>
                  <Grid item xs> 
                    <MyDateTimeField name="modified"  placeholder="Modified" isDisabled isFullWidth/>        
                  </Grid>
                </Grid> 
                
                  <Grid container spacing={2}>
                    <Grid item md={12} align='left' >
                      <Typography variant="h6">Embargo</Typography>
                    </Grid> 
                  </Grid>
                  {
                    (values.embargo)
                    ?( 
                      <Grid container spacing={2}>      
                        <Grid item xs>
                          <Typography> Start time: </Typography>
                        </Grid>
                        <Grid item xs>
                          <MyDateTimeField name="embargo.start_time" placeholder="Start Time" isFullWidth/>
                        </Grid>
                        <Grid item xs> 
                          <Typography> End Time: </Typography>     
                        </Grid>
                        <Grid item xs>
                          <MyDateTimeField  name="embargo.end_time"  placeholder="End Time" isFullWidth/>     
                        </Grid>
                        <Grid item xs>
                          <Button variant="outlined" color="primary" onClick={() =>{console.log(values.embargo); dispatch(deleteEmbargo(values))}}> Remove Embargo</Button>
                        </Grid>
                      </Grid>
                    )
                    :(<Button 
                        variant="outlined"
                        color="primary"
                        onClick={() => {dispatch(addEmbargo())}}
                    > Add Embargo </Button>)
                  }

                  <Grid container spacing={2}>
                    <Grid item md={12} align='left' >
                      <Typography variant="h6">Review</Typography>
                    </Grid> 
                  </Grid>
                  <Grid container spacing={2}>
                    <FieldArray
                      name="review"
                      render={arrayHelpers => (
                        values.review && values.review.length > 0
                        ? (<CardContent>
                          {
                            values.review.map((contributor, index) => (
                              <Grid container key={index} spacing={2} alignItems="center">
                                <Grid item xs>
                                 <MyTextField name={`review[${index}].name`} label="Reviewer name" isFullWidth/>
                                </Grid>
                                <Grid item xs>
                                  <MyTextField name={`review[${index}].affiliation`} label="Reviewer affiliation" isFullWidth/>
                                </Grid>
                                <Grid item xs>
                                 <MyTextField name={`review[${index}].email`} label="Reviewer email" isFullWidth />
                                </Grid>
                                <Grid item xs>
                                  <MyTextField name={`review[${index}].orcid`} label="Reviewer orcid" isFullWidth />
                                </Grid>

                                <Grid item xs>
                                  <MyTextField name={`review[${index}].reviewer_comment`} label="Reviewer Comment" isFullWidth />
                                </Grid>
                                
                                <Grid item xs> 
                                  <MyTextField name={`review[${index}].status`} label="Reviewer orcid" isFullWidth />
                                </Grid>
                                <Grid item xs>
                                  <Button variant="outlined" color="primary" onClick={()=>{if(values.review.length>1 && index!==0){arrayHelpers.remove(index)}; }}> Remove </Button>
                                </Grid>
                              
                              </Grid>
                            ))
                            
                          }
                          <Grid item xs>
                            <Button variant="outlined" color="primary" onClick={()=> arrayHelpers.push({name:'',status:'unreviewed',  email:'', orcid:'',contribution:'createdby'})}> Add Review </Button>
                          </Grid>
                          
                        </CardContent>
                        )
                        : (<div>oops</div>)
                        
                      )
                      
                      }
                      
                      />
                  </Grid>

                  <Grid container spacing={2}> 
                    <Grid item xs>
                      <Button disabled={isSubmitting} type='submit' variant="contained" color="primary"> Save </Button>
                    </Grid>
                  </Grid>
                </Grid>
            </Form>
          )
          }  

        </Formik>
        </CardContent>
       </Card>
    </>
  )
}