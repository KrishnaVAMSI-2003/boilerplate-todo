import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import EditIcon from '@mui/icons-material/Edit';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Task } from "../../types/task.types";
import { useDeps, useTasks } from "../../contexts";
import EditTask from "./editTask";

type TaskComponentParams = {
    task: Task;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export default function TaskComponent(props: TaskComponentParams): React.ReactElement {
    const { task } = props;
    const { setTasks, tasksService } = useTasks();
    const { snackbar, setSnackbar } = useDeps();
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async() => {
        try{
            await tasksService.deleteTask(task.id);
            setTasks((prev:Task[]) => prev.filter((taskEle:Task) => taskEle.id !== task.id));
            setSnackbar({...snackbar, open: true, message: 'Task deleted successfully', severity: 'success'});
        } catch(err){
            setSnackbar({...snackbar, open: true, message: err.response.data.message, severity: 'error'});
        }
    }

    const handleEdit = async() => {
        handleOpen(); //opens modal
    }

    const handleUpdateStatus = async() => {
        task.isCompleted = !task.isCompleted;
        try{
            await tasksService.updateTaskStatus(task.id);
            setTasks((prev:Task[]) => prev.map((taskEle:Task) => taskEle.id === task.id ? {...taskEle, isCompleted: task.isCompleted} : taskEle));
            setSnackbar({...snackbar, open: true, message: 'Task status updated successfully', severity: 'success'});
        } catch(err) {
            setSnackbar({...snackbar, open: true, message: err.response.data.message, severity: 'error'});
        }
    }

    return(
        <Box className={`task--container ${task.isCompleted && 'task__completed'}`}>
            <Grid container spacing={0}>
                <Grid item xs={7} className='task__details'>
                    <h3 className='task__prop task__title'>{task.title}</h3>
                </Grid>
                <Grid item xs={2}>
                    <h4 className='task__prop task__text__center'>{task.taskType.toUpperCase()}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4 className='task__prop task__text__center'>{new Date(task.dueDate).toDateString()}</h4>
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
                    <p className='task__prop task__description'>{task.description}</p>
                </Grid>
            </Grid>
            <div className='icons--container'>
                {task.isCompleted ?
                    <div className="task__icon remove__done__icon"  onClick={handleUpdateStatus}><RemoveDoneIcon/></div> : 
                    <div className='task__icon done__icon'  onClick={handleUpdateStatus}><DoneOutlineIcon/></div>                    
                }
                <div className='task__icon edit__icon' onClick={handleEdit}>
                    <EditIcon/>
                </div>
                <div className='task__icon delete__icon' onClick={handleDelete}>
                    <DeleteForeverIcon/>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditTask task={task} setOpened={setOpen}/>
                </Box>
            </Modal>
        </Box>
    )
}