import { createReducer } from '@reduxjs/toolkit';

import { cities } from '@/entities/city';

import {
  clearOffer,
  clearOffers,
  clearReviews,
  setActiveOfferId,
  setAuthorizationStatus,
  setCity,
  setOffer,
  setOfferLoadingStatus,
  setOffers,
  setOffersLoadingStatus,
  setReviews,
  setReviewsLoadingStatus,
  setUser,
} from './actions';
import { AuthorizationStatus, FetchStatus } from './enums';
import { State } from './types';

const initialState: State = {
  city: cities.Paris,

  offersFetchStatus: FetchStatus.INITIAL,
  offerFetchStatus: FetchStatus.INITIAL,
  reviewsFetchStatus: FetchStatus.INITIAL,

  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.offersFetchStatus = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.offerFetchStatus = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setReviewsLoadingStatus, (state, action) => {
      state.reviewsFetchStatus = action.payload;
    })
    .addCase(clearOffers, (state) => {
      state.offers = undefined;
      state.offersFetchStatus = FetchStatus.INITIAL;
    })
    .addCase(clearOffer, (state) => {
      state.offer = undefined;
      state.offerFetchStatus = FetchStatus.INITIAL;
    })
    .addCase(clearReviews, (state) => {
      state.reviews = undefined;
      state.reviewsFetchStatus = FetchStatus.INITIAL;
    })
    .addCase(setActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    }),
);

export { reducer };
