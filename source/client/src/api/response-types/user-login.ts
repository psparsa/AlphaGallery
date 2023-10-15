import { ApiUserRegistrationResponse } from './user-registeratin';

export type ApiLoginUserResponse = ApiUserRegistrationResponse;

export interface ApiLoginUserRequestBody {
  identifier: string;
  password: string;
}
