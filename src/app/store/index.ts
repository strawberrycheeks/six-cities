import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../api/lib/create-api';
import { reducer } from './model/reducer';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});
