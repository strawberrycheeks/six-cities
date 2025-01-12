import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { ApiRoutes } from '@/app/api/model/api-routes';
import { DispatchStateExtra, State } from '@/app/store/model/types';
import { FetchStatus, NameSpace } from '@/shared/model/enums';

import {
  setOffer,
  setOfferLoadingStatus,
  setOffers,
  setOffersLoadingStatus,
} from '../model/reducer';
import { OfferMaximum, OfferPreview } from '../model/types';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  DispatchStateExtra
>(`${NameSpace.OFFER}/fetch`, async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(FetchStatus.LOADING));

  const { data } = await api.get<OfferPreview[]>(ApiRoutes.OFFERS);

  dispatch(setOffersLoadingStatus(FetchStatus.SUCCESS));
  dispatch(setOffers(data));
});

export const fetchOffer = createAsyncThunk<void, string, DispatchStateExtra>(
  `${NameSpace.OFFER}/fetch`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(FetchStatus.LOADING));

    const { status, data } = await api.get<OfferMaximum>(
      `${ApiRoutes.OFFERS}/${id}`,
    );

    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setOfferLoadingStatus(FetchStatus.FAILURE));
      return;
    }

    dispatch(setOfferLoadingStatus(FetchStatus.SUCCESS));
    dispatch(setOffer(data));
  },
);

export const fetchOffersNearby = createAsyncThunk<
  void,
  string,
  DispatchStateExtra
>(
  `${NameSpace.OFFER}/fetchNearbyOffers`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(FetchStatus.LOADING));

    const { data } = await api.get<OfferPreview[]>(
      `${ApiRoutes.OFFERS}/${id}/nearby`,
    );

    dispatch(setOffersLoadingStatus(FetchStatus.SUCCESS));
    dispatch(setOffers(data));
  },
);

export const fetchFavoriteOffers = createAsyncThunk<
  void,
  undefined,
  DispatchStateExtra
>(
  `${NameSpace.OFFER}/fetchFavoriteOffers`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(FetchStatus.LOADING));

    const { data } = await api.get<OfferPreview[]>(ApiRoutes.FAVORITE);

    dispatch(setOffersLoadingStatus(FetchStatus.SUCCESS));
    dispatch(setOffers(data));
  },
);

export const setIsOfferFavorite = createAsyncThunk<
  void,
  { offerId: string; isFavorite: boolean; context: 'offer' | 'offers' },
  DispatchStateExtra
>(
  `${NameSpace.OFFER}/setIsOfferFavorite`,
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
      if (!state[NameSpace.OFFER].offers) return;

      const newOffersState = state[NameSpace.OFFER].offers.map((offer) =>
        offer.id === offerId ? data : offer,
      );

      dispatch(setOffers(newOffersState));
    }
  },
);
