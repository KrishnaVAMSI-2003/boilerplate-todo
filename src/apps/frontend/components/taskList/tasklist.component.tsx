import { Box } from "@mui/material";
import React from "react";
import TaskComponent from "./task.component";

export default function TaskList(): React.ReactElement {
    return(
        <Box className="tasklist--container">
            <TaskComponent/>
            <TaskComponent/>
            <TaskComponent/>
            <TaskComponent/>
            <TaskComponent/>
            <TaskComponent/>
        </Box>
    )
}