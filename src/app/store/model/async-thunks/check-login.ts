import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { saveToken } from '@/app/api/lib/token';
import { ApiRoutes } from '@/app/api/model/api-routes';
import { AuthorizationStatus } from '@/app/store/model/auth-status';

import { setAuthorizationStatus, setUser } from '../actions';
import { AppDispatch, AuthResponse, State } from '../types';

export const checkLogin = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkLogin', async (_arg, { dispatch, extra: api }) => {
  dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));

  const {
    status,
    data: { token, ...user },
  } = await api.get<AuthResponse>(ApiRoutes.LOGIN);

  if (status === Number(StatusCodes.OK)) {
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(user));
    saveToken(token);
  } else {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});
