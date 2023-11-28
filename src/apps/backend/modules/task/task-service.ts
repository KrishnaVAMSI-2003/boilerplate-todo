import { ValidationError } from 'express-validator';

import TaskReader from './internal/task-reader';
import TaskWriter from './internal/task-writer';
import {
  CreateTaskParams,
  DeleteTaskParams,
  GetAllTaskParams,
  GetTaskParams,
  GetTaskByTitleParams,
  Task,
  CreateTaskValidationError,
  UpdateTaskValidationError,
  UpdateTaskParams,
  UpdateTaskStatusParams,
} from './types';

export default class TaskService {

  public static createTaskValidationResult(errors: ValidationError[]) {
    if(errors.length>0) {
      throw new CreateTaskValidationError(errors[0].msg);
    }
  }

  public static async createTask(params: CreateTaskParams): Promise<Task> {
    return TaskWriter.createTask(params);
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    return TaskWriter.deleteTask(params);
  }

  public static async getTaskForAccount(params: GetTaskParams): Promise<Task> {
    return TaskReader.getTaskForAccount(params);
  }

  public static async getTaskByTitleForAccount(params: GetTaskByTitleParams): Promise<Task> {
    return TaskReader.getTaskByTitleForAccount(params);
  }

  public static async getTasksForAccount(params: GetAllTaskParams): Promise<Task[]> {
    return TaskReader.getTasksForAccount(params);
  }

  public static updateTaskValidationResult(errors: ValidationError[]) {
    if(errors.length>0) {
      throw new UpdateTaskValidationError(errors[0].msg);
    }
  }
  public static async updateTask(params: UpdateTaskParams): Promise<Task> {
    return TaskWriter.updateTask(params);
  }

  public static async updateTaskStatus(params: UpdateTaskStatusParams): Promise<Task> {
    return TaskWriter.updateTaskStatus(params);
  }
}
