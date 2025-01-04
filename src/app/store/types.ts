import { City } from '@/entities/city';
import { OfferCardEntity } from '@/entities/offer-card';
import { store } from '.';

export type State = {
  city: City;
  offers?: OfferCardEntity[];
  isOffersLoading?: boolean;
};

export type AppDispatch = typeof store.dispatch;
