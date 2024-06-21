import React from "react";
import {Card, Typography, CardContent, Grid, Button, CardHeader} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux"
import { updateParametricDomain, updateModified } from "../../slices/bcoSlice"
import { MyTextField } from "./specialFeilds"
import { FormObserver, Next } from "./components";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

export const  ParametricDomain = ({onSave}) => {
    
  const dispatch = useDispatch();
  const parametric_domain = useSelector(state => state.bco.data.parametric_domain) || [];

  return (
    <Card>         
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
              <CardHeader
                title={
                  <span className="bold-title">
                    Parametric Domain
                    <Tooltip title="Explanation of Parametric Domain">
                      <Button size="xs" href='https://wiki.biocomputeobject.org/index.php?title=Parametric-domain'>
                        <HelpOutlineIcon />
                      </Button>
                    </Tooltip>
                  </span>
                }
                action={<Next/>}
              />
              <CardContent>
                <FieldArray
                  name="parametric_domain"
                  render={arrayHelpers => (
                    <div>
                      {values["parametric_domain"].map((paramater, index) => (
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
                              <Button
                                variant='outlined'
                                color='secondary'
                                type="button" onClick={() => arrayHelpers.remove(index)}>
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
                        >Add</Button>
                      </Grid>
                    </div>
                  )}
                />                
              </CardContent>   
            </Form>
          )
        }
      </Formik>
    </Card>
  )
}