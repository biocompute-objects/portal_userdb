import React, { useEffect } from "react"
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  Grid, Typography  } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/messageSlice";

export default function NotificationBox() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const handleClose = () => {
    dispatch(clearMessage());
    setOpen(false);
  }

  useEffect(() => {
    if (!message == "") {
      setOpen(true);
    }
  }, [message])

  return (
    <Card >
      <CardContent>
        <Dialog open={open} >
          <DialogTitle>Alert</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              id="cancle-removedb"
              onClick={handleClose}
              variant="outlined"
              color="primary"
            >Ok</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  )
}