import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { saveToken } from '@/app/api/lib/token';
import { ApiRoutes } from '@/app/api/model/api-routes';
import { AuthorizationStatus } from '@/app/store/model/enums';

import { setAuthorizationStatus, setUser } from '../actions';
import { AuthResponse, DispatchStateExtra } from '../types';

export const checkLogin = createAsyncThunk<void, undefined, DispatchStateExtra>(
  'user/checkLogin',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.UNKNOWN));

    const {
      status,
      data: { token, ...user },
    } = await api.get<AuthResponse>(ApiRoutes.LOGIN);

    if (status === Number(StatusCodes.OK)) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setUser(user));
      saveToken(token);
    } else {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    }
  },
);
