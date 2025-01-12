import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@/app/store/model/hooks';
import { getIsAuthenticated } from '@/entities/user';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const isAuthorized = useAppSelector(getIsAuthenticated);

  return isAuthorized ? children : <Navigate to={'/login'} />;
};
