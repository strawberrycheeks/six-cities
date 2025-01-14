import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '@/shared/model/constants';

import { CommentGet } from '..';

type ReviewState = {
  reviews?: CommentGet[];
  reviewsFetchStatus: FetchStatus;
};

const initialState: ReviewState = {
  reviewsFetchStatus: FetchStatus.INITIAL,
};

export const reviewSlice = createSlice({
  name: NameSpace.REVIEW,
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<CommentGet[]>) => {
      state.reviews = action.payload;
    },
    clearReviews: (state) => {
      state.reviews = undefined;
      state.reviewsFetchStatus = FetchStatus.INITIAL;
    },
    setReviewsFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.reviewsFetchStatus = action.payload;
    },
  },
});

export const { setReviews, clearReviews, setReviewsFetchStatus } =
  reviewSlice.actions;
