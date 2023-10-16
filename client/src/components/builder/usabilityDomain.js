import React from "react";
import {
  Button,
  Card,
  Grid,
  CardContent,
  CardHeader
} from "@material-ui/core";
import {
  Formik,
  Form,
  Field,
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
import { FormObserver, Next } from "./components";
import "../../App.css";

export const  UsabilityDomain = ({onSave}) => {
  const dispatch = useDispatch();
  const usabilityDomain = useSelector(state => state.bco.data.usability_domain)
  return (
    <Card className="object-domain">
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
              <FormObserver />
              <CardHeader 
                title="Usability Domain"
                action={<Next />}
              />
              <CardContent>
                <FieldArray name='usability_domain'>
                  {arrayHelpers => (
                    <div>
                      {values.usability_domain.map((text, index) => (
                        <Grid item key={index}>
                          <LargeTextField name={`usability_domain.${index}`} />
                          <button type="button" onClick={() => arrayHelpers.remove(index)}
                          > - </button>
                        </Grid>
                      ))}
                      <Button type="button" onClick={() => arrayHelpers.push("")}>Add </Button>
                    </div>
                  )}
                </FieldArray>
              </CardContent>
            </Form>
          )
        }
      </Formik>
    </Card>
  )
}