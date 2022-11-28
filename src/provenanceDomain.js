import React from 'react';
import {Card, CardContent, Typography, Grid, Button, Paper, Select, MenuItem, InputLabel} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext, setValues } from 'formik';
//import Datetime from 'react-datetime';
//import 'react-datetime/css/react-datetime.css';
import { Contribution } from './contibutor';
import { Review } from './review';

import { useSelector, useDispatch } from 'react-redux'
import { MyDateTimeField, MyTextField } from './specialFeilds';
import { addObsolete, deleteObsolete, addContribution, updateProvenanceDomain, addEmbargo, deleteEmbargo, addReview } from './rootSlice'

export const  ProvenanceDomain = () => {
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
          initialValues={provenanceDomain}
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
          validate={
            (values) => {
                const errors = {};
                console.log()
                if (!values.contributors) {
                    errors.contributors = "Required";
                }
                return errors;
            }
        }
        >
          {
          ({values, isSubmitting,errors}) => (
            
            <Form>
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
                      <Typography variant="h6">Obsolescence</Typography>
                    </Grid> 
                  </Grid>
                  {
                    (values.obsolete_after)
                    ? (
                        <Grid container spacing={2}>
                          <Grid item >
                            <Typography> Obsolete After: </Typography>
                            <MyDateTimeField
                              placeholder="Obsolete after"
                              name="obsolete_after"
                            />
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>{dispatch(deleteObsolete(values))}}
                            > Remove Obsolescence</Button>
                        </Grid>
                        </Grid>)
                    : (
                      <Grid container spacing={2}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {dispatch(addObsolete())}}
                        > Add Obsolescence </Button>
                      </Grid>
                      )
                  }
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
                          <MyDateTimeField name="embargo.start_time" placeholder="Start Time" isRequired isFullWidth/>
                        </Grid>
                        <Grid item xs> 
                          <Typography> End Time: </Typography>     
                        </Grid>
                        <Grid item xs>
                          <MyDateTimeField  name="embargo.end_time"  placeholder="End Time" isRequired isFullWidth/>     
                        </Grid>
                        <Grid item xs>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>{dispatch(deleteEmbargo(values))}}
                          > Remove Embargo</Button>
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
                      <Typography variant="h6">Contributors</Typography>
                    </Grid> 
                  </Grid>
                  <Grid container spacing={2}>
                    <FieldArray
                      name='Contributors'
                      render={arrayHelpers => (
                        values.contributors && values.contributors.length > 0
                        ? ( <CardContent>
                              <Contribution contributors={values.contributors} />
                          </CardContent>)
                        : (<Grid item xs>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={()=> {dispatch(addContribution())}}
                            >Add Contribution</Button>
                          </Grid>)
                      )}
                    />
                  </Grid>
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
                             <Review review={values.review} />
                           </CardContent>
                        )
                        : (<Grid item xs>
                            <Button variant="outlined" color="primary" onClick={() => {dispatch(addReview())}}>
                               Add Review
                            </Button>
                          </Grid>) 
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