import {
  GetUserInformationRequirements,
  LoginUserRequirements,
  LoginUserResult,
  RegisterUserRequirements,
  UserInformationResult,
  UserRegistrationResult,
} from './auth.types';

import {
  ApiLoginUserRequestBody,
  ApiLoginUserResponse,
  ApiUserInformationResponse,
  ApiUserRegistrationRequestBody,
  ApiUserRegistrationResponse,
} from '@/api/api-types/user-api-types';

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
