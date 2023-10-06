import { ApiUserRegistrationRequestBody } from '@/api/response-types/user-registeratin';
import { RegisterUserRequirements } from './auth.types';

export const authMappers = Object.freeze({
  registerUser: {
    toRequestBody: (
      requirments: RegisterUserRequirements
    ): ApiUserRegistrationRequestBody => ({ ...requirments }),
  },
});
