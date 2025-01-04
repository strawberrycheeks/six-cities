import { City } from '@/entities/city';
import { OfferCardEntity } from '@/entities/offer-card';
import { store } from '.';

export type State = {
  city?: City;
  offers?: OfferCardEntity[];
};

export type AppDispatch = typeof store.dispatch;
