import React, { useState } from "react";
import * as Yup from "yup";
import {Card, CardContent, CardHeader, Typography, Grid, Button, TextField } from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import { Contribution, FormObserver, Reviewer, Next } from "./components";
import { useSelector, useDispatch } from "react-redux"
import { BaisicDateTimePicker, MyTextField, EmbargoDateTimePicker } from "./specialFeilds";
import { updateProvenanceDomain, updateModified } from "../../slices/bcoSlice";
import "../../App.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";
import ErrorBoundary from "../ErrorBoundry";

export const  ProvenanceDomain = ({onSave} ) => {
  const dispatch = useDispatch();
  const provenanceDomain = useSelector(state => state.bco.data?.provenance_domain) || {};
  let has_obsolete = "obsolete_after" in provenanceDomain;
  let has_review = "review" in provenanceDomain;
  let has_contributors = "contributors" in provenanceDomain;
  let is_derived = "derived_from" in provenanceDomain;
  const [obsolete, setObsolete] = useState("obsolete_after" in provenanceDomain)
  const [embargo, setEmbargo] = useState("embargo" in provenanceDomain)
  const contributorSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    affiliation: Yup.string(),
    email: Yup.string().email("Invalid email format"),
    contribution: Yup.array().min(1, "At least one contribution is required").required()
  });
  const reviewerSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    reviewer: contributorSchema.required("Reviewer name is required"),
  });

  return (
    <>
      <Card className="object-domain">
        <Formik
          enableReinitialize={true}
          initialValues={
            {
              "name": provenanceDomain["name"],
              "version": provenanceDomain["version"],
              "license": provenanceDomain["license"],
              "created": provenanceDomain["created"],
              "modified": provenanceDomain["modified"],
              "derived_from": is_derived ? provenanceDomain["derived_from"] : "", 
              "obsolete_after": has_obsolete ? provenanceDomain["obsolete_after"] : [],
              "contributors": has_contributors ?  provenanceDomain["contributors"] : [],
              "review": has_review ? provenanceDomain["review"] : [],
              "embargo": embargo ? {
                start_time: (provenanceDomain["embargo"] && provenanceDomain["embargo"].start_time) || null,
                end_time: (provenanceDomain["embargo"] && provenanceDomain["embargo"].end_time) || null,
              } : { start_time: null, end_time: null },
            }
          }
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required("Required field!"),
            version: Yup.string()
              .required("Required field!"),
            license: Yup.string()
              .required("Required field!"),
            contributors: Yup.array().of(contributorSchema),
            review: Yup.array().of(reviewerSchema),
          })}
          onSubmit={
            (values, {setSubmitting, setValues}) => {
              setSubmitting(true);
              dispatch(updateModified());
              if (obsolete === false) {
                delete values["obsolete_after"]
              }
              if (embargo === false) {
                delete values["embargo"]
              }
              dispatch(updateProvenanceDomain(values));
              setSubmitting(false);
              onSave()
            }
          }
            
          validate={
            (values) => {
              const errors = {};
              if (!values.contributors) {
                errors.contributors = "Required";
              }
              return errors;
            }
          }
        >
          {
            ({values, isSubmitting, errors, setFieldValue}) => (              
              <Form>
                <CardHeader
                  title={
                    <span className="bold-title">
                      Provenance Domain
                      <Tooltip title="Explanation of Provenance Domain">
                        <Button size="small" target="_blank" href='https://wiki.biocomputeobject.org/index.php?title=Provenance-domain'>
                          <HelpOutlineIcon />
                        </Button>
                      </Tooltip>
                    </span>
                  }
                  action={<Next />}
                />
                <CardContent>
                  <FormObserver />
                  <Grid container spacing={2}>
                    <Grid container spacing={2}>
                      
                      <Grid item xs> 
                        <MyTextField name="name" type="input" placeholder="Name" label='Name' isRequired={true} isFullWidth/>
                      </Grid>
                      <Grid item xs>
                        <MyTextField name="version" type="input" placeholder="Version" label="Version" isRequired isFullWidth/>
                      </Grid>
                      <Grid item xs>
                        <MyTextField name="license" type="input" placeholder="License" label="License" isRequired isFullWidth/>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs>
                        <MyTextField name="derived_from" type="input" placeholder="Derived From"  label="Derived From" isFullWidth/>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Typography> Created: </Typography> 
                      </Grid>
                      <Grid item xs>
                        <BaisicDateTimePicker name="created" placeholder="Created" isDisabled isFullWidth/>
                      </Grid>
                      <Grid item xs> 
                        <Typography> Modified: </Typography>
                      </Grid>
                      <Grid item xs> 
                        <BaisicDateTimePicker name="modified"  placeholder="Modified" isDisabled isFullWidth/>        
                      </Grid>
                    </Grid> 
                    <Grid container spacing={2}>
                      <Grid item md={12} align='left' >
                        <Typography variant="h6">Obsolete Date</Typography>
                      </Grid> 
                    </Grid>
                    <Grid container spacing={2}>
                      {obsolete === true
                        ? (
                          <Grid item >
                            <Typography> Obsolete After: </Typography>
                            <BaisicDateTimePicker
                              placeholder="Obsolete after"
                              name="obsolete_after"
                            />
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() =>{setObsolete(false)}}
                            > Remove Obsolete</Button>
                          </Grid>)
                        : (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>{
                              console.log("press", values.obsolete_after.length)
                              setObsolete(true)
                            }}
                          > Add Obsolete</Button>
                        )
                      }
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item md={12} align='left' >
                        <Typography variant="h6">Embargo</Typography>
                      </Grid> 
                    </Grid>
                    {embargo === true
                      ? (
                        <Grid container spacing={2}>
                          <Grid item xs>
                            <Typography> Start time: </Typography>
                          </Grid>
                          <Grid item xs>
                            <EmbargoDateTimePicker name="embargo.start_time" placeholder="Start Time" isRequired isFullWidth/>
                          </Grid>
                          <Grid item xs> 
                            <Typography> End Time: </Typography>     
                          </Grid>
                          <Grid item xs>
                            <EmbargoDateTimePicker  name="embargo.end_time"  placeholder="End Time" isRequired isFullWidth/>     
                          </Grid>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>{setEmbargo(false)}}
                          > Remove Embargo</Button>
                        </Grid>
                      )
                      : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() =>{setEmbargo(true)}}
                        > Add Embargo</Button>
                      )
                    }
                    <Grid container spacing={2}>
                      <Grid item md={12} align='left' >
                        <Typography variant="h6">Contributors</Typography>
                      </Grid> 
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                      <FieldArray
                        name='contributors'
                        render={arrayHelpers => (
                          <>
                            {values.contributors.map((contributor, index) => (
                              <Grid item xs={12} key={index}>
                                <Grid container alignItems="center" spacing={2}>
                                  <Grid item xs={10}></Grid>
                                  <CardContent>
                                    <Contribution contributor={contributor} contributorPath={`contributors[${index}]`} />
                                  </CardContent>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button
                                    className="delete-button"
                                    type="button"
                                    onClick={() => { arrayHelpers.remove(index) }}
                                  >
                                    <RemoveCircleIcon fontSize="23" />
                                  </Button>
                                </Grid>
                              </Grid>
                              // </Grid>
                            ))}
                            <Grid item xs={12}>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                  arrayHelpers.push({ name: "", affiliation: "", email: "", contribution: [], orcid: "" })
                                }}
                              >
                                Add Contribution
                              </Button>
                            </Grid>
                          </>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item md={12} align='left' >
                      <Typography variant="h6">Review</Typography>
                    </Grid> 
                  </Grid>
                  <Grid container spacing={2}>
                    <FieldArray
                      name="review"
                      render={arrayHelpers => (
                        <Grid item xs>
                          {values.review.map((reviewer, index) => (
                            <CardContent key={index}>
                              <Reviewer reviewer={reviewer} reviewerPath={`review[${index}]`}/>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={()=> {arrayHelpers.remove(index)}}
                              >Remove Review</Button>
                            </CardContent>
                          ))}
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={()=> {arrayHelpers.push({status:"unreviewed",reviewer_comment:"",date:"",reviewer: {name:"",affiliation: "",email:"",contribution:["curatedBy"],orcid:""}})}}
                          >Add Review</Button>
                        </Grid> 
                      )
                      }
                    />
                  </Grid>
                  {/* </Grid> */}
                </CardContent>
              </Form>
            )
          }
        </Formik>
      </Card>
    </>
  )
}