import APIService from './api.service';
import { LoginUserDetails, SignupUserDetails } from '../types/auth.types';

export class AccessService extends APIService {
  login(userDetails: LoginUserDetails): Promise<void> {
    const {username, password} = userDetails;
    return this.apiClient.post('/access-tokens', {
      username,
      password,
    });
  }
}

export class SignupService extends APIService {
  register(userDetails: SignupUserDetails): Promise<void> {
    const {username, password, email} = userDetails;
    return this.apiClient.post("/accounts", {
      username,
      password,
      email,
    });
  }
}