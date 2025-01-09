import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoutes } from '@/app/api/model/api-routes';
import { CommentGet } from '@/entities/review';
import { FetchStatus } from '@/shared/model/enums';

import { setReviews, setReviewsLoadingStatus } from '../actions';
import { DispatchStateExtra } from '../types';

export const fetchOfferReviews = createAsyncThunk<
  void,
  string,
  DispatchStateExtra
>('offer/fetchReview', async (id, { dispatch, extra: api }) => {
  dispatch(setReviewsLoadingStatus(FetchStatus.LOADING));

  const { data } = await api.get<CommentGet[]>(`${ApiRoutes.REVIEWS}/${id}`);

  dispatch(setReviewsLoadingStatus(FetchStatus.SUCCESS));
  dispatch(setReviews(data));
});
