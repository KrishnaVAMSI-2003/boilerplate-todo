// eslint-disable-next-line max-classes-per-file
import AppError from '../error/app-error';
import { check } from 'express-validator';

export enum TaskTypeEnum {
  PERSONAL = "personal",
  OFFICIAL = "official",
  HOBBY = "hobby",  
}

export class Task {
  id: string;

  accountId: string;

  title: string;

  description: string;

  dueDate: Date;

  taskType: TaskTypeEnum;

  isCompleted: boolean;
}

export type GetAllTaskParams = {
  accountId: string;
  page?: number;
  size?: number;
};

export type GetTaskParams = {
  accountId: string;
  taskId: string;
};

export type GetTaskByNameParams = {
  accountId: string,
  name: string;
};

export type CreateTaskParams = {
  accountId: string;
  title: string;
  description: string;
  dueDate: Date;
  taskType: TaskTypeEnum;
};

export type DeleteTaskParams = {
  accountId: string;
  taskId: string;
};

export type PaginationParams = {
  page: number;
  size: number;
};

export enum TaskErrorCode {
  NOT_FOUND = 'TASK_ERR_01',
  TASK_ALREADY_EXISTS = 'TASK_ERR_02',
  UNAUTHORIZED_TASK_ACCESS = 'TASK_ERR_03',
  INVALID_DETAILS = 'TASK_ERR_04',
}

export const CreateTaskValidationSchema = [
  check('title', 'Title is required').exists(),
  check('description', 'Description is required').exists(),
  check('dueDate', 'Due date is required').exists(),
  check('taskType', 'Task type is required').exists().isIn(Object.values(TaskTypeEnum)),
]

export class TaskWithNameExistsError extends AppError {
  code: TaskErrorCode;

  constructor(name: string) {
    super(`Task with name ${name} already exists.`);
    this.code = TaskErrorCode.TASK_ALREADY_EXISTS;
    this.httpStatusCode = 409;
  }
}

export class TaskNotFoundError extends AppError {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}

export class TaskWithNameNotFoundError extends AppError {
  code: TaskErrorCode;

  constructor(taskName: string) {
    super(`Task with name ${taskName} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}

export class CreateTaskValidationError extends AppError {
  code : TaskErrorCode;

  constructor(message: string) {
    super(message);
    this.code = TaskErrorCode.INVALID_DETAILS;
    this.httpStatusCode = 400;
  }

}