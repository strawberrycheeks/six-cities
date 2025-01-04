import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ApiRoutes } from '@/app/api/model/api-routes';
import { OfferCardEntity } from '@/entities/offer-card';

import { setOffers, setOffersLoadingStatus } from '../actions';
import { AppDispatch, State } from '../types';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetch', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));

  const { data } = await api.get<OfferCardEntity[]>(ApiRoutes.OFFERS);

  dispatch(setOffersLoadingStatus(false));
  dispatch(setOffers(data));
});
