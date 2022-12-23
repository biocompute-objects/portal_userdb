import * as React from 'react';
import { useState } from 'react';
import {Card, CardContent, Typography, Grid, Button, Paper, Select, MenuItem, InputLabel} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext, setValues } from 'formik';
import { Contribution } from './contibutor';
import { Reviewer } from './reviewer';

import { useSelector, useDispatch } from 'react-redux'
import { BaisicDateTimePicker, MyTextField, MyDateTimeField } from './specialFeilds';
import { updateProvenanceDomain } from '../../slices/bcoSlice'

export const  ProvenanceDomain = () => {
  const dispatch = useDispatch();
  const provenanceDomain = useSelector(state => state.bco.data.provenance_domain)
  let has_obsolete = "obsolete_after" in provenanceDomain;
  let has_embargo = "embargo" in provenanceDomain;
  let has_contributors = "contributors" in provenanceDomain;
  let has_review = "review" in provenanceDomain;
  const [obsolete, setObsolete] = useState('obsolete_after' in provenanceDomain)
  const [embargo, setEmbargo] = useState('embargo' in provenanceDomain)
  const [review, setReview] = useState('review' in provenanceDomain)
  console.log(has_obsolete, has_embargo, has_review)
  return (
    <>
       <Card> 
        <Paper>
          <Typography variant='h4'> Provenance Domain</Typography>
        </Paper>
        <CardContent>
        <Formik
          initialValues={
            {
              'name': provenanceDomain['name'],
              'version': provenanceDomain['version'],
              'license': provenanceDomain['license'],
              'created': provenanceDomain['created'],
              'modified': provenanceDomain['modified'],
              'obsolete_after': has_obsolete ? provenanceDomain['obsolete_after'] : [],
              'contributors': provenanceDomain['contributors'],
              'review': has_review ? provenanceDomain['review'] : [],
            }
          }
          onSubmit={
            (myData, {setSubmitting, setValues}) => {
              setSubmitting(true);
              console.log('myData', myData)
              if (obsolete === false) {
                delete myData['obsolete_after']
              }
              if (obsolete === false) {
                delete myData['embargo']
              }
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
          ({values, isSubmitting, errors, setFieldValue}) => (
            
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
                    <BaisicDateTimePicker name="created" placeholder="Created" isDisabled isFullWidth/>
                  </Grid>
                  <Grid item xs> 
                    <Typography> Modified: </Typography>
                  </Grid>
                  <Grid item xs> 
                    <BaisicDateTimePicker name="modified"  placeholder="Modified" isDisabled isFullWidth/>        
                  </Grid>
                </Grid> 
                <Grid container spacing={2}>
                    <Grid item md={12} align='left' >
                      <Typography variant="h6">Obsolete Date</Typography>
                    </Grid> 
                  </Grid>
                    <Grid container spacing={2}>
                      {obsolete === true
                        ? (
                          <Grid item >
                            <Typography> Obsolete After: </Typography>
                            <BaisicDateTimePicker
                              placeholder="Obsolete after"
                              name="obsolete_after"
                            />
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() =>{setObsolete(false)}}
                            > Remove Obsolete</Button>
                          </Grid>)
                        : (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>{
                              console.log('press', values.obsolete_after.length)
                              setObsolete(true)
                            }}
                          > Add Obsolete</Button>
                        )
                      }
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item md={12} align='left' >
                      <Typography variant="h6">Embargo</Typography>
                    </Grid> 
                  </Grid>
                    {embargo === true
                      ? (
                        <Grid container spacing={2}>
                          <Grid item xs>
                            <Typography> Start time: </Typography>
                          </Grid>
                          <Grid item xs>
                            <BaisicDateTimePicker name="embargo.start_time" placeholder="Start Time" isRequired isFullWidth/>
                          </Grid>
                          <Grid item xs> 
                            <Typography> End Time: </Typography>     
                          </Grid>
                          <Grid item xs>
                            <BaisicDateTimePicker  name="embargo.end_time"  placeholder="End Time" isRequired isFullWidth/>     
                          </Grid>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>{setEmbargo(false)}}
                          > Remove Embargo</Button>
                        </Grid>
                      )
                      : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() =>{setEmbargo(true)}}
                        > Add Embargo</Button>
                        )
                    }
                  <Grid container spacing={2}>
                    <Grid item md={12} align='left' >
                      <Typography variant="h6">Contributors</Typography>
                    </Grid> 
                  </Grid>
                  <Grid container spacing={2}>
                    <FieldArray
                      name='contributors'
                      render={arrayHelpers => (
                      <Grid item xs>
                        {values.contributors.map((contributor, index) => (
                          <CardContent key={index}>
                            <Contribution contributor={contributor} contributorPath={`contributors[${index}]`}/>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => {arrayHelpers.remove(index)}}
                            >Remove Contributor</Button>
                          </CardContent>
                        ))}
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={()=> {
                          arrayHelpers.push({name:'',affiliation:'',email:'',contribution:[],orcid:''})}}
                        >Add Contribution</Button>
                      </Grid>
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
                        <Grid item xs>
                          {values.review.map((reviewer, index) => (
                            <CardContent key={index}>
                              <Reviewer reviewer={reviewer} reviewerPath={`review[${index}]`}/>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={()=> {arrayHelpers.remove(index)}}
                              >Remove Review</Button>
                            </CardContent>
                          ))}
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={()=> {arrayHelpers.push({status:'unreviewed',reviewer_comment:'',date:'',reviewer: {name:'',affiliation: '',email:'',contribution:['curatedBy'],orcid:''}})}}
                          >Add Review</Button>
                        </Grid> 
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