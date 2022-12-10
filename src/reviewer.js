import {Button, Card, CardContent, Select, Grid} from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { MyTextField, BaisicDateTimePicker, LargeTextField } from "./specialFeilds";
import { MenuItem } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import { contributions } from "./contibutor";
import MultipleSelect from "./selector";
import { Contribution } from "./contibutor";
export const Reviewer = ({reviewer, reviewerPath}) => {

  return (
      <Card >
        {/* <MyTextField  type="input" placeholder="Review Status" label='Review Status' isRequired /> */}
        <Select
          name={`${reviewerPath}.status`}
          labelId="review-status"
          id="review-status"
          value={reviewer.status}
          input={<OutlinedInput label="Review Status" />}
          onChange={(event) => {}}
        >
          <MenuItem value={'unreviewed'}>Unreviewed</MenuItem>
          <MenuItem value={'in-review'}>In review</MenuItem>
          <MenuItem value={'approved'}>Approved</MenuItem>
          <MenuItem value={'rejected'}>Rejected</MenuItem>
          <MenuItem value={'suspended'}>Suspended</MenuItem>
        </Select>
        <BaisicDateTimePicker name={`${reviewerPath}.date`} type="input" placeholder="Review Date" label='Review Date' isRequired />
        <LargeTextField name={`${reviewerPath}.reviewer_comment`} type="input" placeholder="Reviewer Comment" label='Reviewer Comment' isRequired />
        <Contribution contributor={reviewer.reviewer} contributorPath={`review.contribution`}/>
    </Card>
  )
}