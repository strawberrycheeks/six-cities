import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { ApiRoute } from '@/app/api/routes';
import { DispatchStateExtra, State } from '@/app/store/types';
import { FetchStatus, NameSpace } from '@/shared/model/constants';

import {
  setFavoriteOffers,
  setFavoriteOffersLoadingStatus,
  setOffer,
  setOfferLoadingStatus,
  setOffers,
  setOffersLoadingStatus,
} from '../model/reducer';
import { OfferMaximum, OfferPreview } from '../types';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  DispatchStateExtra
>(`${NameSpace.OFFER}/fetch`, async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(FetchStatus.LOADING));

  const { data } = await api.get<OfferPreview[]>(ApiRoute.OFFERS);

  dispatch(setOffersLoadingStatus(FetchStatus.SUCCESS));
  dispatch(setOffers(data));
});

export const fetchOffer = createAsyncThunk<void, string, DispatchStateExtra>(
  `${NameSpace.OFFER}/fetch`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(FetchStatus.LOADING));

    const { status, data } = await api.get<OfferMaximum>(
      `${ApiRoute.OFFERS}/${id}`,
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
      `${ApiRoute.OFFERS}/${id}/nearby`,
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
    dispatch(setFavoriteOffersLoadingStatus(FetchStatus.LOADING));

    const { data } = await api.get<OfferPreview[]>(ApiRoute.FAVORITE);

    dispatch(setFavoriteOffersLoadingStatus(FetchStatus.SUCCESS));
    dispatch(setFavoriteOffers(data));
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
      `${ApiRoute.FAVORITE}/${offerId}/${Number(isFavorite)}`,
    );

    if (isFavorite) {
      const state = getState() as State;
      if (!state[NameSpace.OFFER].offers) return;

      const newFavoriteOffer = state[NameSpace.OFFER].offers.filter(
        (offer) => offer.id === offerId,
      );

      const newFavoriteOffersState = [
        ...(state[NameSpace.OFFER].favoriteOffers ?? []),
        ...newFavoriteOffer,
      ];

      dispatch(setFavoriteOffers(newFavoriteOffersState));
    } else {
      const state = getState() as State;
      if (!state[NameSpace.OFFER].favoriteOffers) return;

      const newFavoriteOffersState = state[
        NameSpace.OFFER
      ].favoriteOffers.filter((offer) => offer.id !== offerId);

      dispatch(setFavoriteOffers(newFavoriteOffersState));
    }

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
