import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoutes } from '@/app/api/model/api-routes';
import { OfferPreview } from '@/entities/offer-card';

import { setOffers, setOffersLoadingStatus } from '../actions';
import { FetchStatus } from '../enums';
import { DispatchStateExtra } from '../types';

export const fetchOffersNearby = createAsyncThunk<
  void,
  string,
  DispatchStateExtra
>('offer/fetchNearbyOffers', async (id, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(FetchStatus.LOADING));

  const { data } = await api.get<OfferPreview[]>(
    `${ApiRoutes.OFFERS}/${id}/nearby`,
  );

  dispatch(setOffersLoadingStatus(FetchStatus.SUCCESS));
  dispatch(setOffers(data));
});
