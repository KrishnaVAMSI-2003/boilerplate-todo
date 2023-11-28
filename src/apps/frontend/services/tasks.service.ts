import APIService from './api.service';
import { AddTaskParams, Task } from '../types/task.types';

export class TasksService extends APIService {

  addTask(task: AddTaskParams): Promise<void> {
    const accountId = localStorage.getItem("accountId");
    const { title, description, dueDate, taskType} = task;
    return this.apiClient.post(`accounts/${accountId}/tasks`, {
        title,
        description,
        dueDate,
        taskType
    },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("x-auth-token")}`
        }
    });
  }

  getTasks(): Promise<void> {
    const accountId = localStorage.getItem("accountId");
    return this.apiClient.get(`accounts/${accountId}/tasks`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("x-auth-token")}`
        }
    });
  }

  editTask(task: Task): Promise<void> {
    const accountId = localStorage.getItem("accountId");
    const { title, description, dueDate, taskType, isCompleted} = task;
    return this.apiClient.put(`accounts/${accountId}/tasks/${task.id}`, {
        title,
        description,
        dueDate,
        taskType,
        isCompleted,
    },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("x-auth-token")}`
        }
    });
  }
  
  updateTaskStatus(taskId: string): Promise<void> {
    const accountId = localStorage.getItem("accountId");
    return this.apiClient.patch(`accounts/${accountId}/tasks/${taskId}`,{}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("x-auth-token")}`
        }
    });
  }

  deleteTask(taskId: string): Promise<void> {
    const accountId = localStorage.getItem("accountId");
    return this.apiClient.delete(`accounts/${accountId}/tasks/${taskId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("x-auth-token")}`
        }
    });
  }
}
