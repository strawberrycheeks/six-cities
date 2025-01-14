import { Action } from '@reduxjs/toolkit';

import { ApiRoute } from '@/app/api/routes';
import { initAsyncActionsStore } from '@/app/lib/mocks';
import { AuthorizationStatus, NameSpace } from '@/shared/model/constants';

import { makeUser } from '../lib/mocks';
import { setAuthorizationStatus, setUser } from '../model/reducer';
import { checkLogin, logout } from './api-actions';

const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('async user actions', () => {
  const { mockAxiosAdapter, mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.USER]: { authorizationStatus: AuthorizationStatus.UNKNOWN },
    });
  });

  it('should dispatch "checkLogin.pending", "setAuthorizationStatus" and "checkLogin.rejected" with thunk "checkLogin" on 200', async () => {
    mockAxiosAdapter.onGet(ApiRoute.LOGIN).reply(200, makeUser());

    await store.dispatch(checkLogin());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      checkLogin.pending.type,
      setAuthorizationStatus.type,
      setAuthorizationStatus.type,
      setUser.type,
      checkLogin.fulfilled.type,
    ]);
  });

  it('should dispatch "checkLogin.pending", "setAuthorizationStatus" and "checkLogin.rejected" with thunk "checkLogin" on 400', async () => {
    mockAxiosAdapter.onGet(ApiRoute.LOGIN).reply(400);

    await store.dispatch(checkLogin());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      checkLogin.pending.type,
      setAuthorizationStatus.type,
      checkLogin.rejected.type,
    ]);
  });

  it('should dispatch "logout.pending", "setAuthorizationStatus", "setUser" and "logout.fulfilled" with thunk "logout"', async () => {
    mockAxiosAdapter.onDelete(ApiRoute.LOGIN).reply(200);

    await store.dispatch(logout());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      logout.pending.type,
      setAuthorizationStatus.type,
      setUser.type,
      logout.fulfilled.type,
    ]);
  });
});
