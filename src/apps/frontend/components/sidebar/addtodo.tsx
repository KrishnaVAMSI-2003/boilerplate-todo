import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DatePickerValue from './datepicker';
import Dropdown from './dropdown';
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';

export default function Addtodo():React.ReactElement {

  return (
    <div className='addtodo--container'>
        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '100%' },}} noValidate autoComplete="off">    
        <Grid container spacing={2}>
            <Grid xs={6}>
                <DatePickerValue/>
            </Grid>
            <Grid xs={6}>
                <Dropdown/>
            </Grid>
            <Grid xs={12}>
                <TextField id="filled-basic" label="Title" variant="filled" fullWidth/>
            </Grid>
            <Grid xs={12}>
                <TextField id="filled-basic" label="Description" variant="filled" fullWidth/>
            </Grid>
            <div className="addtodo__btn"><Button variant="contained"><AddTaskIcon/>‎ Add Todo</Button></div>
        </Grid>
         
        </Box>      
    </div>
  )
}