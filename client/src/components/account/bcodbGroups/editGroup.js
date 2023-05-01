import React from "react";
import { useDispatch } from "react-redux";
import { Button, Chip, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Typography, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Formik, Form } from "formik";
import { MyTextField } from "../../builder/specialFeilds";
import { modifyGroup } from "../../../slices/bcoSlice";

export default function EditGroup({openGroup, setOpenGroup, groupInfo, bcodb}) {
  const dispatch = useDispatch();
  const initialName = groupInfo.name
  const initialMembers = groupInfo.members
  const initialDescription = groupInfo.description
  const handleClose = () => {
    setOpenGroup(false);
  };

  return (
    <Dialog open={openGroup} onClose={handleClose}>
      <DialogTitle>Edit {groupInfo.name} Group</DialogTitle>
      <DialogContent>
        { groupInfo.admin
          ? (
            <Formik
              initialValues={groupInfo}
              validationSchema={""}
              onSubmit={(values) => {
                const removeUsers = [];
                const addUsers = [];
                const request = {
                  "name": groupInfo.name,
                  "actions": {}
                }
                values.members.forEach((member) => {
                  if (initialMembers.indexOf(member) > -1 === false) {
                    addUsers.push(member);
                  }
                })
                initialMembers.forEach((member) => {
                  if (!(values.members.indexOf(member) > -1)) {
                    removeUsers.push(member)
                  }
                })
                if (initialName !== values.name) {
                  request.actions.rename = values.name
                }
                if (initialDescription !== values.description) {
                  request.actions.redescribe = values.description
                  console.log(values.description, request.actions)
                }
                if (removeUsers.length > 0) {
                  request.actions.remove_users = removeUsers
                }
                if (addUsers.length > 0) {
                  request.actions.add_users = addUsers
                }
                dispatch(modifyGroup({bcodb, request}))
                  .unwrap()
                  .then((response) => {
                    global.window.location.reload();
                    console.log(response)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
                handleClose()
              }}
            >
              {({values, isSubmitting, setFieldValue}) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item>
                      <Typography>Group Name</Typography>
                    </Grid>
                    <Grid item>
                      <MyTextField name='name' label='Group Name' isRequired isDisabled/>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item>
                      <Typography>Group Discription</Typography>
                    </Grid>
                    <Grid item>
                      <MyTextField name='description' label='Group Description' isRequired />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item>
                      <Typography>Group members</Typography>
                    </Grid>
                    <Grid item>
                      <Autocomplete
                        multiple
                        name="members"
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
                        value={values.members}
                        onChange={(e, new_member)=>{
                          setFieldValue("members",new_member);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="members"
                            name="members"
                            placeholder='type and enter'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item>
                      <Typography>Group Permissions</Typography>
                    </Grid>
                  </Grid>
                  <div style={{padding: 20}}> 
                    <Button
                      disabled={isSubmitting}
                      type='submit'
                      variant="contained"
                      color="primary"
                    >Update Group</Button>
                    <Button
                      variant="contained"
                      onClick={() => setOpenGroup(false)}
                      color="secondary"
                    >Cancel</Button>
                  </div>
                </Form>)}
            </Formik>
          )
          : (<DialogContentText>{JSON.stringify(groupInfo.permissions)}</DialogContentText>)
        }
      </DialogContent>
    </Dialog>
  )
}