import React from 'react';
import {Card, Typography, CardContent, TextField} from "@material-ui/core";

import { Formik, Form, Field, FieldArray, ErrorMessage, useField, useFormikContext } from 'formik';

import { useSelector, useDispatch } from 'react-redux'
import { updateDescription } from './rootSlice'

export const  DescriptionDomain = () => {
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
    const description_domain = useSelector(state => state.description_domain)

    return (
        <>
           <Card style={{background: "#D8D8D8"}}> 
                <CardContent>
                    <Typography variant='h4'> Description Domain</Typography>
                </CardContent>
                <Formik
                    initialValues={
                        description_domain
                    }
                    onSubmit={
                        (myData, {setSubmitting}) => {
                            setSubmitting(true);
                     
                            dispatch(updateDescription(myData));
                            setSubmitting(false);
                        }
                    }
                >
                  {
                    ({values, isSubmitting,errors}) => (
                        <Form>
                             <FieldArray
                                    name="pipeline_steps"
                                    render={arrayHelpers => (
                                    <div>
                                        {values["pipeline_steps"].map((aa, index) => (
                                        <div key={index}>
                                            {/** both these conventions do the same */}
                                            <MyTextField name={`pipeline_steps[${index}].step_number`} label="Step Number"/>
                                            <MyTextField name={`pipeline_steps.${index}.name`} label="Name"/>
                                            <MyTextField name={`pipeline_steps.${index}.description`} label="Description"/>

                                            <button type="button" onClick={() => arrayHelpers.remove(index)}>
                                            -
                                            </button>
                                        </div>
                                        ))}
                                        <button
                                        type="button"
                                        onClick={() => arrayHelpers.push({ name: '', step_number: '', description: ''})}
                                        >
                                        +
                                        </button>
                                    </div>
                                    )}
                                />                
                               
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