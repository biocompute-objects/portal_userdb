import React from "react";
import {Card, Typography, CardContent, Grid, Button} from "@material-ui/core";

import { Formik, Form, FieldArray } from "formik";

import { useSelector, useDispatch } from "react-redux"
import { updateExecutionDomain } from "../../slices/bcoSlice"

import { MyTextField } from "./specialFeilds"
import { Uri } from "./components"

export const ExecutionDomain = () => {
  const dispatch = useDispatch();
  const execution_domain = useSelector(state => state.bco.data.execution_domain);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h4'> Execution Domain</Typography>
        </CardContent>
        <Grid container justifyContent='center'>
          <Formik
            initialValues={
              execution_domain
            }
            onSubmit={
              (myData, {setSubmitting}) => {
                setSubmitting(true);
                dispatch(updateExecutionDomain(myData));
                setSubmitting(false);
              }
            }
          >
            {
              ({values, isSubmitting,}) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <MyTextField name="script_driver" type="input" placeholder="Script Driver"  label="Script Driver" />
                      </Grid>
                    </Grid>
                             
                    <Grid container spacing={2}>
                      <CardContent>   
                        <Grid container spacing={2} justifyContent='flex-start'>
                          <Grid item >
                            <Typography variant="h6"> Script</Typography>
                          </Grid> 
                        </Grid>
                        <Grid container>
                          <FieldArray
                            name="script"
                            render={arrayHelpers => (
                              <div>
                                {values["script"].map((script, script_index) => (
                                  <CardContent key={script_index}>
                                    <Grid container spacing={2} alignItems='center' justifyContent='flex-start'>
                                      <Uri uri_element={`script[${script_index}].uri`}/>                
                                      <Grid item xs>
                                        <Button
                                          variant='outlined'
                                          color='secondary'
                                          type="button"
                                          onClick={() => arrayHelpers.remove(script_index)}
                                        >Remove</Button>
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
                                  >Add</Button>
                                </Grid>
                              </div>
                            )}
                          />
                        </Grid> 
                      </CardContent>                 
                    </Grid>
                    <Grid container spacing={2}>
                      <CardContent>   
                        <Grid container spacing={2} justifyContent='flex-start'>
                          <Grid item >
                            <Typography variant="h6"> Software Prerequisites</Typography>
                          </Grid> 
                        </Grid>
                        <Grid container>
                          <FieldArray
                            name="software_prerequisites"
                            render={arrayHelpers => (
                              <div>
                                {values["software_prerequisites"].map((prereq, prereq_index) => (
                                  <CardContent key={prereq_index}>
                                    <Grid container spacing={2} alignItems='center' justifyContent='flex-start'>
                                      {/** both these conventions do the same */}
                                      <Grid item xs> 
                                        <MyTextField name={`software_prerequisites[${prereq_index}].name`} type="input" placeholder="Name" label='Name' isRequired isFullWidth/>
                                      </Grid>
                                      <Grid item xs> 
                                        <MyTextField name={`software_prerequisites[${prereq_index}].version`} type="input" placeholder="Version" label='Version' isRequired isFullWidth/>
                                      </Grid>
                                      <Uri uri_element={`software_prerequisites[${prereq_index}].uri`}/>                     
                                      <Grid item xs>
                                        <Button
                                          variant='outlined'
                                          color='secondary'
                                          onClick={() => arrayHelpers.remove(prereq_index)}
                                        >Remove</Button>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                ))}
                                <Grid item xs>
                                  <Button
                                    variant="outlined"
                                    color='primary'
                                    size='small'
                                    onClick={() => arrayHelpers.push({ name: "", version: "", uri: {filename: "", uri: "", access_time: "", sha1_checksum:""}})}
                                  >Add</Button>
                                </Grid>
                              </div>
                            )}
                          />
                        </Grid> 
                      </CardContent>                 
                    </Grid>
                    <Grid container spacing={2}>
                      <CardContent>   
                        <Grid container spacing={2} justifyContent='flex-start'>
                          <Grid item >
                            <Typography variant="h6"> External Data Endpoints </Typography>
                          </Grid> 
                        </Grid>
                        <Grid container>         
                          <FieldArray
                            name="external_data_endpoints"
                            render={arrayHelpers => (
                              <div>
                                {values["external_data_endpoints"].map((endpoint, endpoint_index) => (
                                  <CardContent key={endpoint_index}>
                                    <Grid container spacing={2} alignItems='center' justifyContent='flex-start'>
                                      <Grid item xs> 
                                        <MyTextField name={`external_data_endpoints[${endpoint_index}].name`} type="input" placeholder="Name" label='Name' isRequired isFullWidth/>
                                      </Grid>
                                      <Grid item xs> 
                                        <MyTextField name={`external_data_endpoints[${endpoint_index}].url`} type="input" placeholder="Url" label='Url' isRequired isFullWidth/>
                                      </Grid>
                                      <Grid item xs> 
                                        <Button
                                          variant='outlined'
                                          color='secondary'
                                          type="button"
                                          onClick={() => arrayHelpers.remove(endpoint_index)}
                                        >Remove</Button>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                ))}
                                <Grid item xs>
                                  <Button
                                    variant="outlined"
                                    color='primary'
                                    size='small'
                                    onClick={() => arrayHelpers.push({ name: "", url: ""})}
                                  >Add</Button>
                                </Grid>
                              </div>
                            )}
                          />
                        </Grid> 
                      </CardContent>                 
                    </Grid>
                  </Grid>
                  <div style={{padding: 20}}> 
                    <Button
                      disabled={isSubmitting}
                      type='submit'
                      variant="contained"
                      color="primary"
                    > Save </Button>
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