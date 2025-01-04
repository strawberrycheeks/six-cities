import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { saveToken } from '@/app/api/lib/token';
import { ApiRoutes } from '@/app/api/model/api-routes';
import { AuthorizationStatus } from '@/app/store/model/auth-status';
import { User } from '@/entities/user';

import { setAuthorizationStatus, setUser } from '../actions';
import { AppDispatch, AuthResponse, State } from '../types';

export const login = createAsyncThunk<
  void,
  User,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));

  const {
    status,
    data: { token, ...user },
  } = await api.post<AuthResponse>(ApiRoutes.LOGIN, {
    email,
    password,
  });

  if (status === Number(StatusCodes.CREATED)) {
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(user));
    saveToken(token);
  } else {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});
