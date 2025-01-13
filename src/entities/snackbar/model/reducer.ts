import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '@/shared/model/enums';

import { MAX_ITEMS } from './consts';
import { SnackbarItem } from './types';

type SnackbarState = {
  items: SnackbarItem[];
};

const initialState: SnackbarState = {
  items: [],
};

export const snackbarSlice = createSlice({
  name: NameSpace.SNACKBAR,
  initialState,
  reducers: {
    addSnackbarItem: (state, action: PayloadAction<SnackbarItem>) => {
      state.items.push(action.payload);

      if (state.items.length > MAX_ITEMS) {
        state.items.shift();
      }
    },
    removeSnackbarItem: (state, action: PayloadAction<SnackbarItem['id']>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index === -1) return;
      state.items.splice(index, 1);
    },
  },
});

export const { addSnackbarItem, removeSnackbarItem } = snackbarSlice.actions;
