import React from 'react';
import { AuthContext } from './auth-provider';

export const useAuth = () => React.useContext(AuthContext);
