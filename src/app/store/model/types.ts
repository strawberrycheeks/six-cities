import { AxiosInstance } from 'axios';

import { components } from '@/../types/schema';
import { City } from '@/entities/city';
import { OfferMaximum, OfferPreview } from '@/entities/offer-card';
import { CommentGet } from '@/entities/review';
import { AuthInfo } from '@/entities/user';

import { store } from '..';
import { AuthorizationStatus, FetchStatus } from './enums';

export type State = {
  city: City;

  user?: AuthInfo;
  authorizationStatus: AuthorizationStatus;

  offers?: OfferPreview[];
  offersFetchStatus: FetchStatus;

  offer?: OfferMaximum;
  offerFetchStatus: FetchStatus;

  reviews?: CommentGet[];
  reviewsFetchStatus: FetchStatus;
};

export type DispatchStateExtra = {
  dispatch: AppDispatch;
  getState: () => State;
  extra: AxiosInstance;
};

export type AppDispatch = typeof store.dispatch;

export type AuthResponse = Required<components['schemas']['AuthInfoWithToken']>;
