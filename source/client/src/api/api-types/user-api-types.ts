export interface ApiUserInformationResponse {
  blocked: boolean;
  confirmed: string;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  username: string;
}

export interface ApiUserRegistrationResponse {
  jwt: string;
  user: ApiUserInformationResponse;
}

export interface ApiUserRegistrationRequestBody {
  email: string;
  password: string;
  username: string;
}

export type ApiLoginUserResponse = ApiUserRegistrationResponse;

export interface ApiLoginUserRequestBody {
  identifier: string;
  password: string;
}
