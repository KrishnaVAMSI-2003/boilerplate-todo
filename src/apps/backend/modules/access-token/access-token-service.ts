import AccessTokenWriter from './internal/access-token-writer';
import { AccessToken, CreateAccessTokenParams, CreateAccessTokenParamsValidationError } from './types';
import {ValidationError } from 'express-validator';

export default class AccessTokenService {
  public static validateCreateAccessTokenParams(errors: ValidationError[]) {
    if(errors.length > 0) {
      throw new CreateAccessTokenParamsValidationError(errors[0].msg);
    }
  }

  public static async createAccessToken(
    params: CreateAccessTokenParams,
  ): Promise<AccessToken> {
    return AccessTokenWriter.createAccessToken(params);
  }
}
