import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserContext } from '@/entities/user';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { user } = useUserContext();

  return user.isLoggedIn ? children : <Navigate to={'/login'} />;
};
