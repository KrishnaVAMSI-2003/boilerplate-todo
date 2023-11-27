import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent(): React.ReactElement {
    const [open, setOpen] = React.useState(true);

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical:'top',horizontal: 'center'}}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '300px' }}>
              This is a success message!
            </Alert>
        </Snackbar>
    )
}