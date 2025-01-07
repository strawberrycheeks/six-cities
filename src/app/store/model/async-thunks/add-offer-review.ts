import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { ApiRoutes } from '@/app/api/model/api-routes';
import { CommentPost } from '@/entities/review';

import { DispatchStateExtra, State } from '../types';
import { fetchOfferReviews } from './fetch-offer-reviews';

export const addOfferReview = createAsyncThunk<
  void,
  CommentPost & { offerId: string },
  DispatchStateExtra
>(
  'offer/fetchReview',
  async ({ offerId, comment, rating }, { dispatch, getState, extra: api }) => {
    const { status } = await api.post<CommentPost[]>(
      `${ApiRoutes.REVIEWS}/${offerId}`,
      {
        comment,
        rating,
      },
    );

    const state = getState() as State;

    if (status === Number(StatusCodes.CREATED) && state.offer?.id === offerId) {
      dispatch(fetchOfferReviews(offerId));
    }
  },
);
