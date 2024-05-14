import React from "react";
import { Card } from "@material-ui/core";
import { BaisicDateTimePicker, LargeTextField, Selector } from "./specialFeilds";
import { Contribution } from "./contibutor";

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