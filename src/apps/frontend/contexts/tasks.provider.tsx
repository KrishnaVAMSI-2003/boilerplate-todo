import React, { createContext, ReactNode, useContext } from 'react';
import { TasksService } from '../services/tasks.service';
import { Task, Filters } from '../types/task.types';

type TasksContextType = {
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  filters: Filters,
  setFilters: React.Dispatch<React.SetStateAction<Filters>>,
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
  