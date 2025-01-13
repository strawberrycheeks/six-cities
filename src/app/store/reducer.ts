import { combineReducers } from '@reduxjs/toolkit';

import { citySlice } from '@/entities/city';
import { offerCardSlice } from '@/entities/offer-card';
import { reviewSlice } from '@/entities/review';
import { snackbarSlice } from '@/entities/snackbar';
import { userSlice } from '@/entities/user';
import { NameSpace } from '@/shared/model/enums';

export const reducer = combineReducers({
  [NameSpace.OFFER]: offerCardSlice.reducer,
  [NameSpace.USER]: userSlice.reducer,
  [NameSpace.CITY]: citySlice.reducer,
  [NameSpace.REVIEW]: reviewSlice.reducer,
  [NameSpace.SNACKBAR]: snackbarSlice.reducer,
});
