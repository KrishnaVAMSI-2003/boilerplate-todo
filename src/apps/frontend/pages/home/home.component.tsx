import React from "react";
import { useDeps } from "../../contexts";
import { useNavigate } from "react-router-dom";
import './home.component.scss';
import Grid from '@mui/material/Grid';
import TaskList from "../../components/taskList/tasklist.component";
import Sidebar from "../../components/sidebar/sidebar.component";

export default function Home(): React.ReactElement {
    const { setIsLoginPage } = useDeps();
    const navigate = useNavigate();
    React.useEffect(() => {
        if(!localStorage.getItem('x-auth-token')) navigate('/');
        setIsLoginPage(false);
    },[]);
    return(
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
    )
}