import { components } from '@/../types/schema';
import { City } from '@/entities/city';
import { OfferCardEntity } from '@/entities/offer-card';
import { AuthInfo } from '@/entities/user';

import { store } from '..';
import { AuthorizationStatus } from './auth-status';

export type State = {
  city: City;

  offers?: OfferCardEntity[];
  isOffersLoading: boolean;

  user?: AuthInfo;
  authorizationStatus: AuthorizationStatus;
};

export type AppDispatch = typeof store.dispatch;

export type AuthResponse = Required<components['schemas']['AuthInfoWithToken']>;
