import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthorizationStatus } from '@/app/store/model/auth-status';
import { useAppSelector } from '@/app/store/model/hooks';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const isAuthorized = useAppSelector(
    (state) => state.authorizationStatus === AuthorizationStatus.Auth,
  );

  return isAuthorized ? children : <Navigate to={'/login'} />;
};
