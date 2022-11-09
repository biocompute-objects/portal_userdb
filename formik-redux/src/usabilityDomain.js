import React from 'react';
import {Card, Typography, CardContent, TextField, Grid} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext } from 'formik';

import { useSelector, useDispatch } from 'react-redux'
import { updateUsability } from './rootSlice'

export const  UsabilityDomain = () => {

   const dispatch = useDispatch();
   const usabilityDomain = useSelector(state => state.bco.data.usability_domain)
   //console.log("Usabilitly: ", usabilityDomain);
    return (
        <>
         <Card variant="outlined" style={{background: "#E5E4E2"}}>
                <Grid container spacing={2} justifyContent="center" >
                        <CardContent>
                            <Typography variant={"h4"} component={"span"}> Usability Domain</Typography>
                        </CardContent>
                    </Grid>
                </Card>
           <Card>

                <Formik
                    initialValues={{
                        "usability_domain":usabilityDomain
                    }
                    }
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

                            
                            {   
                                arrayHelpers => (
                             <div>
                                {/*console.log("values: ", values.usability_domain)*/}
                                {values.usability_domain && values.usability_domain.length > 0 ? (
 
                                values.usability_domain.map((friend, index) => (
                                    <div key={index}>
                                    <Field name={`usability_domain.${index}`} />
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                    >
                                        +
                                    </button>
                                    </div>
                                ))
                                ) : (
                                <button type="button" onClick={() => arrayHelpers.push('')}>
                                    {/* show this when user has removed all friends from the list */}
                                    Add 
                                </button>
                                )}
                              
                            </div>
                            )}
                                    
                             
                           
                             </FieldArray>
                             
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