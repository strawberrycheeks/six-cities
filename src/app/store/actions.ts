import { createAction } from '@reduxjs/toolkit';

import { City } from '@/entities/city';
import { OfferCardEntity } from '@/entities/offer-card';

export const setCity = createAction<City>('city/set');

export const setOffers = createAction<OfferCardEntity[]>('offers/set');
