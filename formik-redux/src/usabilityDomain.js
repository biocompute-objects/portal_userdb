import React from 'react';
import {Card, Typography, CardContent, TextField} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext } from 'formik';

import { useSelector, useDispatch } from 'react-redux'
import { updateUsability } from './rootSlice'

export const  UsabilityDomain = () => {
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
   const dispatch = useDispatch();
   const usabilityDomain = useSelector(state => state.usability_domain)

    return (
        <>
           <Card style={{background: "#F5F5F5"}}> 
                <CardContent>
                    <Typography variant='h4'> Usability Domain</Typography>
                </CardContent>
                <Formik
                    initialValues={{
                        usabilityDomain
                    }
                    }
                    onSubmit={
                        (myData, {setSubmitting}) => {
                            setSubmitting(true);
                            dispatch(updateUsability(myData))
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