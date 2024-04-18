import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { prefixInfo } from "../../slices/prefixSlice";

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
  const [userSearch, setUserSearch] = useState(false); 
  const [rows, setRows] = useState([]);
  const formikRef = useRef();
  const publicPrefix = prefix.public;
  const prefixName = prefix.prefix;
  
  const handleOpenPermissions = () => {
    setModifyPrefix(true);
    if (!publicPrefix) {
      const bcodb = user.bcodbs.find(bcodb => bcodb.public_hostname === prefix.public_hostname);
      dispatch(prefixInfo({ bcodb, prefixName }))
        .unwrap()
        .then((response) => {
          const formattedRows = formatPermissionsForTable(response.data.user_permissions, prefixName);
          setRows(formattedRows);
          formikRef.current.setValues({ rows: formattedRows });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleAddUser = () => {
    setUserSearch(true)
    // const emptyUserPermissions = {
    //   username: "Testing",
    //   view: false,
    //   add: false,
    //   change: false,
    //   delete: false,
    //   publish: false
    // }
    // const currentItems = formikRef.current.values.rows 
    // currentItems.push(emptyUserPermissions)
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    handleClosePermissions();
  };

  const handleCloseUser = () => {
    setUserSearch(false);
  };

  const handleClosePermissions = () => {
    setModifyPrefix(false);
  };

  return (
    <div>
      <Dialog open={userSearch}>
        <DialogTitle>Search User</DialogTitle>
        <DialogActions>
          <Button onClick={()=>{console.log('submit')}} color="primary">Submit</Button>
          <Button onClick={handleCloseUser} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      <Button onClick={handleOpenPermissions}>Modify Permissions</Button>
      
      <Dialog open={modifyPrefix} fullWidth maxWidth="md">
        <DialogTitle>Modify {prefix.prefix} Prefix</DialogTitle>
        <Formik
          innerRef={formikRef}
          initialValues={{ rows }}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form>
              <FieldArray name="rows">
                {({ insert, remove, push }) => (
                  <div>
                    <IconButton onClick={() => handleAddUser()}>
                      <AddIcon />Add User
                    </IconButton>
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
                        <TableBody>
                          {formik.values.rows.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                <Typography>
                                  <IconButton onClick={() => remove(index)} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                  </IconButton>&ensp;&ensp;
                                  {row.username}
                                </Typography>
                              </TableCell>
                              {["view", "add", "change", "delete", "publish"].map(permission => (
                                <TableCell key={permission}>
                                  <FormControlLabel
                                    control={<Field as={Checkbox} name={`rows[${index}].${permission}`} checked={formik.values.rows[index][permission]} />}
                                    label=""
                                  />
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
              </FieldArray>
              <DialogActions>
                <Button type="submit" color="primary">Submit</Button>
                <Button onClick={handleClosePermissions} color="secondary">Cancel</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  )
}
