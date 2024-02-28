import { authHooks } from '@/api/services/auth/auth.hooks';
import { UserInformationResult } from '@/api/services/auth/auth.types';
import { COOKIE_STORAGE_KEYS } from '@/constants/cookie-storage-keys';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';

type AuthState =
  | {
      isAuthenticated: true;
      userInfo: UserInformationResult;
    }
  | {
      isAuthenticated: false;
      userInfo: undefined;
    };

type AuthAction =
  | {
      payload: UserInformationResult;
      type: 'set-user-info';
    }
  | {
      type: 'clear-user-info';
    };

const authInitialState: AuthState = {
  isAuthenticated: false,
  userInfo: undefined,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'set-user-info': {
      return { ...state, isAuthenticated: true, userInfo: action.payload };
    }
    case 'clear-user-info': {
      return {
        isAuthenticated: false,
        userInfo: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export type AuthContext = AuthState & {
  isUserDataLoading: boolean;
  login: (values: { jwt: string }) => void;
  logout: () => void;
};

export const AuthContext = React.createContext({} as unknown as AuthContext);

export interface AuthProviderProperties {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProperties) => {
  const router = useRouter();
  const [token, setToken] = React.useState(Cookies.get('token'));
  const [authState, authDispatch] = React.useReducer(
    authReducer,
    authInitialState
  );

  const { isLoading, isFetching } = authHooks.useUserInfo(
    { token },
    {
      enabled: !!token,
      retry: 3,
      retryDelay: 500,
      onError: () => Cookies.remove('token'),
      onSuccess: (result) => {
        authDispatch({ type: 'set-user-info', payload: result });
      },
    }
  );

  const login: AuthContext['login'] = ({ jwt }) => {
    Cookies.set(COOKIE_STORAGE_KEYS.token, jwt);
    setToken(jwt);
    void router.replace('/');
  };

  const logout: AuthContext['logout'] = () => {
    Cookies.remove(COOKIE_STORAGE_KEYS.token);
    setToken(undefined);
    authDispatch({ type: 'clear-user-info' });
    void router.replace('/');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        isUserDataLoading: isLoading && isFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
