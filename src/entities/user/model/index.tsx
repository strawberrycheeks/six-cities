import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { UserData, UserDataContext } from './types';

const defaultUserDataValue = {
  isLoggedIn: true,
};

const defaultContextValue: UserDataContext = {
  user: defaultUserDataValue,
  logout: () => {},
  login: () => true,
};

export const UserContext = createContext<UserDataContext>(defaultContextValue);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState<UserData>(defaultUserDataValue);

  const logout = () => setUserData(defaultUserDataValue);

  const login: UserDataContext['login'] = (email, password) => {
    if (password === '123456') {
      setUserData({
        isLoggedIn: true,
        email,
      });
      return true;
    }

    return false;
  };

  const contextValue = useMemo(
    () => ({
      user: userData,
      logout,
      login,
    }),
    [userData],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
