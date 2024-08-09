import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

export default function FloatingActionButtons() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        '& > :not(style)': { m: 1 },
      }}
    >
      <Fab 
      variant="extended" 
      href="https://github.com/biocompute-objects/portal_userdb/issues/new/choose"
      target='_blank' 
      style={{ textDecoration: 'none' }}>
        <TextsmsOutlinedIcon sx={{ mr: 1 }} />
        Give Us Feedback
      </Fab>
    </Box>
  );
}
