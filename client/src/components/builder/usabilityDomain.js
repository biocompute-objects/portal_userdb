import React from "react";
import {
  Button,
  Card,
  Grid,
  CardContent,
  CardHeader
} from "@mui/material";
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
import { FormObserver, Next } from "./components";
import "../../App.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

export const  UsabilityDomain = ({onSave}) => {
  const dispatch = useDispatch();
  const usabilityDomain = useSelector(state => state.bco.data?.usability_domain) || [];
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
                title={
                  <span className="bold-title">
                                    Usability Domain
                    <Tooltip title="Explanation of Usability Domain">
                      <Button size="xs" href='https://wiki.biocomputeobject.org/index.php?title=Usability-domain'>
                        <HelpOutlineIcon />
                      </Button>
                    </Tooltip>
                  </span>
                }
                action={<Next />}
              />
              <CardContent>
                <FieldArray name='usability_domain'>
                  {arrayHelpers => (
                    <div>
                      {values.usability_domain.map((text, index) => (
                        <Grid item key={index}>
                          <LargeTextField name={`usability_domain.${index}`} />
                          <Button 
                            className="delete-button" 
                            type="button" 
                            onClick={() => arrayHelpers.remove(index)}>
                            <RemoveCircleIcon fontSize="23" />
                          </Button>
                        </Grid>
                      ))}
                      <Button 
                        className="add-button" 
                        type="button" 
                        onClick={() => arrayHelpers.push("")}>
                        <AddCircleIcon style={{ fontSize: 24}} />
                      </Button>
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