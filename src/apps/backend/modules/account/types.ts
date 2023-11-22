/* eslint-disable max-classes-per-file */
import AppError from '../error/app-error';
import { check } from 'express-validator'

export class Account {
  id: string;

  username: string;

  email: string;

  hashedPassword: string;
}

export type CreateAccountParams = {
  username: string;
  email: string;
  password: string;
};

export type AccountSearchParams = {
  username: string;
  email?: string;
  password: string;
};

export enum AccountErrorCode {
  USERNAME_OR_EMAIL_ALREADY_EXISTS = 'ACCOUNT_ERR_01',
  NOT_FOUND = 'ACCOUNT_ERR_02',
  INVALID_CREDENTIALS = 'ACCOUNT_ERR_03',
}

export const CreateAccountParamsValidationSchema = [
  check('username', 'Username is required').exists().isAlphanumeric().withMessage('Username must be alphanumeric')
  .isLength({ min: 6, max: 20 }).withMessage('Username must be between 6 and 20 characters'),

  check('email', 'Email is required').exists().isEmail().withMessage('Email must be valid'),

  check('password', 'Password is required').exists()
  .trim().isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 and 20 characters')
]

export class AccountWithUserNameExistsError extends AppError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`An account with username ${username} already exists.`);
    this.code = AccountErrorCode.USERNAME_OR_EMAIL_ALREADY_EXISTS;
    this.httpStatusCode = 409;
  }
}

export class AccountNotFoundError extends AppError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`${username} not found with provided parameters.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}

export class InvalidCredentialsError extends AppError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`Invalid credentials for ${username}. Please try again.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = 401;
  }
}

export class CreateAccountParamsValidationError extends AppError {
  code: AccountErrorCode;

  constructor(message: string) {
    super(message);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = 401;
  }
}
