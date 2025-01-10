import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { components } from '@/../types/schema';
import { removeToken, saveToken } from '@/app/api/lib/token';
import { ApiRoutes } from '@/app/api/model/api-routes';
import { DispatchStateExtra } from '@/app/store/model/types';
import { AuthorizationStatus, NameSpace } from '@/shared/model/enums';

import { setAuthorizationStatus, setUser } from '../model/reducer';
import { User } from '../model/types';

type AuthResponse = Required<components['schemas']['AuthInfoWithToken']>;

export const checkLogin = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${NameSpace.USER}/checkLogin`,
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
      // TODO: показывать сообщение об ошибке пользователю (бэк сообщает, что именно не так)
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    }
  },
);

export const login = createAsyncThunk<void, User, DispatchStateExtra>(
  `${NameSpace.USER}/login`,
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

export const logout = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${NameSpace.USER}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoutes.LOGOUT);
    dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    dispatch(setUser(undefined));
    removeToken();
  },
);
