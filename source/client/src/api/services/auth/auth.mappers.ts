import {
  ApiLoginUserRequestBody,
  ApiLoginUserResponse,
  ApiUserRegistrationRequestBody,
  ApiUserRegistrationResponse,
} from '@/api/response-types/user-registeratin';
import {
  LoginUserRequirements,
  LoginUserResult,
  RegisterUserRequirements,
  UserRegistrationResult,
} from './auth.types';

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
});
