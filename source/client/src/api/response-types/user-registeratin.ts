import { ApiUserInformationResponse } from './user-information';

export interface ApiUserRegistrationResponse {
  jwt: string;
  user: ApiUserInformationResponse;
}

export interface ApiUserRegistrationRequestBody {
  email: string;
  password: string;
  username: string;
}