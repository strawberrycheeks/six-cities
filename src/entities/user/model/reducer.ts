import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, NameSpace } from '@/shared/model/constants';

import { User } from '..';

type UserState = {
  user?: User;
  authorizationStatus: AuthorizationStatus;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

export const userSlice = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setAuthorizationStatus: (
      state,
      action: PayloadAction<AuthorizationStatus>,
    ) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { setUser, setAuthorizationStatus } = userSlice.actions;
