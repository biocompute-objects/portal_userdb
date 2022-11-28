import {Button, Card, CardContent, Select, Grid} from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { MyTextField, MyDateTimeField } from "./specialFeilds";
import { removeReview, addReview, listSelect } from './rootSlice'
import { MenuItem } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import { contributions } from "./contibutor";
import MultipleSelect from "./selector";

export const Review = ({review}) => {
    console.log(review)
    const dispatch = useDispatch();
    return (
        <Card >
            {review.map((reviewer, index) => (
                <CardContent key={index}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Select
                        labelId="review-status"
                        id="review-status"
                        value={reviewer.status}
                        input={<OutlinedInput label="Review Status" />}
                        onChange={(event) => dispatch(listSelect({
                          selected: event.target.value,
                          label: "Review",
                          index: index
                        }))}
                      >
                        <MenuItem value={'unreviewed'}>Unreviewed</MenuItem>
                        <MenuItem value={'in-review'}>In review</MenuItem>
                        <MenuItem value={'approved'}>Approved</MenuItem>
                        <MenuItem value={'rejected'}>Rejected</MenuItem>
                        <MenuItem value={'suspended'}>Suspended</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item>
                      <MyTextField name={`review[${index}].reviewer_comment`} type="input" placeholder="Review" label='Reviewer Comment' isRequired />
                    </Grid>
                    <Grid item>
                      <MyDateTimeField name={`review[${index}].date`} type="input" placeholder="Affiliation" label='Affiliation' isRequired />
                    </Grid>
                    <Grid item>
                      <MyTextField name={`review[${index}].reviewer.name`} type="input" placeholder="Name" label='Name' isRequired />
                    </Grid>
                    <Grid item>
                    <MyTextField name={`review[${index}].reviewer.affiliation`} type="input" placeholder="Affiliation" label='Affiliation' isRequired />
                    </Grid>
                    <Grid item>
                      <MyTextField name={`review[${index}].reviewer.email`} type="input" placeholder="Email" label='Email' isRequired />
                    </Grid>
                    <Grid item>
                      <MultipleSelect
                        listItems={contributions}
                        label="Reviewer Contribution"
                        list={reviewer.reviewer.contribution}
                        index={index}
                      />
                    </Grid>
                    <Grid item>
                      <MyTextField name={`review[${index}].reviewer.orcid`} type="input" placeholder="ORCID" label='ORCID' isRequired />
                    </Grid>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {dispatch(removeReview({index}))}}
                    >Remove</Button>
                  </Grid>
                </CardContent>
              ))
            }
            <Button
              variant="outlined"
              color="primary"
              onClick={()=> {dispatch(addReview())}}
            >Add Review</Button>
        </Card>
    )
}