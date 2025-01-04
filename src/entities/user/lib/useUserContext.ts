import { useContext } from 'react';

import { UserContext } from '../model';

export const useUserContext = () => useContext(UserContext);
