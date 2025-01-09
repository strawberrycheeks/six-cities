import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoutes } from '@/app/api/model/api-routes';
import { OfferPreview } from '@/entities/offer-card';
import { FetchStatus } from '@/shared/model/enums';

import { setOffers, setOffersLoadingStatus } from '../actions';
import { DispatchStateExtra } from '../types';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  DispatchStateExtra
>('offers/fetch', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(FetchStatus.LOADING));

  const { data } = await api.get<OfferPreview[]>(ApiRoutes.OFFERS);

  dispatch(setOffersLoadingStatus(FetchStatus.SUCCESS));
  dispatch(setOffers(data));
});
