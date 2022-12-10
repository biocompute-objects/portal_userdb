import React from 'react';
import {
  Button,
  Card,
  Grid,
  Typography,
  CardContent,
  Paper
} from "@material-ui/core";
import {
  Formik,
  Form,
  Field,
  FieldArray
} from 'formik';
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
  addUsability,
  updateUsability,
  updateModified
} from './rootSlice'
import { LargeTextField } from './specialFeilds';

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
                dispatch(updateModified())
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
                            <Grid item key={index}>
                              <LargeTextField name={`usability_domain.${index}`} />
                              <button type="button" onClick={() => arrayHelpers.remove(index)}
                              > - </button>
                            </Grid>
                          )))
                        : (<div></div>)
                        }
                      </div>
                    )}
                  </FieldArray>
                  <div>
                    <Button type="button" onClick={() => dispatch(addUsability())}>Add </Button>
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