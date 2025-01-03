import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserContext } from '@/entities/User';

export const LoggedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useUserContext();

  return user.isLoggedIn ? children : <Navigate to={'/login'} />;
};
