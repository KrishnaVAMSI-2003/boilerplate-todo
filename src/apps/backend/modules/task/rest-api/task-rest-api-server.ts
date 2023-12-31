import bodyParser from 'body-parser';
import express, { Application } from 'express';

import ErrorHandler from '../../error/error-handler';
import TaskRepository from '../internal/store/task-repository';
import AccountAuthMiddleware from '../../access-token/rest-api/account-auth-middleware';

import TaskRouter from './task-router';

export default class TaskRESTApiServer {
  public static async create(): Promise<Application> {
    await TaskRepository.createDBConnection();

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/accounts/:accountId/tasks',AccountAuthMiddleware.ensureAccess, TaskRouter.getRoutes());

    app.use(ErrorHandler.AppErrorHandler);

    return Promise.resolve(app);
  }
}
