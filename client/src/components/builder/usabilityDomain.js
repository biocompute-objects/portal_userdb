import React from "react";
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
  FieldArray
} from "formik";

import {
  useSelector,
  useDispatch
} from "react-redux"

import {
  updateUsability,
  updateModified
} from "../../slices/bcoSlice"

import { LargeTextField } from "./specialFeilds";
import { Next } from "./components";

export const  UsabilityDomain = ({onSave}) => {
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
              onSave()
            }
          }
        >
          {
            ({values, isSubmitting, errors}) => (
              <Form>
                <FieldArray name='usability_domain'>
                  {arrayHelpers => (
                    <div>
                      {values.usability_domain.map((text, index) => (
                        <Grid item key={index}>
                          <LargeTextField name={`usability_domain.${index}`} />
                          <button type="button" onClick={() => arrayHelpers.remove(index)}
                          > Remove </button>
                        </Grid>
                      ))}
                      <Button type="button" onClick={() => arrayHelpers.push("")}>Add </Button>
                    </div>
                  )}
                </FieldArray>
                <div>
                  <Next />
              </Form>
            )
          }
        </Formik>
      </CardContent>
    </Card>
  )
}