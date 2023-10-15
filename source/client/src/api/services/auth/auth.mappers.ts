import {
  GetUserInformationRequirements,
  LoginUserRequirements,
  LoginUserResult,
  RegisterUserRequirements,
  UserInformationResult,
  UserRegistrationResult,
} from './auth.types';

import {
  ApiUserRegistrationRequestBody,
  ApiUserRegistrationResponse,
} from '@/api/response-types/user-registeratin';

import {
  ApiLoginUserRequestBody,
  ApiLoginUserResponse,
} from '@/api/response-types/user-login';
import { ApiUserInformationResponse } from '@/api/response-types/user-information';

export const authMappers = Object.freeze({
  registerUser: {
    toClient: (
      response: ApiUserRegistrationResponse
    ): UserRegistrationResult => ({ token: response.jwt }),
    toRequestBody: (
      requirments: RegisterUserRequirements
    ): ApiUserRegistrationRequestBody => ({ ...requirments }),
  },
  loginUser: {
    toClient: (response: ApiLoginUserResponse): LoginUserResult => ({
      token: response.jwt,
    }),
    toRequestBody: (
      requirments: LoginUserRequirements
    ): ApiLoginUserRequestBody => ({ ...requirments }),
  },
  getUserInfo: {
    toClient: (
      response: ApiUserInformationResponse
    ): UserInformationResult => ({
      email: response.email,
      id: response.id,
      username: response.username,
    }),
    toRequestHeader: (requirments: GetUserInformationRequirements) =>
      requirments.token
        ? {
            Authorization: `Bearer ${requirments.token}`,
          }
        : undefined,
  },
});
