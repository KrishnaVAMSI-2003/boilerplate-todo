import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DatePickerValue from './datepicker';
import Dropdown from './dropdown';
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { AddTaskParams, TaskTypeEnum } from '../../types/task.types';
import { useDeps, useTasks } from '../../contexts';

export default function AddTask():React.ReactElement {
    const { tasks, setTasks, tasksService } = useTasks();
    const { snackbar, setSnackbar } = useDeps();

    const [task, setTask] = React.useState<AddTaskParams>({
        title:'',
        description:'',
        dueDate: new Date(),
        taskType: 'official' as TaskTypeEnum,
    });

    const handleAddTask = async():Promise<void> => {
        try{
            const addedTask:any = await tasksService.addTask(task);
            setTasks([...tasks, addedTask.data]);
            setSnackbar({...snackbar, open: true, message: 'Task added successfully', severity: 'success'});
            setTask({
                title:'',
                description:'',
                dueDate: new Date(),
                taskType: 'official' as TaskTypeEnum,
            });
        } catch(err) {
            setSnackbar({...snackbar, open: true, message: err.response.data.message, severity: 'error'})
        }
    }

  return (
    <div className='addtodo--container'>
        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '100%' },}} noValidate autoComplete="off">    
        <Grid container spacing={2}>
            <Grid xs={6}>
                <DatePickerValue defaultDate={task.dueDate as Date} setTask={setTask}/>
            </Grid>
            <Grid xs={6}>
                <Dropdown defaultType={task.taskType} setTask={setTask}/>
            </Grid>
            <Grid xs={12}>
                <TextField id="filled-basic" label="Title" variant="filled" fullWidth value={task.title}
                    onChange={(e) => {setTask(prev => ({...prev, title: e.target.value}))}}
                />
            </Grid>
            <Grid xs={12}>
                <TextField id="filled-basic" label="Description" variant="filled" fullWidth value={task.description}
                    onChange={(e) => {setTask(prev => ({...prev, description: e.target.value}))}}
                />
            </Grid>
            <div className="addtodo__btn">
                <Button variant="contained" size="medium" color="success"
                onClick={()=>handleAddTask()}
            ><AddTaskIcon/>‎ Add Todo</Button></div>
        </Grid>
        </Box>      
    </div>
  )
}