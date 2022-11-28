import React from 'react';
import {Button, Card, Typography, CardContent, TextField, Grid, Paper} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext } from 'formik';

import { useSelector, useDispatch } from 'react-redux'
import { addUsability, updateUsability } from './rootSlice'

export const  UsabilityDomain = () => {

   const dispatch = useDispatch();
   const usabilityDomain = useSelector(state => state.bco.data.usability_domain)
    return (
      <Card variant="outlined" style={{background: "#E5E4E2"}}>
        <Paper>
          <Typography variant={"h4"} component={"span"}> Usability Domain</Typography>
        </Paper>
        <CardContent>
          <Formik
            initialValues={{"usability_domain":usabilityDomain}}
            onSubmit={
              (myData, {setSubmitting}) => {
                setSubmitting(true);
                //console.log("myData: ", myData)
                dispatch(updateUsability(myData["usability_domain"]))
                setSubmitting(false);
              }
            }
          >
            {
              ({values, isSubmitting,errors}) => (
                <Form>
                  <FieldArray name='usability_domain'>
                    {arrayHelpers => (
                      <div>
                        {values.usability_domain && values.usability_domain.length > 0 
                        ? (
                          values.usability_domain.map((text, index) => (
                            <div key={index}>
                              <Field name={`usability_domain.${index}`} />
                              <button type="button" onClick={() => arrayHelpers.remove(index)}
                              > - </button>
                            </div>
                          ))
                        ) 
                        : (<div></div>)}
                      </div>
                    )}
                  </FieldArray>
                  <div>
                    <Button type="button" onClick={(event) => dispatch(addUsability(event.target.value))}>Add </Button>
                    <Button disabled={isSubmitting} varient="contained" color="primary" type='submit'> Save </Button>
                  </div>
                </Form>
              )
            }
          </Formik>
        </CardContent>
      </Card>
    )
  }