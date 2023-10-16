import React, { useState } from "react";
import {Box, Button, Card, CardContent, CardHeader, TextField} from "@material-ui/core";
import { Formik, Form} from "formik";
import { useSelector, useDispatch } from "react-redux"
import { updateBcoStatus, updateErrorDomain, updateModified } from "../../slices/bcoSlice"
import { FormObserver } from "./components";

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
              title="Error Domain"
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
                  defaultValue={JSON.stringify(algorithmic_error, null, 4)}
                  onChange={(event) => setInput(event.target)}
                  variant="outlined"
                />
                <TextField
                  id="empirical"
                  fullWidth
                  multiline
                  minRows={5}
                  defaultValue={JSON.stringify(empirical_error, null, 4)}
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