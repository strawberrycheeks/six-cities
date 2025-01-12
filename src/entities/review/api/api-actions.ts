import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { ApiRoutes } from '@/app/api/model/api-routes';
import { DispatchStateExtra, State } from '@/app/store/model/types';
import { FetchStatus, NameSpace } from '@/shared/model/enums';

import { setReviews, setReviewsFetchStatus } from '../model/reducer';
import { CommentGet, CommentPost } from '../model/types';

export const fetchOfferReviews = createAsyncThunk<
  void,
  string,
  DispatchStateExtra
>(
  `${NameSpace.REVIEW}/fetchOfferReview`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setReviewsFetchStatus(FetchStatus.LOADING));

    const { data } = await api.get<CommentGet[]>(`${ApiRoutes.REVIEWS}/${id}`);

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
  // TODO: уведомить пользователя, если не удалось
  async ({ offerId, comment, rating }, { dispatch, getState, extra: api }) => {
    const { status } = await api.post<CommentPost[]>(
      `${ApiRoutes.REVIEWS}/${offerId}`,
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
