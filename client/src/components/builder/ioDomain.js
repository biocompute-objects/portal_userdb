import React from "react";
import {Card, Typography, CardContent, Grid, Button, CardHeader} from "@material-ui/core";
import { Formik, Form, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux"
import { updateIODomain, updateModified } from "../../slices/bcoSlice"
import { MyTextField } from "./specialFeilds"
import { FormObserver, Next, removeEmptyValues, Uri } from "./components"
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from "@mui/material/Tooltip";

export const  IODomain = ({onSave}) => {
  const dispatch = useDispatch();
  const io_domain = useSelector(state => state.bco.data.io_domain)
  let has_input = "input_subdomain" in io_domain;
  let has_output = "output_subdomain" in io_domain;

  return (
    <>
      <Card> 
        <Formik
          initialValues={
            {
              "input_subdomain": has_input ? io_domain["input_subdomain"] : [],
              "output_subdomain": has_output ? io_domain["output_subdomain"] : []
            }
          }
          onSubmit={
            (myData, {setSubmitting}) => {
              const cleanData = removeEmptyValues(myData)
              setSubmitting(true);
              dispatch(updateIODomain(cleanData));
              dispatch(updateModified());
              setSubmitting(false);
              onSave()
            }
          }
        >
          {
            ({values, isSubmitting,errors}) => (
              <Form>
                <CardHeader
                  title={
                    <span className="bold-title">
                      I/O Domain
                      <Tooltip title="Explanation of IO Domain">
                        <Button size="xs" href='https://wiki.biocomputeobject.org/index.php?title=Iodomain'>
                          <HelpOutlineIcon />
                        </Button>
                      </Tooltip>
                    </span>
                  }
                  action={<Next />}
                />
                <CardContent >
                  <FormObserver/>
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
                              {values["output_subdomain"].map((aa, index) => (
                                <CardContent key={index}>
                                  <Grid container spacing={2} alignItems='center' justifyContent='center'>
                                    {/** both these conventions do the same */}
                                    <Grid item xs>
                                      <MyTextField name={`output_subdomain[${index}].mediatype`} label="Media Type" isRequired/>
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
                </CardContent>
              </Form>
            )
          }
        </Formik>
      </Card>
    </>
  )
}