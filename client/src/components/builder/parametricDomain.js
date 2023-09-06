import React from "react";
import {Card, Typography, CardContent, Grid, Button} from "@material-ui/core";
import { Formik, Form, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux"
import { updateParametricDomain, updateModified } from "../../slices/bcoSlice"
import { MyTextField } from "./specialFeilds"
import { FormObserver } from "./components";

export const  ParametricDomain = ({onSave}) => {
    
  const dispatch = useDispatch();
  const parametric_domain = useSelector(state => state.bco.data.parametric_domain)

  return (
    <>
      <Card> 
        <CardContent>
          <Typography variant='h4'> Parametric Domain</Typography>
        </CardContent>
        <Grid container justifyContent='center'>
          <Formik
            initialValues={
              {"parametric_domain":parametric_domain}
            }
            onSubmit={
              (myData, {setSubmitting}) => {
                setSubmitting(true);
                dispatch(updateParametricDomain(myData["parametric_domain"]));
                dispatch(updateModified());
                setSubmitting(false);
                onSave()
              }
            }
          >
            {
              ({values, isSubmitting, errors}) => (
                <Form>
                  <FormObserver />
                  <Grid container spacing={2}>
                    <FieldArray
                      name="parametric_domain"
                      render={arrayHelpers => (
                        <div>
                          {values["parametric_domain"].map((aa, index) => (
                            <CardContent key={index}>
                              <Grid container spacing={2} alignItems='center' justifyContent='center'>
                                <Grid item xs>
                                  <MyTextField name={`parametric_domain[${index}].step`} label="Step"/>
                                </Grid>
                                <Grid item xs>
                                  <MyTextField name={`parametric_domain.${index}.param`} label="Parameter"/>
                                </Grid>
                                <Grid item xs>
                                  <MyTextField name={`parametric_domain.${index}.value`} label="Value"/>
                                </Grid>
                                                    
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
                              onClick={() => arrayHelpers.push({ step: "", param: "", value: ""})}
                            >
                                        Add
                            </Button>
                          </Grid>
                        </div>
                      )}
                    />                
                  </Grid>   
                  <div style={{padding: 20}}> 
                    <Button disabled={isSubmitting} type='submit' variant="contained" color="primary"> Next </Button>
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