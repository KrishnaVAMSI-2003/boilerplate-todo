import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import EditIcon from '@mui/icons-material/Edit';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function TaskComponent(): React.ReactElement {
    return(
        <Box className="task--container">
            <Grid container spacing={0}>
                <Grid item xs={7} className='task__details'>
                    <h3 className='task__prop'>title</h3>
                </Grid>
                <Grid item xs={2}>
                    <h4 className='task__prop task__text__center'>Type</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4 className='task__prop task__text__center'>Date</h4>
                </Grid>
                <Grid item xs={7} className='task__details'>
                    <div className='task__prop__underline'></div>
                </Grid>
                <Grid item xs={2}>
                <div className='task__prop__underline'></div>
                </Grid>
                <Grid item xs={3}>
                <div className='task__prop__underline'></div>
                </Grid>
                <Grid item xs={12}>
                    <p className='task__prop'>Description</p>
                </Grid>
            </Grid>
            <div className='icons--container'>
                <DoneOutlineIcon className='done__icon'/>
                <RemoveDoneIcon className='remove__done__icon'/>
                <EditIcon className='edit__icon'/>
                <DeleteForeverIcon className='delete__icon'/>
            </div>
        </Box>
    )
}