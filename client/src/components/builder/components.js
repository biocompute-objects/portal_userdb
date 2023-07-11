import React from "react";
import {
  MyTextField,
  MultiSelector,
  BaisicDateTimePicker,
  LargeTextField,
  Selector
} from "./specialFeilds"
import { Grid } from "@material-ui/core";
import { Button, Card } from "@material-ui/core";

export const Uri = ({uri_element}) => {
  return (
    <>
      <Grid item xs>
        <MyTextField name={`${uri_element}["filename"]`} label="File name"/>
      </Grid>
      <Grid item xs>
        <MyTextField name={`${uri_element}["uri"]`} label="URI"/>
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
  return(
    <Button
      type='submit'
      variant="contained"
      color="primary"
    > Next </Button>
  )
}

export const Contribution = ({contributor, contributorPath}) => {
  return (
    <Card >
      <MyTextField name={`${contributorPath}.name`} type="input" placeholder="Name" label='Name' isRequired />
      <MyTextField name={`${contributorPath}.affiliation`} type="input" placeholder="Affiliation" label='Affiliation' />
      <MyTextField name={`${contributorPath}.email`} type="input" placeholder="Email" label='Email' />
      <MultiSelector
        name={`${contributorPath}.contribution`}
        list={contributor.contribution}
        label='Contribution'
        isRequired
      />
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