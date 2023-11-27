import React, { createContext, ReactNode, useContext } from 'react';
import { TasksService } from '../services/tasks.service';

// import { AddTaskParams } from '../types/task.types';

type TasksContextType = {
    tasks: any,
    setTasks: React.Dispatch<React.SetStateAction<any>>,
    tasksService: TasksService,
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function useTasks(): TasksContextType {
    return useContext(TasksContext);
}

export function TasksDetailsProvider(props: {
    children: ReactNode,
    taskProps: TasksContextType,
  }): React.ReactElement {
    const {
      children,
      taskProps,
    } = props;
  
    return (
      <TasksContext.Provider value={taskProps}>
        {children}
      </TasksContext.Provider>
    );
  }
  