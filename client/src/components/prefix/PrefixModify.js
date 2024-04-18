import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { prefixInfo, prefixModify } from "../../slices/prefixSlice";
import { DialogContent, DialogContentText, TextField } from "@material-ui/core";
import { Container } from "react-bootstrap";

function formatPermissionsForTable(userPermissions, prefixName) {
  const allPermissions = ["view_" + prefixName, "add_" + prefixName, "change_" + prefixName, "delete_" + prefixName, "publish_" + prefixName];
  return Object.keys(userPermissions).map((username) => {
    const userRow = { username };
    allPermissions.forEach(permission => {
      const displayPermission = permission.replace(`_${prefixName}`, "");
      userRow[displayPermission] = userPermissions[username].includes(permission);
    });
    return userRow;
  });
}

export default function PrefixModify({ prefix }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const [modifyPrefix, setModifyPrefix] = useState(false);
  const [prefixDetail, setPrefixDetail] = useState({
    name:prefix.prefix,
    public: prefix.public,
    description: "",
    userPerms: []
  })
  
  const prefixName = prefix.prefix
  const bcodb = user.bcodbs.find(bcodb => bcodb.public_hostname === prefix.public_hostname);
  const public_hostname = bcodb.public_hostname 

  const handleOpenPermissions = () => {
    setModifyPrefix(true);
    dispatch(prefixInfo({ public_hostname, prefixName }))
      .unwrap()
      .then((response) => {
        const userPermissionsData = response.data.user_permissions || {};
        const formattedRows = formatPermissionsForTable(userPermissionsData, prefixName);
        setPrefixDetail({ ...prefixDetail, 
          userPerms: formattedRows, 
          description: response.data.fields.description});
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleClosePermissions = () => {
    setModifyPrefix(false);
  };

  return (
    <div>

      <Button onClick={handleOpenPermissions}>Modify Prefix</Button>
      
      <Dialog open={modifyPrefix} fullWidth maxWidth="md">
        <DialogTitle>Modify {prefix.prefix} Prefix</DialogTitle>
        <Formik
          enableReinitialize={true}
          initialValues={prefixDetail}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(true);
            console.log("Form:", values )
            dispatch(prefixModify(values))
            setSubmitting(false);
            handleClosePermissions();
          }}
        >
          {formik => (
            <Form>
              <Container>
                <Typography>
                  &ensp;Name:&ensp;
                  <Field name="name"/>&ensp;
                  <FormControlLabel
                    control={<Field as={Checkbox} name="public" checked={formik.values.public} />}
                    label="public"
                  />
                </Typography>
                <Typography>
                &ensp;Prefix&ensp;Description:&ensp;<Field name="description"/>
                </Typography>
                {/* <IconButton onClick={() => handleAddUser()}>
                      <AddIcon />Add User
                    </IconButton> */}
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell >View</TableCell>
                        <TableCell >Add</TableCell>
                        <TableCell >Change</TableCell>
                        <TableCell >Delete</TableCell>
                        <TableCell >Publish</TableCell>
                      </TableRow>
                    </TableHead>
                    {(formik.values.public) ?(
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Typography>ALL&ensp;USERS</Typography>
                          </TableCell>
                          <TableCell>
                            <Field as={Checkbox}  checked={true} />
                          </TableCell>
                          <TableCell>
                            <Field as={Checkbox}  checked={true} />
                          </TableCell>
                          <TableCell>
                            <Field as={Checkbox}  checked={true} />
                          </TableCell>
                          <TableCell>
                            <Field as={Checkbox}  checked={true} />
                          </TableCell>
                          <TableCell>
                            <Field as={Checkbox}  checked={true} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ):(
                      <FieldArray name="userPerms">
                        {({ remove }) => (
                            
                          <TableBody>
                            {formik.values.userPerms.map((row, index) => (
                              <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                  <IconButton onClick={() => remove(index)} edge="end" aria-label="delete">
                                    <DeleteIcon />&ensp;
                                    <Typography>{row.username}</Typography>
                                  </IconButton>
                                </TableCell>
                                {["view", "add", "change", "delete", "publish"].map(permission => (
                                  <TableCell key={permission}>
                                    <FormControlLabel
                                      control={<Field as={Checkbox} type="checkbox" name={`userPerms[${index}].${permission}`} />}
                                      label=""
                                    />
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                            
                          </TableBody>
                        )}
                      </FieldArray>
                    )}
                  </Table>
                </TableContainer>

                <DialogActions>
                  <Button type="submit" color="primary">Submit</Button>
                  <Button onClick={handleClosePermissions} color="secondary">Cancel</Button>
                </DialogActions>
              </Container>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  )
}
