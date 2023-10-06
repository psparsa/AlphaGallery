import { RegisterUserRequirements } from './auth.types';
import { ApiUserRegistrationResponse } from '@/api/response-types/user-registeratin';
import { endPoints } from '@/api/end-points';
import { authMappers } from './auth.mappers';
import { HttpClient } from '@/api/http-client';

export const authServices = Object.freeze({
  registerUser: (requirments: RegisterUserRequirements) =>
    HttpClient<ApiUserRegistrationResponse>({
      url: endPoints.registerUser,
      method: 'POST',
      data: authMappers.registerUser.toRequestBody(requirments),
    }),
});
