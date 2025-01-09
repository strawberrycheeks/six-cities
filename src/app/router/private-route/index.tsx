import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@/app/store/model/hooks';
import { AuthorizationStatus } from '@/shared/model/enums';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const isAuthorized = useAppSelector(
    (state) => state.authorizationStatus === AuthorizationStatus.AUTH,
  );

  return isAuthorized ? children : <Navigate to={'/login'} />;
};
