import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '@/shared/model/constants';

import { OfferMaximum, OfferPreview } from '../types';

type OfferState = {
  offer?: OfferMaximum;
  offerFetchStatus: FetchStatus;

  offers?: OfferPreview[];
  offersFetchStatus: FetchStatus;

  favoriteOffers?: OfferPreview[];
  favoriteOffersFetchStatus: FetchStatus;

  activeOfferId?: OfferPreview['id'];
};

const initialState: OfferState = {
  offerFetchStatus: FetchStatus.INITIAL,
  offersFetchStatus: FetchStatus.INITIAL,
  favoriteOffersFetchStatus: FetchStatus.INITIAL,
};

export const offerCardSlice = createSlice({
  name: NameSpace.OFFER,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<OfferPreview[]>) => {
      state.offers = action.payload;
    },
    clearOffers: (state) => {
      state.offers = undefined;
      state.offersFetchStatus = FetchStatus.INITIAL;
    },
    setOffersLoadingStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.offersFetchStatus = action.payload;
    },
    setFavoriteOffers: (state, action: PayloadAction<OfferPreview[]>) => {
      state.favoriteOffers = action.payload;
    },
    clearFavoriteOffers: (state) => {
      state.favoriteOffers = undefined;
      state.favoriteOffersFetchStatus = FetchStatus.INITIAL;
    },
    setFavoriteOffersLoadingStatus: (
      state,
      action: PayloadAction<FetchStatus>,
    ) => {
      state.favoriteOffersFetchStatus = action.payload;
    },
    setOffer: (state, action: PayloadAction<OfferMaximum>) => {
      state.offer = action.payload;
    },
    clearOffer: (state) => {
      state.offer = undefined;
      state.offerFetchStatus = FetchStatus.INITIAL;
    },
    setOfferLoadingStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.offerFetchStatus = action.payload;
    },
    setActiveOfferId: (
      state,
      action: PayloadAction<OfferPreview['id'] | undefined>,
    ) => {
      state.activeOfferId = action.payload;
    },
  },
});

export const {
  setOffer,
  clearOffer,
  setOfferLoadingStatus,
  setOffers,
  clearOffers,
  setOffersLoadingStatus,
  setFavoriteOffers,
  clearFavoriteOffers,
  setFavoriteOffersLoadingStatus,
  setActiveOfferId,
} = offerCardSlice.actions;
