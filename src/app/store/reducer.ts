import { createReducer } from '@reduxjs/toolkit';

import { cities } from '@/entities/city';
import { setCity, setOffers, setOffersLoadingStatus } from './actions';
import { State } from './types';

const initialState: State = {
  city: cities.Paris,
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
    }),
);

export { reducer };
