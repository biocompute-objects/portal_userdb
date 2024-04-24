import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { prefixInfo, prefixModify } from "../../slices/prefixSlice";
import { setMessage } from "../../slices/messageSlice";
import UserSearch from "./UserSearch.js";

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

function reverseFormatPermissions(formattedUsers, prefixName) {
  const allPermissions = ["view", "add", "change", "delete", "publish"]; // Base permissions without the prefix
  let userPermissions = {};

  formattedUsers.forEach(user => {
    // Initialize the permissions array for each user
    userPermissions[user.username] = [];

    // Loop through each base permission and check if it's true
    allPermissions.forEach(permission => {
      if (user[permission]) { // If the permission is set to true in the form data
        // Reconstruct the permission with prefix and add to the user's permissions array
        userPermissions[user.username].push(permission + "_" + prefixName);
      }
    });
  });

  return userPermissions;
}

export default function PrefixModify({ prefix }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const [modifyPrefix, setModifyPrefix] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [prefixDetail, setPrefixDetail] = useState({
    name:prefix.prefix,
    public: prefix.public,
    description: "",
    userPerms: []
  })
  
  const prefixName = prefix.prefix

  const handleOpenPermissions = useCallback(() => {
    const bcodb = user.bcodbs.find(bcodb => bcodb?.public_hostname === prefix.public_hostname);
    if (bcodb) {
      setModifyPrefix(true);
      const public_hostname = bcodb.public_hostname;
      dispatch(prefixInfo({ public_hostname, prefixName: prefix.prefix }))
        .unwrap()
        .then(response => {
          const responseData = response[0]
          const userPermissionsData = responseData.data.user_permissions || {};
          const formattedRows = formatPermissionsForTable(userPermissionsData, prefix.prefix);
          setPrefixDetail(prev => ({
            ...prev,
            userPerms: formattedRows,
            description: responseData.data.description
          }));
        })
        .catch(error => console.error(error));
    } else {
      console.error("No matching bcodb found or user.bcodbs is undefined.");
      dispatch(setMessage("No matching bcodb found or user.bcodbs is undefined."))
    }
  }, [dispatch, user.bcodbs, prefix.prefix, prefix.public_hostname]);

  const handleClosePermissions = () => {
    setModifyPrefix(false);
  };

  return (
    <div>
      <Button onClick={handleOpenPermissions}>Modify Prefix</Button>
      <UserSearch
        openAddUser={openAddUser}
        setOpenAddUser={setOpenAddUser}
        public_hostname={prefix.public_hostname}
        prefixDetail={prefixDetail}
        setPrefixDetail={setPrefixDetail}
      />
      <Dialog open={modifyPrefix} fullWidth maxWidth="md">
        <DialogTitle>Modify {prefix.prefix} Prefix</DialogTitle>
        <Formik
          enableReinitialize={true}
          initialValues={prefixDetail}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(true);
            const returnData = {
              "prefix": prefixName,
              "description": values.description,
              "user_permissions": reverseFormatPermissions(values.userPerms, prefixName),
              "public": values.public
            }
            const public_hostname = user.bcodbs.find(bcodb => bcodb?.public_hostname === prefix.public_hostname)?.public_hostname;
            if (public_hostname) {
              dispatch(prefixModify({ returnData, public_hostname }));
            }
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
                            <Field as={Checkbox}  checked={true} disabled/>
                          </TableCell>
                          <TableCell>
                            <Field as={Checkbox}  checked={true} disabled/>
                          </TableCell>
                          <TableCell>
                            <Field as={Checkbox}  checked={true} disabled/>
                          </TableCell>
                          <TableCell>
                            <Field as={Checkbox}  checked={true} disabled/>
                          </TableCell>
                          <TableCell>
                            <Field as={Checkbox}  checked={true} disabled/>
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
                  <IconButton onClick={() => setOpenAddUser(true)} className="left-button">
                    Add user to prefix
                    <AddIcon />
                  </IconButton>
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
