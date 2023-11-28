import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDeps } from '../../contexts';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent(): React.ReactElement {
    const {snackbar, setSnackbar} = useDeps();
    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbar({...snackbar, open: false});
    };
    return (
        <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical:'top',horizontal: 'center'}}>
            {
                snackbar.open &&
                <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            }
        </Snackbar>
    )
}