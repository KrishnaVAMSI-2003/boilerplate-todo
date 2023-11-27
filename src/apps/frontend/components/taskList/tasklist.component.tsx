import { Box } from "@mui/material";
import React from "react";
import TaskComponent from "./task.component";
import { useTasks } from "../../contexts/tasks.provider";

export default function TaskList(): React.ReactElement {
    const { tasks } = useTasks();
    return(
        <Box className="tasklist--container">
            {tasks.map((task, index) => {
                return <TaskComponent key={index} task={task}/>
            })}
        </Box>
    )
}