import React from "react";
import {Card, Typography, CardContent, TextField, Grid, Button} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext } from "formik";

import { useSelector, useDispatch } from "react-redux"
import { updateIODomain } from "../../slices/bcoSlice"

import { MyTextField, BaisicDateTimePicker } from "./specialFeilds"
import { Uri } from "./components"

export const  IODomain = () => {
  const dispatch = useDispatch();
  const io_domain = useSelector(state => state.bco.data.io_domain)
  let has_input = "input_subdomain" in io_domain;
  let has_output = "output_subdomain" in io_domain;

  return (
    <>
      <Card> 
        <CardContent>
          <Typography variant='h4'> IO Domain</Typography>
        </CardContent>
        <Grid container justifyContent='center'>
          <Formik
            initialValues={
              {
                "input_subdomain": has_input ? io_domain["input_subdomain"] : [],
                "output_subdomain": has_output ? io_domain["output_subdomain"] : []
              }
            }
            onSubmit={
              (myData, {setSubmitting}) => {
                setSubmitting(true);
                dispatch(updateIODomain(myData));
                setSubmitting(false);
              }
            }
          >
            {
              ({values, isSubmitting,errors}) => (
                <Form>
                   
                             
                  <Grid container spacing={2}>
                    <CardContent>   
                      <Grid container spacing={2} justifyContent='center'>
                        <Grid item >
                          <Typography variant="h6">Input Subdomain</Typography>
                        </Grid> 
                      </Grid>
                      <Grid container>
                                
                        <FieldArray
                          name="input_subdomain"
                          render={arrayHelpers => (
                            <div>
                              {values["input_subdomain"].map((aa, index) => (
                                <CardContent key={index}>
                                  <Grid container spacing={2} alignItems='center' justifyContent='center'>
                                    {/** both these conventions do the same */}
                                               

                                    <Uri uri_element={`input_subdomain[${index}].uri`}/>
                                                    
                                    <Grid item xs>
                                      <Button variant='outlined' color='secondary' type="button" onClick={() => arrayHelpers.remove(index)}>
                                                    Remove
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              ))}
                              <Grid item xs>
                                <Button
                                  variant="outlined"
                                  color='primary'
                                  size='small'
                                  onClick={() => arrayHelpers.push({ filename: "", uri: "", access_time: "", sha1_checksum:""})}
                                >
                                        Add
                                </Button>
                              </Grid>
                            </div>
                          )}
                        />
                      </Grid> 
                    </CardContent>   
                    <CardContent>
                      <Grid container spacing={2} justifyContent='center'>
                        <Grid item align='left' >
                          <Typography variant="h6">Output Subdomain</Typography>
                        </Grid> 
                      </Grid>
                      <Grid container>
                                
                        <FieldArray
                          name="output_subdomain"
                          render={arrayHelpers => (
                            <div>
                              {/*console.log(values)*/}
                              {values["output_subdomain"].map((aa, index) => (
                                <CardContent key={index}>
                                  <Grid container spacing={2} alignItems='center' justifyContent='center'>
                                    {/** both these conventions do the same */}
                                    <Grid item xs>
                                      <MyTextField name={`output_subdomain[${index}].mediatype`} label="Media Type"/>
                                    </Grid>
                                    <Uri uri_element={`output_subdomain[${index}].uri`}/>
                                                    
                                    <Grid item xs>
                                      <Button variant='outlined' color='secondary' type="button" onClick={() => arrayHelpers.remove(index)}>
                                                    Remove
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              ))}
                              <Grid item xs>
                                <Button
                                  variant="outlined"
                                  color='primary'
                                  size='small'
                                  onClick={() => arrayHelpers.push({ mediatype:"",uri: {filename: "", uri: "", access_time: "", sha1_checksum:""}})}
                                >
                                        Add
                                </Button>
                              </Grid>
                            </div>
                          )}
                        />
                      </Grid>
                    </CardContent>                  
                  </Grid>
                               
                  <div style={{padding: 20}}> 
                    <Button disabled={isSubmitting} type='submit' variant="contained" color="primary"> Save </Button>
                  </div>
                      

                </Form>
              )
            }  

          </Formik>
        </Grid>
      </Card>
    </>
  )
}