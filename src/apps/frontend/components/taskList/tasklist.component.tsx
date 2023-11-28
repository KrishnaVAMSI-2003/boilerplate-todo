import { Box } from "@mui/material";
import React from "react";
import TaskComponent from "./task.component";
import { useTasks } from "../../contexts/tasks.provider";

export default function TaskList(): React.ReactElement {
    const { tasks, filters } = useTasks();
    return(
        <Box className="tasklist--container">
            {tasks.map((task, index) => {
                if((filters.status === 'completed' && !task.isCompleted) || (filters.status as string === 'active' && task.isCompleted)) 
                return null;
            
                const taskDate = new Date(new Date(task.dueDate).toDateString());
                const todayDate = new Date(new Date().toDateString());

                if(filters.timeline as string === 'overdue' && taskDate >= todayDate) return null;
                else if(filters.timeline as string === 'today' && taskDate.toDateString() !== todayDate.toDateString()) return null;
                else if(filters.timeline as string === 'upcoming' && taskDate <= todayDate) return null;

                return <TaskComponent key={index} task={task}/>
            })}
        </Box>
    )
}