import {Button, Card, CardContent, Grid } from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { MyTextField } from "./specialFeilds";
import { removeContribution, addContribution } from './rootSlice'
import MultipleSelect from "./selector"


export const contributions = [
    'authoredBy',
    'contributedBy',
    'createdAt',
    'createdBy',
    'createdWith',
    'curatedBy',
    'derivedFrom',
    'importedBy',
    'importedFrom',
    'providedBy',
    'retrievedBy',
    'retrievedFrom',
    'sourceAccessedBy'
];

export const Contribution = ({contributors}) => {
    const dispatch = useDispatch();
    return (
        <Card >
            {contributors.map((contributor, index) => (
                <CardContent key={index}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <MyTextField name={`contributors[${index}].name`} type="input" placeholder="Name" label='Name' isRequired />
                    </Grid>
                    <Grid item>
                    <MyTextField name={`contributors[${index}].affiliation`} type="input" placeholder="Affiliation" label='Affiliation' isRequired />
                    </Grid>
                    <Grid item>
                      <MyTextField name={`contributors[${index}].email`} type="input" placeholder="Email" label='Email' isRequired />
                    </Grid>
                    <Grid item>
                      <MultipleSelect
                        listItems={contributions}
                        label="Contribution"
                        list={contributors[index].contribution}
                        index={index}
                      />
                    </Grid>
                    <Grid item>
                      <MyTextField name={`contributors[${index}].orcid`} type="input" placeholder="ORCID" label='ORCID' isRequired />
                    </Grid>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {dispatch(removeContribution({index}))}}
                    >Remove</Button>
                  </Grid>
                </CardContent>
              ))
            }
            <Button
              variant="outlined"
              color="primary"
              onClick={()=> {dispatch(addContribution())}}
            >Add Contribution</Button>
        </Card>
    )
}