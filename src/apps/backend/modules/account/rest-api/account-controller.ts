import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import AccountService from '../account-service';
import { Account, CreateAccountParams } from '../types';

export default class AccountController {
  public static async createAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const erros = validationResult(req);
      AccountService.validateCreateAccountParms(erros.array());

      const { username, email, password }: CreateAccountParams = req.body as CreateAccountParams;
      const params: CreateAccountParams = { username, email, password };
      const account = await AccountService.createAccount(params);
      res.status(201).send(AccountController.serializeAccountAsJSON(account));
    } catch (e) {
      next(e);
    }
  }

  private static serializeAccountAsJSON(account: Account): unknown {
    return {
      id: account.id,
      username: account.username,
    };
  }
}
