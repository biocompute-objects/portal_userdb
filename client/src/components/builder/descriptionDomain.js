import React from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  TextField,
  CardHeader
} from "@mui/material";
import {Autocomplete } from "@material-ui/lab";
import { Formik, Form, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux"
import { updateDescription } from "../../slices/bcoSlice"
import { LargeTextField, MyTextField } from "./specialFeilds";
import { FormObserver, Next, Uri } from "./components"
import "../../App.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

export const  DescriptionDomain = ({onSave}) => {
  const dispatch = useDispatch();
  const description_domain = useSelector(state => state.bco.data?.description_domain) || {};
  let has_keywords = "keywords" in description_domain;
  let has_xref = "xref" in description_domain;
  let has_platform = "platform" in description_domain; 
  let has_pipeline = "pipeline_steps" in description_domain;

  return (
    <Card className="object-domain">
      <Formik
        initialValues={{
          "keywords": has_keywords ? description_domain["keywords"] : [],
          "xref" : has_xref ? description_domain["xref"] : [],
          "platform": has_platform ? description_domain["platform"] : [],
          "pipeline_steps": has_pipeline ? description_domain["pipeline_steps"]: [],
        }}
        onSubmit={
          (myData, {setSubmitting}) => {
            setSubmitting(true);
            dispatch(updateDescription(myData));
            setSubmitting(false);
            onSave()
          }
        }
      >
        {
          ({values, isSubmitting, errors, setFieldValue}) => (
            <Form>
              <CardHeader 
                title={
                  <span className="bold-title">
                                    Description Domain
                    <Tooltip title="Explanation of Description Domain">
                      <Button size="xs" href='https://wiki.biocomputeobject.org/index.php?title=Description-domain'>
                        <HelpOutlineIcon />
                      </Button>
                    </Tooltip>
                  </span>
                }
                action={<Next />}  
              />
              <FormObserver />
              <Card>
                <br/>
                <Grid container spacing={2} alignItems="center">                      
                  <Grid item xs>
                    <Autocomplete
                      multiple
                      name="keywords"
                      options={[]}
                      freeSolo
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={index}
                            variant="outlined"
                            color="primary"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      value={values.keywords}
                      onChange={(e, new_keyword)=>{
                        setFieldValue("keywords",new_keyword);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="keywords"
                          name="keywords"
                          placeholder='type and enter'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs>
                    <Autocomplete
                      multiple
                      name="platform"
                      options={[]}
                      freeSolo
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={index}
                            variant="outlined"
                            label={option}
                            color="primary"
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      value={values.platform}
                      onChange={(e, new_keyword)=>{
                        setFieldValue("platform",new_keyword);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="platform"
                          placeholder='type and enter'
                          name="platform"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Card>
              <FieldArray
                name="xref"
                render={arrayHelpers => (
                  <Card>
                    <Typography gutterBottom variant='h5'>External References</Typography>
                    {
                      values.xref
                        ?(<div>
                          {values["xref"].map((ref, index) => (
                            <CardContent key={index}>
                              <Grid container>
                                <Grid item>
                                  <MyTextField name={`xref[${index}].name`} label={"Name"}/>
                                </Grid>
                                <Grid item>
                                  <MyTextField name={`xref[${index}].namespace`} label={"Namespace"} />
                                </Grid>
                                <Grid item xs>
                                  <Autocomplete
                                    multiple
                                    name="IDs"
                                    options={[]}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                      value.map((option, index) => (
                                        <Chip
                                          key={index}
                                          variant="outlined"
                                          color="primary"
                                          label={option}
                                          {...getTagProps({ index })}
                                        />
                                      ))
                                    }
                                    value={ref.ids}
                                    onChange={(e, new_id)=>{
                                      setFieldValue(`xref[${index}].ids`, new_id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant="outlined"
                                        label="IDs"
                                        name="IDs"
                                        placeholder='type and enter'
                                      />
                                    )}
                                  />
                                </Grid>
                                <Grid item>
                                  <MyTextField name={`xref[${index}].access_time`} label={"Access Time"}/>
                                </Grid>
                                <Grid container>
                                  <Button
                                    variant='outlined'
                                    color='secondary'
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >Remove Eternal Refernce</Button>
                                </Grid>
                              </Grid>
                        
                            </CardContent>
                          ))}
                        </div>)
                        :( <div></div>)
                    }
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={() => arrayHelpers.push({
                        namespace: "",
                        name: "",
                        ids: [],
                        access_time: ""
                      })}
                    > Add External Reference</Button>
                  </Card>
                )}
              />
              <FieldArray
                name="pipeline_steps"
                render={arrayHelpers => (
                  <Card>
                    <Typography gutterBottom variant='h5'>Pipeline Steps</Typography>
                    {values["pipeline_steps"].map((step, index) => (
                      <Card key={index} spacing={2}>
                        <CardContent >
                          <Grid container spacing={2}>
                            <Grid item >
                              <MyTextField type="number" name={`pipeline_steps[${index}].step_number`} label="Step Number"/>
                            </Grid>
                            <Grid item >
                              <MyTextField name={`pipeline_steps.${index}.name`} label="Name"/>    
                            </Grid>
                            <Grid item >
                              <MyTextField name={`pipeline_steps.${index}.version`} label="Version"/>    
                            </Grid>
                            <Grid container >
                              <LargeTextField name={`pipeline_steps.${index}.description`} label="A free text field for describing the specific use/purpose of the tool."/>
                            </Grid>
                          </Grid>
                          <br/>
                          <Grid container spacing={2}>
                            <Grid item md={12} align='left' >
                              <Typography variant="h6">Prerequsites</Typography>
                            </Grid> 
                          </Grid>
                          <Grid container>
                            <FieldArray
                              name={`pipeline_steps.${index}.prerequisite`}
                              render={arrayHelpers => (
                                <Card >
                                  {step.prerequisite && step.prerequisite.length > 0
                                    ? (
                                      step.prerequisite.map((prereq, preIndex) => (
                                        <CardContent key={preIndex}>
                                          <MyTextField name={`pipeline_steps.[${index}].prerequisite.[${preIndex}].name`} key={preIndex} type="input" placeholder="Prerequisite Name" label='Prerequisite Name' isRequired />
                                          <Button
                                            variant='outlined'
                                            color='secondary'
                                            onClick={()=>{arrayHelpers.remove(preIndex)}}
                                          >Remove prerequisite</Button>
                                          <br/>
                                          <Uri
                                            key={prereq.uri.uri}
                                            uri_element={`pipeline_steps.[${index}].prerequisite.[${preIndex}].uri`}
                                          />
                                        </CardContent>
                                      ))
                                    )
                                    :(<div></div>)}
                                  <Button
                                    variant='outlined'
                                    color='primary'
                                    onClick={()=>{arrayHelpers.push( {name:"",uri:{filename: "",access_time: "",uri: "",sha1_checksum: ""}});}}
                                  >Add a prerequisite</Button>
                                </Card>
                              )}
                            />
                          </Grid>
                          <br/>
                          <Grid container spacing={2}>
                            <Grid item md={12} align='left' >
                              <Typography variant="h6">Input List</Typography>
                            </Grid> 
                            <Grid item md={12} align='left' >
                              <FieldArray
                                name={`pipeline_steps.${index}.input_list`}
                                render={arrayHelpers => (
                                  <Card >
                                    {step.input_list && step.input_list.length > 0
                                      ? (step.input_list.map((input, inpIndex) =>(
                                        <CardContent key={inpIndex}>
                                          <Uri uri_element={`pipeline_steps.${index}.input_list.${inpIndex}`}/>
                                          <Button
                                            variant='outlined'
                                            color='secondary'
                                            onClick={()=>{arrayHelpers.remove(inpIndex)}}
                                          >Remove input</Button>
                                        </CardContent>)))
                                      : (<div></div>)}
                                    <Button
                                      variant='outlined'
                                      color='primary'
                                      onClick={()=>{(arrayHelpers.push)({filename: "",access_time: "",uri: "",sha1_checksum: ""});}}
                                    >
                              Add an input
                                    </Button>
                                  </Card>
                                )}
                              />
                            </Grid>
                          </Grid>
                          <br/>
                          <Grid container spacing={2}>
                            <Grid item md={12} align='left' >
                              <Typography variant="h6">Output List</Typography>
                            </Grid> 
                            <Grid item md={12} align='left' >
                              <FieldArray
                                name={`pipeline_steps.${index}.output_list`}
                                render={arrayHelpers => (
                                  <Card >
                                    {step.output_list && step.output_list.length > 0
                                      ? (step.output_list.map((output, outIndex) =>(
                                        <CardContent key={outIndex}>
                                          <Uri uri_element={`pipeline_steps.${index}.output_list.${outIndex}`}/>
                                          <Button
                                            variant='outlined'
                                            color='secondary'
                                            onClick={()=>{arrayHelpers.remove(outIndex)}}
                                          >Remove output</Button>
                                        </CardContent>
                                      ))
                                      )
                                      : (<div></div>)}
                                    <Button
                                      variant='outlined'
                                      color='primary'
                                      onClick={()=>{arrayHelpers.push({filename: "",access_time: "",uri: "",sha1_checksum: ""});}}
                                    >Add an output</Button>
                                  </Card>
                                )}
                              />
                            </Grid>
                          </Grid>
                          <br/>
                          <Grid container>
                            <Button
                              variant='outlined'
                              color='secondary'
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >Remove Step</Button>
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={() => arrayHelpers.push({
                        step_number: "",
                        name: "",
                        description: "",
                        version: ""
                      })}
                    > Add Step</Button>
                  </Card>
                )}
              />
            </Form>
          )}  
      </Formik>
    </Card>
  )
}