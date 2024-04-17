import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";

export default function PrefixModify({prefix}) {
  const [modifyPrefix, setModifyPrefix] = useState(false)
  const user = useSelector((state) => state.account.user)
  const data = {
    "user":user,
    "prefix": prefix
  };
  const handleOpen = () => {
    setModifyPrefix(true);
    console.log(data);
  };
  const handleClose = () => {
    setModifyPrefix(false);
  };
  return(
    <div>
      <button
        onClick={() => handleOpen()}
      >Yes</button>
      <Dialog open={(modifyPrefix === true)}>
        <DialogTitle>
          <Typography>Modify {prefix.prefix} Prefix</Typography>
        </DialogTitle>
        <div>This feature is a WIP</div>
        <DialogActions>
          <Button onClick={() => {}} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}