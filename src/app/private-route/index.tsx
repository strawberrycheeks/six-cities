import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { getIsAuthenticated } from '@/entities/user';

import { useAppSelector } from '../store/hooks';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  return isAuthenticated ? children : <Navigate to={'/login'} />;
};
