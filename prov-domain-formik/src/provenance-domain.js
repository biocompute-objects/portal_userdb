import React from 'react';
import { Formik, Form, Field, FieldArray, useField, useFormikContext } from 'formik';
import { Card, CardContent, Divider , TextField, Select, MenuItem, Typography, Grid } from "@material-ui/core";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export function ProvenanceDomain () {
    
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
    const DatePickerField = ({ placeholder,...props }) => {
        const { setFieldValue } = useFormikContext();
        const [field] = useField(props);
        return (
          <Datetime
            {...field}
            {...props}
            placeholder={placeholder}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
              setFieldValue(field.name, val);
            }}
          />
        );
        }

    return (
       
           
            <Grid container spacing={1}>
                <Card>
                    <CardContent>
                        <Typography variant='h4'> Provenance Domain</Typography>
            <Formik 
                initialValues={{
                    name: '',
                    version: '',
                    licence:'',
                    review: [{name:'',status:'unreviewed', id:'' + Math.random(), email:'', orcid:'',contribution:'createdby'}],
                    contributor: [{name:'',affiliation:'', id:'' + Math.random(), email:'',orcid:'',contribution:'createdby'}]
                }}
                onSubmit={
                    (myData, {setSubmitting})=> {
                        setSubmitting(true)
                        alert("Submitting",myData)
                        // might have some async call,
                        setSubmitting(false)
                    }
                }
                validate={(values) => {
                    const errors = {};

                    if (!values.name) {
                        errors.name = "Required";
                    }
                    if (values.name.length < 2) {
                        errors.name = "Should be more than 2 characters";
                    }
                    if (!values.version) {
                        errors.version = "Required";
                    }
                    if (!values.version.startsWith("BCO") ) {
                        errors.version = "should start with BCOxxxxx";
                    }
                    if (!values.licence) {
                        errors.licence = "Required";
                    }

                    return errors;
                }}
            
            >
            { ({values, isSubmitting, errors})=>(
                
                <Form>
                    <Grid container spacing={2}>
                        <Grid item md={4}>
                            <MyTextField name="name" type="input" placeholder="Name" label='Name'/>                        
                        </Grid>
                        <Grid item md={4}>
                             <MyTextField name="version" type="input" placeholder="Version" label="Version"/>                              
                        </Grid>
                        <Grid item md={4}>
                            <MyTextField name="licence" type="input" placeholder="Licence" label="Licence"/>           
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                        <MyTextField name="derive-from" type="input" placeholder="Derived From" label="Derived From"/>           
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={2}>
                            <span> Created: </span>
                        </Grid>
                        <Grid item md={3}>
                            
                            <DatePickerField name="created" type="input" placeholder="Created"/>
                        </Grid>
                        <Grid item md={2}> 
                            <span> Modified: </span>
                        </Grid>
                        <Grid item md={3}> 
                            <DatePickerField name="modified" type="input" placeholder="Modified"/>              
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item md={12} align='left' >
                            <Typography variant="h6">-- Embargo --</Typography>
                        </Grid> 
                    </Grid>
                    <Grid container spacing={2}>                        
                        <Grid item md={2}>
                            <span> Start time: </span>
                        </Grid>
                        <Grid item md={3}>
                            <DatePickerField name="embargo.start_time" type="input" placeholder="Start Time"/>
                        </Grid>
                        <Grid item md={2}> 
                            <span> End Time: </span>               
                        </Grid>
                        <Grid item md={3}>
                            <DatePickerField name="embargo.end_time" type="input" placeholder="End Time"/>               
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={12} align='left' >
                            <Typography variant="h6">-- Reviewer --</Typography>
                        </Grid> 
                    </Grid>
                    <Grid container spacing={2}>
                                                
                        <FieldArray name='review'>
                            { arrayHelpers => (
                                <div>
                                    {
                                        values.review.map( (review_object,index)=> {
                                                //const name = `review.${index}.name`
                                                return (
                                                    <div key={values.review.id}>
                                                        <Grid container>
                                                            <Grid container spacing={1}>
                                                                <Grid item md={1}>
                                                                    <span> Date: </span> 
                                                                </Grid>
                                                                <Grid item md={2}>
                                                                    <DatePickerField name={`review.${index}.date`} type="input" placeholder="Date"/>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={1}>
                                                                <Grid item md={2}>
                                                                    <MyTextField name={`review.${index}.name`} type="input" placeholder="Reviewer Name" label='Reviewer Name' />
                                                                </Grid>
                                                                <Grid item md={1}>
                                                                    <Field type='select' as={Select} name={`review.${index}.status`}>
                                                                        <MenuItem value='unreviewed'> Unreviewed</MenuItem>
                                                                        <MenuItem value='in-review'>In-Review</MenuItem>
                                                                        <MenuItem value='approved'> Approved</MenuItem>
                                                                        <MenuItem value='rejected'> Rejected</MenuItem>
                                                                        <MenuItem value='suspended'> Suspended</MenuItem>
                                                                    </Field> 
                                                                </Grid>
                                                                <Grid item md={1}>
                                                                    <Field type='select' as={Select} name={`review.${index}.contribution`}>
                                                                        <MenuItem value='createdby'> Created By</MenuItem>
                                                                        <MenuItem value='authoredBy'> Authored By</MenuItem>
                                                                    </Field> 
                                                                </Grid>
                                                                <Grid item md={2}>
                                                                    <MyTextField name={`review.${index}.email`} type="input" placeholder="Reviewer Email" label='Reviewer Email' />
                                                                </Grid>
                                                                <Grid item md={2}>
                                                                    <MyTextField name={`review.${index}.orcid`} type="input" placeholder="Reviewer ORCID" label='Reviewer ORCID' />
                                                                </Grid>
                                                                <Grid item md={2}>
                                                                    <MyTextField name={`review.${index}.comment`} type="input" placeholder="Reviewer Comment" label='Reviewer Comment' />
                                                                </Grid>
                                                                <Grid item md={2}>
                                                                    <button onClick={()=> arrayHelpers.remove(index)}> Remove </button>
                                                                </Grid>
                                                            </Grid>
                                                           
                                                        
                                                        </Grid>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                    <button onClick={()=> arrayHelpers.push({name:'',status:'',id:'' + Math.random(),email:''})}> Add Review </button>
                                   
                                </div>

                            )
                            }

                        </FieldArray>
                        <Grid item md={12}>
                            <Divider orientation='horizontal' flexItem ></Divider>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item md={12} align='left' >
                            <Typography variant="h6">-- Contributor --</Typography>
                        </Grid> 
                    </Grid>
                    <Grid container rowSpacing={2} columnSpacing={{ md:1, sm:2, xs:1, lg:1 }}>
                                                
                        <FieldArray name='contributor'>
                            { arrayHelpers => (
                                <div>
                                    {
                                        values.contributor.map( (contributor_object,index)=> {
                                                //const name = `review.${index}.name`
                                                return (
                                                    <div key={values.contributor.id}>
                                                        <Grid container>
                                                            <Grid container spacing={1}>
                                                                <Grid item md={1}>
                                                                    <span> Date: </span> 
                                                                </Grid>
                                                                <Grid item md={2}>
                                                                    <DatePickerField name={`contributor.${index}.date`} type="input" placeholder="Date"/>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={1}>
                                                                <Grid item md={2}>
                                                                    <MyTextField name={`contributor.${index}.name`} type="input" placeholder="contributor Name" label='Contributor Name' />
                                                                </Grid>
                                                               
                                                                <Grid item md={1} spacing={2}>
                                                                    <Field type='select' as={Select} name={`contributor.${index}.contribution`}>
                                                                        <MenuItem value='createdby'> Created By</MenuItem>
                                                                        <MenuItem value='authoredBy'> Authored By</MenuItem>
                                                                    </Field> 
                                                                </Grid>
                                                                <Grid item md={2}>
                                                                    <MyTextField name={`contributor.${index}.email`} type="input" placeholder="contributor Email" label='contributor Email' />
                                                                </Grid>
                                                                <Grid item md={2}>
                                                                    <MyTextField name={`contributor.${index}.orcid`} type="input" placeholder="Reviewer ORCID" label='Reviewer ORCID' />
                                                                </Grid>
                                                                
                                                                <Grid item md={2}>
                                                                    <button onClick={()=> arrayHelpers.remove(index)}> Remove </button>
                                                                </Grid>
                                                               
                                                            </Grid>
                                                            
                                                        
                                                        </Grid>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                    <button onClick={()=> arrayHelpers.push({name:'',status:'',id:'' + Math.random(),email:''})}> Add Contributor </button>
                                   
                                </div>

                            )
                            }

                        </FieldArray>
                        <Grid item md={12}>
                            <Divider orientation='horizontal' flexItem></Divider>
                        </Grid>
                    </Grid>


                    <pre>{JSON.stringify(values,null,2)}</pre>
                    
                    <div>
                        <button disabled={isSubmitting} type='submit'> Submit </button>
                    </div>
                </Form>
               
            )}

            </Formik>
            </CardContent>
            </Card>
            </Grid>
         
   )
}