import { useField } from "formik";
import {Button, Card, CardContent, Select, Grid} from "@material-ui/core";
import { MyTextField, BaisicDateTimePicker, LargeTextField, Selector } from "./specialFeilds";
import { MenuItem } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
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