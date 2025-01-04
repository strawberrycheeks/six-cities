import { createReducer } from '@reduxjs/toolkit';

import { cities } from '@/entities/city';

import {
  setAuthorizationStatus,
  setCity,
  setOffers,
  setOffersLoadingStatus,
  setUser,
} from './actions';
import { AuthorizationStatus } from './auth-status';
import { State } from './types';

const initialState: State = {
  city: cities.Paris,
  isOffersLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
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
      state.isOffersLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    }),
);

export { reducer };
