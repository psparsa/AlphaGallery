import {
  ApiUserRegistrationRequestBody,
  ApiUserRegistrationResponse,
} from '@/api/response-types/user-registeratin';
import { RegisterUserRequirements, UserRegistrationResult } from './auth.types';

export const authMappers = Object.freeze({
  registerUser: {
    toClient: (
      response: ApiUserRegistrationResponse
    ): UserRegistrationResult => ({ token: response.jwt }),
    toRequestBody: (
      requirments: RegisterUserRequirements
    ): ApiUserRegistrationRequestBody => ({ ...requirments }),
  },
});
