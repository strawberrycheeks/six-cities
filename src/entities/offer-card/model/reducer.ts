import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '@/shared/model/constants';

import { OfferMaximum, OfferPreview } from '../types';

type OfferState = {
  offers?: OfferPreview[];
  offersFetchStatus: FetchStatus;

  offer?: OfferMaximum;
  offerFetchStatus: FetchStatus;

  activeOfferId?: OfferPreview['id'];
};

const initialState: OfferState = {
  offersFetchStatus: FetchStatus.INITIAL,
  offerFetchStatus: FetchStatus.INITIAL,
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
  setOffers,
  clearOffers,
  setOffersLoadingStatus,
  setOffer,
  clearOffer,
  setOfferLoadingStatus,
  setActiveOfferId,
} = offerCardSlice.actions;
