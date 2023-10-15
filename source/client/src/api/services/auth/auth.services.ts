import { RegisterUserRequirements } from './auth.types';
import { ApiUserRegistrationResponse } from '@/api/response-types/user-registeratin';
import { endPoints } from '@/api/end-points';
import { authMappers } from './auth.mappers';
import { HttpClient } from '@/api/http-client';
import { serviceWithMapping } from '@/api/service-with-mapping';

export const authServices = Object.freeze({
  registerUser: serviceWithMapping(
    (requirments: RegisterUserRequirements) =>
      HttpClient<ApiUserRegistrationResponse>({
        url: endPoints.registerUser,
        method: 'POST',
        data: authMappers.registerUser.toRequestBody(requirments),
      }),
    authMappers.registerUser.toClient
  ),
});
