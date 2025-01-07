import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { saveToken } from '@/app/api/lib/token';
import { ApiRoutes } from '@/app/api/model/api-routes';
import { AuthorizationStatus } from '@/app/store/model/enums';
import { User } from '@/entities/user';

import { setAuthorizationStatus, setUser } from '../actions';
import { AuthResponse, DispatchStateExtra } from '../types';

export const login = createAsyncThunk<void, User, DispatchStateExtra>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.UNKNOWN));

    const {
      status,
      data: { token, ...user },
    } = await api.post<AuthResponse>(ApiRoutes.LOGIN, {
      email,
      password,
    });

    if (status === Number(StatusCodes.CREATED)) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setUser(user));
      saveToken(token);
    } else {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    }
  },
);
