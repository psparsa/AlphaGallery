import {
  GetUserInformationRequirements as GetUserInformationRequirements,
  LoginUserRequirements,
  RegisterUserRequirements,
} from './auth.types';
import { ApiUserRegistrationResponse } from '@/api/response-types/user-registeratin';
import { endPoints } from '@/api/end-points';
import { authMappers } from './auth.mappers';
import { HttpClient } from '@/api/http-client';
import { serviceWithMapping } from '@/api/service-with-mapping';
import { ApiUserInformationResponse } from '@/api/response-types/user-information';
import { ApiLoginUserResponse } from '@/api/response-types/user-login';

export const authServices = {
  registerUser: serviceWithMapping(
    (requirments: RegisterUserRequirements) =>
      HttpClient<ApiUserRegistrationResponse>({
        url: endPoints.registerUser,
        method: 'POST',
        data: authMappers.registerUser.toRequestBody(requirments),
      }),
    authMappers.registerUser.toClient
  ),
  loginUser: serviceWithMapping(
    (requirments: LoginUserRequirements) =>
      HttpClient<ApiLoginUserResponse>({
        url: endPoints.login,
        method: 'POST',
        data: authMappers.loginUser.toRequestBody(requirments),
      }),
    authMappers.loginUser.toClient
  ),
  getUserInfo: serviceWithMapping(
    (requirments?: GetUserInformationRequirements) =>
      HttpClient<ApiUserInformationResponse>({
        url: endPoints.userInfo,
        method: 'GET',
        headers: authMappers.getUserInfo.toRequestHeader(requirments ?? {}),
      }),
    authMappers.getUserInfo.toClient
  ),
};
