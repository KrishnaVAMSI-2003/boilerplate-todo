export enum TaskTypeEnum {
    PERSONAL = "personal",
    OFFICIAL = "official",
    HOBBY = "hobby",  
}

export type AddTaskParams = {
    title: string;
    description: string;
    dueDate: Date;
    taskType: TaskTypeEnum;
};

export type Task = AddTaskParams & {
    id: string;
    accountId: string;
    isCompleted: boolean;
};

export type TaskContextType = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export enum statusFiltersEnum {
    ALL = "all",
    COMPLETED = "completed",
    INCOMPLETE = "incomplete"
}

export enum timelineFiltersEnum {
    OVERDUE = 'overdue',
    TODAY = 'today',
    UPCOMING = 'upcoming',
}

export type Filters = {
    status: statusFiltersEnum,
    timeline: timelineFiltersEnum,
}

export type SnackBar = {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
};