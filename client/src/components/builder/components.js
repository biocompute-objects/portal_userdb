import React, { useEffect } from "react";
import {
  MyTextField,
  MultiSelector,
  BaisicDateTimePicker,
  LargeTextField,
  Selector
} from "./specialFeilds"
import { Button, Card, CardContent, Grid } from "@mui/material";
import { useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { writingBco } from "../../slices/bcoSlice";

export const removeEmptyValues = (myData, excludedKeys = []) => {
  const obj = JSON.parse(JSON.stringify(myData))
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      obj[key] = removeEmptyValues(obj[key], excludedKeys);
      if (Object.keys(obj[key]).length === 0 && !excludedKeys.includes(key)) {
        delete obj[key];
      }
    } else if (!obj[key] && !excludedKeys.includes(key)) {
      delete obj[key];
    }
  }
  return obj;
};

export const isUUID = (str) => {
  const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidPattern.test(str);
};

export function validURL(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

export const Uri = ({uri_element}) => {
  return (
    <>
      <Grid item xs>
        <MyTextField name={`${uri_element}["filename"]`} label="File name"/>
      </Grid>
      <Grid item xs>
        <MyTextField name={`${uri_element}["uri"]`} label="URI" isRequired/>
      </Grid>
      <Grid item xs>
        <BaisicDateTimePicker name={`${uri_element}["access_time"]`} label="Access Time"/>
      </Grid>
      <Grid item xs>
        <MyTextField name={`${uri_element}["sha1_checksum"]`} label="SHA1 Checksum"/>
      </Grid>
    </>

  )

}

export const Next = () => {
  const writingStatus = useSelector((state) => state.bco.writingStatus);
  return(
    <Button
      type='submit'
      variant="contained"
      color="primary"
      disabled={(writingStatus === "idle")}
    > Next </Button>
  )
}

export const Contribution = ({ contributor, contributorPath }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <MyTextField name={`${contributorPath}.name`} type="input" placeholder="Name" label='Name' isRequired />
          </Grid>
          <Grid item xs={3}>
            <MyTextField name={`${contributorPath}.affiliation`} type="input" placeholder="Affiliation" label='Affiliation' />
          </Grid>
          <Grid item xs={2}>
            <MyTextField name={`${contributorPath}.email`} type="input" placeholder="Email" label='Email' />
          </Grid>
          <Grid item xs={2}>
            <MultiSelector
              name={`${contributorPath}.contribution`}
              list={contributor.contribution}
              label='Contribution'
              isRequired
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export const Reviewer = ({reviewer, reviewerPath}) => {
  return (
    <Card >
      <Selector name={`${reviewerPath}.status`} type="input" placeholder="Review status" label='Review status' isRequired />
      <BaisicDateTimePicker name={`${reviewerPath}.date`} type="input" placeholder="Review Date" label='Review Date' isRequired />
      <LargeTextField name={`${reviewerPath}.reviewer_comment`} type="input" placeholder="Reviewer Comment" label='Reviewer Comment' isRequired />
      <Contribution contributor={reviewer.reviewer} contributorPath={`${reviewerPath}.reviewer`}/>
    </Card>
  )
}

export const FormObserver = () => {
  const { dirty } = useFormikContext();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(writingBco(dirty))  
  }, [dirty]);

  return null
}