import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, NameSpace } from '@/shared/model/enums';

import { AuthInfo } from './types';

export type UserState = {
  user?: AuthInfo;
  authorizationStatus: AuthorizationStatus;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

export const userSlice = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthInfo | undefined>) => {
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
