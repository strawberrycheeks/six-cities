import { createAsyncThunk } from '@reduxjs/toolkit';

import { removeToken } from '@/app/api/lib/token';
import { ApiRoutes } from '@/app/api/model/api-routes';
import { AuthorizationStatus } from '@/app/store/model/enums';

import { setAuthorizationStatus, setUser } from '../actions';
import { DispatchStateExtra } from '../types';

export const logout = createAsyncThunk<void, undefined, DispatchStateExtra>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoutes.LOGOUT);
    dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    dispatch(setUser(undefined));
    removeToken();
  },
);
