import React, { useState } from "react";
import {Card, Typography, CardContent, Grid, Button, TextField, CardHeader} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import { updateExecutionDomain, updateModified } from "../../slices/bcoSlice"
import { useSelector, useDispatch } from "react-redux"
import { MyTextField } from "./specialFeilds"
import { FormObserver, Next, Uri } from "./components"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

export const ExecutionDomain = ({onSave}) => {
  const dispatch = useDispatch();
  const execution_domain = useSelector(state => state.bco.data?.execution_domain) || {};
  let has_script = "script" in execution_domain;
  let has_driver = "script_driver" in execution_domain;
  let has_prereq = "software_prerequisites" in execution_domain;
  let has_external = "external_data_endpoints" in execution_domain;
  const environment_variables = useSelector(state => state.bco.data.execution_domain?.environment_variables) || [];
  const [envars, setEnvars] = useState(environment_variables)
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")

  const removeEnvar = (item) => {
    if (Object.entries(envars).length === 1) {
      setEnvars({})
    } else {
      const { [item[0]]: value, ...withoutKey} = environment_variables
      setEnvars(withoutKey)
    }
    setKey("");
    setValue("");
  }

  const addEnvar = () => {
    setEnvars({...envars, [key]:value});
    setKey("");
    setValue("");
  }

  return (
    <Card className="object-domain">
      <Formik
        initialValues={{
          "script": has_script ? execution_domain["script"] : [],
          "script_driver": has_driver ? execution_domain["scriopt+driver"] : "",
          "software_prerequisites": has_prereq ? execution_domain["software_prerequisites"] : [],
          "external_data_endpoints": has_external ? execution_domain["external_data_endpoints"] : []
        }}
        onSubmit={
          (formData, {setSubmitting}) => {
            setSubmitting(true);
            dispatch(updateExecutionDomain({formData, envars}));
            setSubmitting(false);
            dispatch(updateModified())
            onSave()
          }
        }
      >
        {
          ({values, isSubmitting,}) => (
            <Form>
              <FormObserver />
              <CardHeader
                title={
                  <span className="bold-title">
                      Execution Domain
                    <Tooltip title="Explanation of Execution Domain">
                      <Button size="xs" href='https://wiki.biocomputeobject.org/index.php?title=Execution-domain'>
                        <HelpOutlineIcon />
                      </Button>
                    </Tooltip>
                  </span>
                }
                action={<Next />}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <MyTextField name="script_driver" type="input" placeholder="Script Driver"  label="Script Driver" />
                    </Grid>
                  </Grid>      
                  <Grid container spacing={2}>
                    <CardContent>   
                      <Grid container spacing={2} justifyContent='flex-start'>
                        <Grid item >
                          <Typography variant="h6"> Script</Typography>
                        </Grid> 
                      </Grid>
                      <Grid container>
                        <FieldArray
                          name="script"
                          render={arrayHelpers => (
                            <div>
                              {values["script"].map((script, script_index) => (
                                <CardContent key={script_index}>
                                  <Grid container spacing={2} alignItems='center' justifyContent='flex-start'>
                                    <Uri uri_element={`script[${script_index}].uri`}/>                
                                    <Grid item xs>
                                      <Button
                                        variant='outlined'
                                        color='secondary'
                                        type="button"
                                        onClick={() => arrayHelpers.remove(script_index)}
                                      >Remove</Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              ))}
                              <Grid item xs>
                                <Button
                                  variant="outlined"
                                  color='primary'
                                  size='small'
                                  onClick={() => arrayHelpers.push({uri:{ filename: "", uri: "", access_time: "", sha1_checksum:""}})}
                                >Add</Button>
                              </Grid>
                            </div>
                          )}
                        />
                      </Grid> 
                    </CardContent>                 
                  </Grid>
                  <Grid container spacing={2}>
                    <CardContent>   
                      <Grid container spacing={2} justifyContent='flex-start'>
                        <Grid item >
                          <Typography variant="h6"> Software Prerequisites</Typography>
                        </Grid> 
                      </Grid>
                      <Grid container>
                        <FieldArray
                          name="software_prerequisites"
                          render={arrayHelpers => (
                            <div>
                              {values["software_prerequisites"].map((prereq, prereq_index) => (
                                <CardContent key={prereq_index}>
                                  <Grid container spacing={2} alignItems='center' justifyContent='flex-start'>
                                    {/** both these conventions do the same */}
                                    <Grid item xs> 
                                      <MyTextField name={`software_prerequisites[${prereq_index}].name`} type="input" placeholder="Name" label='Name' isRequired isFullWidth/>
                                    </Grid>
                                    <Grid item xs> 
                                      <MyTextField name={`software_prerequisites[${prereq_index}].version`} type="input" placeholder="Version" label='Version' isRequired isFullWidth/>
                                    </Grid>
                                    <Uri uri_element={`software_prerequisites[${prereq_index}].uri`}/>                     
                                    <Grid item xs>
                                      <Button
                                        variant='outlined'
                                        color='secondary'
                                        onClick={() => arrayHelpers.remove(prereq_index)}
                                      >Remove</Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              ))}
                              <Grid item xs>
                                <Button
                                  variant="outlined"
                                  color='primary'
                                  size='small'
                                  onClick={() => arrayHelpers.push({ name: "", version: "", uri: {filename: "", uri: "", access_time: "", sha1_checksum:""}})}
                                >Add</Button>
                              </Grid>
                            </div>
                          )}
                        />
                      </Grid> 
                    </CardContent>                 
                  </Grid>
                  <Grid container spacing={2}>
                    <CardContent>   
                      <Grid container spacing={2} justifyContent='flex-start'>
                        <Grid item >
                          <Typography variant="h6"> External Data Endpoints </Typography>
                        </Grid> 
                      </Grid>
                      <Grid container>         
                        <FieldArray
                          name="external_data_endpoints"
                          render={arrayHelpers => (
                            <div>
                              {values["external_data_endpoints"].map((endpoint, endpoint_index) => (
                                <CardContent key={endpoint_index}>
                                  <Grid container spacing={2} alignItems='center' justifyContent='flex-start'>
                                    <Grid item xs> 
                                      <MyTextField name={`external_data_endpoints[${endpoint_index}].name`} type="input" placeholder="Name" label='Name' isRequired isFullWidth/>
                                    </Grid>
                                    <Grid item xs> 
                                      <MyTextField name={`external_data_endpoints[${endpoint_index}].url`} type="input" placeholder="Url" label='Url' isRequired isFullWidth/>
                                    </Grid>
                                    <Grid item xs> 
                                      <Button
                                        variant='outlined'
                                        color='secondary'
                                        type="button"
                                        onClick={() => arrayHelpers.remove(endpoint_index)}
                                      >Remove</Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              ))}
                              <Grid item xs>
                                <Button
                                  variant="outlined"
                                  color='primary'
                                  size='small'
                                  onClick={() => arrayHelpers.push({ name: "", url: ""})}
                                >Add</Button>
                              </Grid>
                            </div>
                          )}
                        />
                      </Grid> 
                    </CardContent>                 
                  </Grid>
                  <Grid container spacing={2} justifyContent='center'>
                    <CardContent>
                      <Typography variant='h6'>Environment Variables</Typography>
                    </CardContent>
                  </Grid>
                  <Grid container spacing={2} justifyContent='center'>
                    <CardContent>
                      {Object.entries(envars).map((item, index) => (
                        <Grid container key={index} >
                          <Grid item>
                            {item[0]} : {item[1]}
                          </Grid>
                          <Grid item>
                            <Button
                              variant="outlined"
                              color='primary'
                              size='small'
                              onClick={() => removeEnvar(item)}
                            >remove</Button>
                          </Grid>
                        </Grid>
                      ))}
                      <Grid container>
                        <Grid item>
                          <TextField
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                          />:
                          <TextField
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            disabled={key === "" || value === ""}
                            onClick={addEnvar}
                          >add</Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardContent>
            </Form>
          )
        }
      </Formik>
    </Card>
  )
}