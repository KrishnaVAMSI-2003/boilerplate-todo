import { ValidationError } from 'express-validator';
import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import { Account, AccountSearchParams, CreateAccountParams, CreateAccountParamsValidationError } from './types';

export default class AccountService {

  public static validateCreateAccountParms(erros: ValidationError[]): void {
    if(erros.length > 0) {
      throw new CreateAccountParamsValidationError(erros[0].msg);
    }
  }

  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    return AccountWriter.createAccount(params);
  }

  public static async getAccountByUsernamePassword(
    params: AccountSearchParams,
  ): Promise<Account> {
    return AccountReader.getAccountByUsernamePassword(params);
  }
}
