import { State } from '@/app/store/model/types';
import { AuthorizationStatus, NameSpace } from '@/shared/model/enums';

export const getIsAuthenticated = (state: State) =>
  state[NameSpace.USER].authorizationStatus === AuthorizationStatus.AUTH;

export const getAuthorizationStatus = (state: State) =>
  state[NameSpace.USER].authorizationStatus;

export const getUser = (state: State) => state[NameSpace.USER].user;
