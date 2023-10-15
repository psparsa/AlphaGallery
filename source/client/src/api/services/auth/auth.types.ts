export interface RegisterUserRequirements {
  email: string;
  password: string;
  username: string;
}

export interface UserRegistrationResult {
  token: string;
}
