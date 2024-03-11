import * as React from 'react';
import Box from '@mui/system/Box';
import { FocusTrap } from '@mui/base';
import SelectBCODBAndPrefix from './SelectBCODBandPrefix';
import Button from '@mui/material/Button'; // Import the Button component
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SaveDraftButton({ updateDraft, allowUpdate }) {
  const [open, setOpen] = React.useState(false);

  // const handleSaveDraft = () => {
  //   setOpen(true);
  // };

  const handleSave = () => {
    // Add logic for updating draft
    // You might want to execute the updateDraft function passed as prop
    if (updateDraft) {
      updateDraft();
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Button type="button" onClick={handleClickOpen} variant="contained" color="primary">
        Save Draft
      </Button>
      {/* <SelectBCODBAndPrefix /> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"To Save a BCO"}
        </DialogTitle>
        <DialogContent>
          <SelectBCODBAndPrefix />
        </DialogContent>
        <DialogContent>
          <Button onClick={handleSave}>Save Draft</Button>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogContent>
        </Dialog>
      {/* {open && (
        <FocusTrap open>
          <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
            <SelectBCODBAndPrefix />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={allowUpdate}
            >
              Save
            </Button>
            <Button type="button" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Box>
        </FocusTrap>
      )} */}
    </Box>
    </React.Fragment>
  );
}