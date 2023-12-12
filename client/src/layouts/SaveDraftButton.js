import * as React from 'react';
import Box from '@mui/system/Box';
import { FocusTrap } from '@mui/base';
import SelectBCODBAndPrefix from './SelectBCODBandPrefix';
import Button from '@mui/material/Button'; // Import the Button component

export default function SaveDraftButton({ updateDraft, allowUpdate }) {
  const [open, setOpen] = React.useState(false);

  const handleSaveDraft = () => {
    setOpen(true);
  };

  const handleSave = () => {
    // Add logic for updating draft
    // You might want to execute the updateDraft function passed as prop
    if (updateDraft) {
      updateDraft();
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& [tabindex]:focus': { outline: '1px solid green' },
      }}
    >
      <Button type="button" onClick={handleSaveDraft} variant="contained" color="primary">
        Save Draft
      </Button>
      {open && (
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
      )}
    </Box>
  );
}
