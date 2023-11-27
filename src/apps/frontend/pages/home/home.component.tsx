import React from "react";
import { useDeps } from "../../contexts";
import { useNavigate } from "react-router-dom";
import './home.component.scss';
import Grid from '@mui/material/Grid';
import TaskList from "../../components/taskList/tasklist.component";
import Sidebar from "../../components/sidebar/sidebar.component";
import { TasksDetailsProvider } from "../../contexts/tasks.provider";
import { Task } from "../../types/task.types";
import { TasksService } from "../../services/tasks.service";

export default function Home(): React.ReactElement {

    const [tasks, setTasks] = React.useState<Task[]>([]);

    const { setIsLoginPage } = useDeps();
    const navigate = useNavigate();
    React.useEffect(() => {
        if(!localStorage.getItem('x-auth-token')) navigate('/');
        setIsLoginPage(false);
    },[]);
    React.useEffect(() => {
        const fetchTasks = async() => {
            try{
                const tasksService = new TasksService();
                const fetchedTasks:any = await tasksService.getTasks();
                setTasks(fetchedTasks.data.tasks);
            } catch(err) {
                console.log(err);
            }
        }
        fetchTasks();
    },[]);

    React.useEffect(() => {console.log(tasks)},[tasks]);
    return(
        <TasksDetailsProvider taskProps={{
            tasks, setTasks,
            tasksService: new TasksService()
            }}>
            <Grid container spacing={0} className="home--container">
                <Grid item xs={4} className='sidebar__grid__item'>
                    <Sidebar/>
                </Grid>
                <Grid item xs={1} className='line__grid__item'>
                    <div className="home__line"></div>
                </Grid>
                <Grid item xs={7} className='tasklist__grid__item'>
                    <TaskList/>
                </Grid>
            </Grid>
        </TasksDetailsProvider>
    )
}