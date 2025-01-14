import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '@/shared/model/constants';

import { CITY_LIST } from '../constants';
import { City } from '../types';

type CityState = {
  city: City;
};

const initialState: CityState = {
  city: CITY_LIST.Paris,
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
