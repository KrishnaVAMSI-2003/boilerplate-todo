import APIService from './api.service';
import { SignupUserDetails } from '../types/auth.types';
import { AddTaskParams } from '../types/task.types';

export class TasksService extends APIService {
  addtask(task: AddTaskParams): Promise<void> {
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

  deleteTask(taskId: string): Promise<void> {
    const accountId = localStorage.getItem("accountId");
    return this.apiClient.delete(`accounts/${accountId}/tasks/${taskId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("x-auth-token")}`
        }
    });
  }
}

export class UserService extends APIService {
  register(userDetails: SignupUserDetails): Promise<void> {
    const {username, password, email} = userDetails;
    return this.apiClient.post("/accounts", {
      username,
      password,
      email,
    });
  }
}