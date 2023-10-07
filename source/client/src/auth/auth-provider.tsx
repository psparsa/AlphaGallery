import { UserInfoResponse, useUserInfo } from '@/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';

type AuthState =
  | {
      isAuthenticated: true;
      userInfo: UserInfoResponse;
    }
  | {
      isAuthenticated: false;
      userInfo: undefined;
    };

interface AuthAction {
  payload: UserInfoResponse;
  type: 'set-user-info';
}

const authInitialState: AuthState = {
  isAuthenticated: false,
  userInfo: undefined,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'set-user-info': {
      return { ...state, isAuthenticated: true, userInfo: action.payload };
    }
    default: {
      return state;
    }
  }
};

export type AuthContext = AuthState & {
  isUserDataLoading: boolean;
  login: (values: { jwt: string }) => void;
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

  const { isLoading, isFetching } = useUserInfo({
    jwt: token,
    onError: () => Cookies.remove('token'),
    onSuccess: (result) => {
      authDispatch({ type: 'set-user-info', payload: result });
    },
  });

  const login: AuthContext['login'] = ({ jwt }) => {
    Cookies.set('token', jwt);
    setToken(jwt);
    void router.replace('/');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        isUserDataLoading: isLoading && isFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};