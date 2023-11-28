/* eslint-disable max-classes-per-file */
import AppError from '../error/app-error';
import {check} from 'express-validator';

export class AccessToken {
  accountId: string;

  expiresAt?: Date;

  token: string;
}

export type CreateAccessTokenParams = {
  username: string;
  password: string;
};

export enum AccessTokenErrorCode {
  UNAUTHORIZED_ACCESS = 'ACCESS_TOKEN_ERR_01',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_ERR_02',
  AUTHORIZATION_HEADER_NOT_FOUND = 'ACCESS_TOKEN_ERR_03',
  INVALID_AUTHORIZATION_HEADER = 'ACCESS_TOKEN_ERR_04',
}

export const CreateAccessTokenParamsValidationSchema = [
  check('username', 'Username is required').exists().isAlphanumeric().withMessage('Username must be alphanumeric')
  .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),

  check('password', 'Password is required').exists()
  .trim().isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 and 20 characters')
]

export class AccessTokenExpiredError extends AppError {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is expired. Please request a new one.');
    this.code = AccessTokenErrorCode.ACCESS_TOKEN_EXPIRED;
    this.httpStatusCode = 401;
  }
}

export class AuthorizationHeaderNotFound extends AppError {
  code: AccessTokenErrorCode;

  constructor() {
    super('No authorization header found.');
    this.code = AccessTokenErrorCode.AUTHORIZATION_HEADER_NOT_FOUND;
    this.httpStatusCode = 401;
  }
}

export class InvalidAuthorizationHeader extends AppError {
  code: AccessTokenErrorCode;

  constructor() {
    super('Invalid authorization header. Expected format is "Bearer <token>".');
    this.code = AccessTokenErrorCode.INVALID_AUTHORIZATION_HEADER;
    this.httpStatusCode = 401;
  }
}

export class UnAuthorizedAccessError extends AppError {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is not authorized to access the given resource');
    this.code = AccessTokenErrorCode.UNAUTHORIZED_ACCESS;
    this.httpStatusCode = 401;
  }
}

export class CreateAccessTokenParamsValidationError extends AppError {
  code: AccessTokenErrorCode;

  constructor(message: string) {
    super(message);
    this.code = AccessTokenErrorCode.UNAUTHORIZED_ACCESS;
    this.httpStatusCode = 401;
  }
}