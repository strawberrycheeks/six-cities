import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '@/shared/model/enums';

import { cities } from './consts';
import { City } from './types';

export type CityState = {
  city: City;
};

const initialState: CityState = {
  city: cities.Paris,
};

export const citySlice = createSlice({
  name: NameSpace.CITY,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;
