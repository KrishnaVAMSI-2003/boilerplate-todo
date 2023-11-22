/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import AccessTokenController from './access-token-controller';
import { CreateAccessTokenParamsValidationSchema } from '../types';

export default class AccessTokenRouter {
  public static getRoutes(): Router {
    const router = Router();

    router.post('/', CreateAccessTokenParamsValidationSchema, AccessTokenController.createAccessToken);

    return router;
  }
}
