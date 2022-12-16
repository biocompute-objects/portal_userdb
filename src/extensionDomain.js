import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent, TextField, Typography, Grid, Button, Paper, Select, MenuItem, InputLabel} from "@material-ui/core";
import { Form, Formik, Field, FieldArray, ErrorMessage, useField, useFormikContext, setValues } from 'formik';
import { updateExtensionDomain } from './rootSlice'
import { MyTextField } from './specialFeilds';
import { Extension } from './extension';

export const  ExtensionDomain = () => {
  const dispatch = useDispatch();
  const extensionDomain = useSelector(state => state.bco.data.extension_domain)
  const [newSchema, setNewSchema] = React.useState()
  let has_extension = extensionDomain.length > 0

  return (
    <Card>
      <Paper>
        <Typography variant='h4'> Extension Domain</Typography>
      </Paper>
      <CardContent>
        <Formik
          initialValues={
            {"extension_domain": extensionDomain} 
          }
          onSubmit={
            (myData, {setSubmitting, setValues}) => {
              setSubmitting(true);
              console.log('myData', myData);
              dispatch(updateExtensionDomain(myData['extension_domain']));
              setSubmitting(false);
            }
          }
          validate={
            (values) => {
              const errors = {};
              return errors;
            }
          }>
          {
            ({values, isSubmitting, errors, setFieldValue}) => (
              <Form>
                <Grid container spacing={2}>
                <FieldArray
                  name='extension_domain'
                  render={arrayHelpers => (
                    <div>
                      <Grid container spacing={2}>
                        <TextField
                          fullWidth
                          onChange={(e) => setNewSchema(e.target.value)}
                        ></TextField>
                        <Button
                          variant='outlined'
                          color='primary'
                          size='small'
                          onClick={() => {
                            arrayHelpers.push({extension_schema: newSchema});
                            setNewSchema('')
                            console.log('hadley', values, extensionDomain);
                            }
                          }
                        >Add Extension</Button>
                      </Grid>
                      <Grid container spacing={2}>
                        {values['extension_domain'].map((extension, index) => (
                          <div key={index}>
                            {/* <div>{JSON.stringify(extension.extension_schema)}</div> */}
                            <Extension
                              extension={extension}
                              schemaUrl={extension.extension_schema}
                              index={index}
                              allExtensions={extensionDomain}
                            />
                            <Button
                              variant='outlined'
                              color='secondary'
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >Remove</Button>
                          </div>
                        ))}
                      </Grid>
                    </div>
                  )}
                />
                </Grid>
                <br/>
                <Button disabled={isSubmitting} type='submit' variant="contained" color="primary"> Save </Button>
              </Form>
            )
          }
          </Formik>
      </CardContent>
    </Card>
  )
}