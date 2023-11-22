/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import AccountController from './account-controller';
import { CreateAccountParamsValidationSchema } from '../types';

export default class AccountRouter {
  public static getRoutes(): Router {
    const router = Router();

    router.post('/', CreateAccountParamsValidationSchema, AccountController.createAccount);

    return router;
  }
}
