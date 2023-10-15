export interface RegisterUserRequirements {
  email: string;
  password: string;
  username: string;
}

export interface UserRegistrationResult {
  token: string;
}

export interface LoginUserRequirements {
  identifier: string;
  password: string;
}

export type LoginUserResult = UserRegistrationResult;

export interface UserInformationResult {
  email: string;
  id: number;
  username: string;
}

export interface GetUserInformationRequirements {
  token?: string;
}
