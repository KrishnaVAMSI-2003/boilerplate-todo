import {
  NextFunction, Request, Response,
} from 'express';
import { validationResult } from 'express-validator';

import TaskService from '../task-service';
import {
  Task,
  CreateTaskParams,
  GetAllTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  TaskTypeEnum,
  UpdateTaskParams,
  UpdateTaskStatusParams
} from '../types';

export default class TaskController {
  public static async createTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {

      const errors = validationResult(req);
      TaskService.createTaskValidationResult(errors.array());

      const params: CreateTaskParams = {
        accountId: req.params.accountId,
        title: req.body.title as string,
        description: req.body.description,
        dueDate: req.body.dueDate as Date,
        taskType: req.body.taskType as TaskTypeEnum
      };
      const task: Task = await TaskService.createTask(params);
      res.status(201).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  public static async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: DeleteTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.taskId,
      };
      await TaskService.deleteTask(params);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  public static async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <void> {
    try {
      const page = +req.query.page;
      const size = +req.query.size;
      const params: GetAllTaskParams = {
        accountId: req.params.accountId,
        page,
        size,
      };
      const tasks = await TaskService.getTasksForAccount(params);
      res.status(200).json({tasks: [...tasks.map((task) => TaskController.serializeTaskAsJSON(task))]});
    } catch (e) {
      next(e);
    }
  }

  public static async getTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: GetTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.taskId,
      };
      const task = await TaskService.getTaskForAccount(params);
      res.status(200).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  public static async updateTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const errors = validationResult(req);
      TaskService.updateTaskValidationResult(errors.array());
      const params: UpdateTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.taskId,
        title: req.body.title as string,
        description: req.body.description,
        dueDate: req.body.dueDate as Date,
        taskType: req.body.taskType as TaskTypeEnum,
        isCompleted: req.body.isCompleted as boolean,
      };
      const task = await TaskService.updateTask(params);
      res.status(200).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }

  }

  public static async updateTaskStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try{
      const params: UpdateTaskStatusParams = {
        accountId: req.params.accountId,
        taskId: req.params.taskId,
      };
      const task = await TaskService.updateTaskStatus(params);
      res.status(200).send(TaskController.serializeTaskAsJSON(task));
    } catch(e) {
      next(e);
    }
  }

  private static serializeTaskAsJSON(task: Task): unknown {
    return {
      id: task.id,
      account: task.accountId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      taskType: task.taskType,
      isCompleted: task.isCompleted,
    };
  }
}
