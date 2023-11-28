import { Router } from 'express';

import TaskController from './task-controller';
import { CreateTaskValidationSchema, UpdateTaskValidationSchema } from '../types';

export default class TaskRouter {
  public static getRoutes(): Router {
    const router = Router({ mergeParams: true });

    router.post('/', CreateTaskValidationSchema, TaskController.createTask);
    router.get('/', TaskController.getAllTasks);
    router.get('/:taskId', TaskController.getTask);
    router.put('/:taskId', UpdateTaskValidationSchema, TaskController.updateTask);
    router.patch('/:taskId', TaskController.updateTaskStatus);
    router.delete('/:taskId', TaskController.deleteTask);

    return router;
  }
}
