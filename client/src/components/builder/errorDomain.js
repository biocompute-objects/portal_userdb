import React, { useState } from "react";
import {Box, Button, Card, CardContent, CardHeader, TextField} from "@mui/material";
import { Formik, Form} from "formik";
import { useSelector, useDispatch } from "react-redux"
import { writingBco, updateErrorDomain, updateModified } from "../../slices/bcoSlice"
import { FormObserver } from "./components";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

export const ErrorDomain = ({onSave}) => {
  const dispatch = useDispatch()
  const bco = useSelector(state => state.bco.data);
  let has_error = "error_domain" in bco; 
  const errorDomain = has_error ? bco.error_domain : {};
  const [writing, setWriting] = useState(false);
  let has_empirical = "empirical_error" in errorDomain;
  let has_algorithmic = "algorithmic_error" in errorDomain;
  const [jsonErrors, setJsonErrors] = useState("");
  const [algorithmic_error, setAlgo] = useState(has_algorithmic ? errorDomain.algorithmic_error : {algorithmic_error: "null" })
  const [empirical_error, setEmp ] = useState(has_empirical ? errorDomain.empirical_error : {empirical_error: "null"})

  const setInput = (target) => {
    setWriting(true);
    dispatch(writingBco(true));
    let holder = {};
    try {
      if (target.value.trim() === "") {
        holder = target.id === "algorithmic"
          ? { algorithmic_error: "null" }
          : { empirical_error: "null" };
      } else {
        holder = JSON.parse(target.value);
      }
      setJsonErrors("");
    } catch (e) {
      setJsonErrors(e);
      console.log("Caught: " + e.message);
    }
  
    if (target.id === "algorithmic") {
      setAlgo(holder);
    }
    if (target.id === "empirical") {
      setEmp(holder);
    }
  };
  

  const defaultAlgorithmicError = `{
    "algorithmic_error": "null"
  }`;

  const defaultEmpiricalError = `{
    "empirical_error": "null"
  }`;

  return (
    <Card className="object-domain">
      <Formik
        enableReinitialize={true}
        initialValues={{}}
        onSubmit={
          (values, {setSubmitting, setValues}) => {
            setSubmitting(true)
            console.log(values)
            setSubmitting(false)
          }
        }
      >
        {({values}) => (
          <Form>
            <FormObserver />
            <CardHeader 
              title={
                <span className="bold-title">
                  Error Domain
                  <Tooltip title="Explanation of Error Domain">
                    <Button size="small" target="_blank" href='https://github.com/biocompute-objects/BCO_Specification/blob/main/content/error-domain.md'>
                      <HelpOutlineIcon />
                    </Button>
                  </Tooltip>
                </span>
              }
              action={
                <Button 
                disabled={jsonErrors !== "" || !writing}
                variant="contained"
                color="primary"
                onClick={() => {
                  const finalAlgorithmic = 
                    algorithmic_error?.algorithmic_error !== undefined
                      ? algorithmic_error
                      : { algorithmic_error: "null" };

                  const finalEmpirical =
                    empirical_error?.empirical_error !== undefined
                      ? empirical_error
                      : { empirical_error: "null" };

                  dispatch(updateErrorDomain({
                    algorithmic_error: finalAlgorithmic,
                    empirical_error: finalEmpirical
                  }));
                  dispatch(updateModified());
                  dispatch(writingBco(false));
                  onSave();
                }}
                >
                Next
                </Button>
              }
            />
            <CardContent>
              {(jsonErrors !== "") ? (
                <Box
                  style={{backgroundColor: "red"}}
                >{jsonErrors.message}</Box>
              ) : 
                (<Box></Box>)}
              <Box>
                <TextField
                  id="algorithmic"
                  fullWidth
                  multiline
                  minRows={5}
                  defaultValue={
                    (Object.keys(algorithmic_error).length > 0 && JSON.stringify(algorithmic_error) !== "{}")
                      ? JSON.stringify(algorithmic_error, null, 4) 
                      : defaultAlgorithmicError 
                  }
                  onChange={(event) => setInput(event.target)}
                  variant="outlined"
                />
                <TextField
                  id="empirical"
                  fullWidth
                  multiline
                  minRows={5}
                  defaultValue={
                    Object.keys(empirical_error).length > 0
                      ? JSON.stringify(empirical_error, null, 4)
                      : defaultEmpiricalError
                  }
                  onChange={(event) => setInput(event.target)}
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Form>
        )}
      </Formik>
    </Card>)
}