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
}