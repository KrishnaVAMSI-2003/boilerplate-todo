import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import { Task } from '../../types/task.types';
import { useDeps, useTasks } from '../../contexts';
import DatePickerValue from '../sidebar/datepicker';
import Dropdown from '../sidebar/dropdown';

type EditTaskParams = {
    task: Task;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTask(props: EditTaskParams):React.ReactElement {
    const { task, setOpened } = props;
    const [editTask, setEditTask] = React.useState<Task>(task);
    const { setTasks, tasksService } = useTasks();
    const { snackbar, setSnackbar } = useDeps();

    const handleEditTask = async():Promise<void> => {
        try{
            await tasksService.editTask(editTask);
            setTasks((prev:Task[]) => prev.map((taskEle:Task) => taskEle.id === editTask.id ? editTask : taskEle));
            setOpened(false);
            setSnackbar({...snackbar, open: true, message: 'Task updated successfully', severity: 'success'});
        } catch(err) {
            setSnackbar({...snackbar, open: true, message: err.response.data.message, severity: 'error'})
        }
    }

  return (
    <div className='edittask--container'>
        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '100%' },}} noValidate autoComplete="off">    
        <Grid container spacing={2}>
            <Grid xs={6}>
                <DatePickerValue defaultDate={editTask.dueDate} setTask={setEditTask}/>
            </Grid>
            <Grid xs={6}>
                <Dropdown defaultType={editTask.taskType} setTask={setEditTask}/>
            </Grid>
            <Grid xs={12}>
                <TextField id="filled-basic" label="Title" variant="filled" fullWidth value={editTask.title}
                    onChange={(e) => {setEditTask(prev => ({...prev, title: e.target.value}))}}
                />
            </Grid>
            <Grid xs={12}>
                <TextField id="filled-basic" label="Description" variant="filled" fullWidth value={editTask.description}
                    onChange={(e) => {setEditTask(prev => ({...prev, description: e.target.value}))}}
                />
            </Grid>
            <div className="addtodo__btn"><Button variant="contained" color='secondary'
                onClick={handleEditTask}
            ><UpdateIcon/>‎ Update</Button></div>
        </Grid>
        </Box>      
    </div>
  )
}