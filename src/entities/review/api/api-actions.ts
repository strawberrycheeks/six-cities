import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { ApiRoute } from '@/app/api/routes';
import { DispatchStateExtra, State } from '@/app/store/types';
import { FetchStatus, NameSpace } from '@/shared/model/constants';

import { setReviews, setReviewsFetchStatus } from '../model/reducer';
import { CommentGet, CommentPost } from '../types';

export const fetchOfferReviews = createAsyncThunk<
  void,
  string,
  DispatchStateExtra
>(
  `${NameSpace.REVIEW}/fetchOfferReview`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setReviewsFetchStatus(FetchStatus.LOADING));

    const { data } = await api.get<CommentGet[]>(`${ApiRoute.REVIEWS}/${id}`);

    dispatch(setReviewsFetchStatus(FetchStatus.SUCCESS));
    dispatch(setReviews(data));
  },
);

export const addOfferReview = createAsyncThunk<
  void,
  CommentPost & { offerId: string },
  DispatchStateExtra
>(
  `${NameSpace.REVIEW}/addOfferReview`,
  async ({ offerId, comment, rating }, { dispatch, getState, extra: api }) => {
    const { status } = await api.post<CommentPost[]>(
      `${ApiRoute.REVIEWS}/${offerId}`,
      {
        comment,
        rating,
      },
    );

    const state = getState() as State;

    if (
      status === Number(StatusCodes.CREATED) &&
      state[NameSpace.OFFER].offer?.id === offerId
    ) {
      dispatch(fetchOfferReviews(offerId));
    }
  },
);
