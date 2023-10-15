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
