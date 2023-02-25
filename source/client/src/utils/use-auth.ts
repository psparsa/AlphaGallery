import React from 'react';
import { UserInfoResponse, useUserInfo } from '@/api';
import Cookies from 'js-cookie';

export interface UseAuthArguments {
  initialUserData?: UserInfoResponse;
}

export const useAuth = ({ initialUserData }: UseAuthArguments) => {
  const [token, setToken] = React.useState(Cookies.get('token'));
  const { data, isLoading } = useUserInfo({
    jwt: token,
    initialData: initialUserData,
    onError: () => Cookies.remove('token'),
  });
  const userId = data?.id;

  const userDataIsLoading = isLoading && !!token;
  const isAuthenticated = !!userId;

  React.useEffect(() => {
    const updateToken = () => {
      const currentToken = Cookies.get('token');
      if (currentToken !== token) setToken(currentToken);
    };

    window.addEventListener('focus', updateToken);
    return () => window.removeEventListener('focus', updateToken);
  }, [token]);

  return {
    isAuthenticated,
    userDataIsLoading,
  };
};
