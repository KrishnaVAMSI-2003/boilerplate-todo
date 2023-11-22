import { Router } from 'express';

import TaskController from './task-controller';
import { CreateTaskValidationSchema } from '../types';

export default class TaskRouter {
  public static getRoutes(): Router {
    const router = Router({ mergeParams: true });

    router.post('/', CreateTaskValidationSchema, TaskController.createTask);
    router.get('/', TaskController.getAllTasks);
    router.get('/:id', TaskController.getTask);
    router.delete('/:id', TaskController.deleteTask);

    return router;
  }
}
