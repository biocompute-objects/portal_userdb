import React, { useState } from "react";
import {Box, Button, Card, CardContent, CardHeader, TextField} from "@material-ui/core";
import { Formik, Form} from "formik";
import { useSelector, useDispatch } from "react-redux"
import { updateBcoStatus, updateErrorDomain, updateModified } from "../../slices/bcoSlice"
import { FormObserver } from "./components";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from "@mui/material/Tooltip";
import { colors } from "@mui/joy";

export const ErrorDomain = ({onSave}) => {
  const dispatch = useDispatch()
  const error_domain = useSelector(state => state.bco.data.error_domain)
  const [writing, setWriting] = useState(false);
  let has_empirical = "empirical_error" in error_domain;
  let has_algorithmic = "algorithmic_error" in error_domain;
  const [jsonErrors, setJsonErrors] = useState("");
  const [algorithmic_error, setAlgo] = useState(has_algorithmic ? error_domain.algorithmic_error : {})
  const [empirical_error, setEmp ] = useState(has_empirical ? error_domain.empirical_error : {})

  const setInput = (target) => {
    setWriting(true)
    dispatch(updateBcoStatus(true))
    let holder = {};
    try {
      holder = JSON.parse(target.value);
      setJsonErrors("")
    } catch (e) {
      setJsonErrors(e)
      console.log("Caught: " + e.message)
    }
    if (target.id === "algorithmic") {
      setAlgo(holder);
    }
    if (target.id === "empirical") {
      setEmp(holder);
    }
  };

  const defaultAlgorithmicError = `{
    "algorithmic_error": { 
      "false_positive_mutation_calls": "<0.00005", 
      "false_discovery": "0.005"
    }
  }`;

  const defaultEmpiricalError = `{
    "empirical_error": {
      "false_negative_alignment_hits": "<0.0010", 
      "false_discovery": "<0.05"
    }
  }`

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
                    <Button size="small" href='https://github.com/biocompute-objects/BCO_Specification/blob/main/content/error-domain.md'>
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
                    dispatch(updateErrorDomain({empirical_error, algorithmic_error}))
                    dispatch(updateModified())
                    dispatch(updateBcoStatus(false))
                    onSave()
                  }}
                > Next </Button>
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
                    (Object.keys(algorithmic_error).length > 0 && JSON.stringify(algorithmic_error) !== '{}')
                      ? JSON.stringify(algorithmic_error, null, 4) 
                      : defaultAlgorithmicError 
                  }
                  onChange={(event) => setInput(event.target)}
                  variant="outlined"
                />
                <TextField
                  id="empirical"
                  className="largeTextField"
                  fullWidth
                  multiline
                  minRows={5}
                  defaultValue={
                    Object.keys(empirical_error).length > 0
                      ? JSON.stringify(empirical_error, null, 4)
                      : defaultEmpiricalError
                  }
                  // defaultValue={JSON.stringify(empirical_error, null, 4)}
                  onChange={(event) => setInput(event.target)}
                  // variant="outlined"
                />
              </Box>
            </CardContent>
          </Form>
        )}
      </Formik>
    </Card>)
}