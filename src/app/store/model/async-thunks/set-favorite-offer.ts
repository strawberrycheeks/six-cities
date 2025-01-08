import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoutes } from '@/app/api/model/api-routes';
import { OfferMaximum } from '@/entities/offer-card';

import { setOffer, setOffers } from '../actions';
import { DispatchStateExtra, State } from '../types';

export const setIsOfferFavorite = createAsyncThunk<
  void,
  { offerId: string; isFavorite: boolean; context: 'offer' | 'offers' },
  DispatchStateExtra
>(
  'offer/setIsOfferFavorite',
  async (
    { offerId, isFavorite, context },
    { dispatch, extra: api, getState },
  ) => {
    const { data } = await api.post<OfferMaximum>(
      `${ApiRoutes.FAVORITE}/${offerId}/${Number(isFavorite)}`,
    );

    if (context === 'offer') {
      dispatch(setOffer(data));
    } else {
      const state = getState() as State;
      if (!state.offers) return;

      const newOffersState = state.offers.map((offer) =>
        offer.id === offerId ? data : offer,
      );

      dispatch(setOffers(newOffersState));
    }
  },
);
