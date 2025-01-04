import { createAction } from '@reduxjs/toolkit';

import { City } from '@/entities/city';
import { OfferCardEntity } from '@/entities/offer-card';
import { AuthInfo } from '@/entities/user';

import { AuthorizationStatus } from './auth-status';

export const setCity = createAction<City>('city/set');

export const setOffers = createAction<OfferCardEntity[]>('offers/set');

export const setOffersLoadingStatus = createAction<boolean>(
  'offers/setLoadingStatus',
);

export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus',
);

export const setUser = createAction<AuthInfo | undefined>('user/set');
