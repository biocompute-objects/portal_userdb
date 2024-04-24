import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material"
import { searchBcodbUser } from "../../slices/searchSlice";
import { setMessage } from "../../slices/messageSlice";



export default function UserSearch({openAddUser, setOpenAddUser, public_hostname, prefixDetail, setPrefixDetail}) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const handleSubmitUsername = () => {
    console.log("Form Values:", username);
  };
  
  const checkUsernameExists = (usernameToCheck) => {
    return prefixDetail.userPerms.some(userPerm => userPerm.username === usernameToCheck);
  };

  const handleSeachUser = () => {
    const newUserPerms = {
      username: username,
      view: false,
      add: false,
      change: false,
      delete: false,
      publish: false
    }
    if (checkUsernameExists(username)) {
      dispatch(setMessage(`${username} is already in the user permission list`));
      setUsername(""); 
    } else{
      dispatch(searchBcodbUser({username, public_hostname}))
        .unwrap()
        .then(response => {
          console.log(response)
          setPrefixDetail(prevDetail => ({
            ...prevDetail,
            userPerms: [...prevDetail.userPerms, newUserPerms]
          }));
          setUsername(""); 
          setOpenAddUser(false);
        })
        .catch((error) => {
          console.error(error)
        });
    }

  };

  return (
    <div>
      <Dialog open={openAddUser}>
        <DialogTitle>Search User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search for a username in the BCO DB
          </DialogContentText>
          <br/>
          <TextField
            label="user name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            onClick={handleSeachUser}
          >Search</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpenAddUser(false)}} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}