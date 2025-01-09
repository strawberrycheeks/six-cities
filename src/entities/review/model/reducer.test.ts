import { FetchStatus } from '@/shared/model/enums';

import { makeReviews } from '../lib/mocks';
import { reviewSlice, setReviews, setReviewsFetchStatus } from './reducer';

describe('review slice', () => {
  it('should correct change review fetch status', () => {
    const initialState = {
      reviewsFetchStatus: FetchStatus.INITIAL,
    };

    const expectedState = { reviewsFetchStatus: FetchStatus.SUCCESS };

    const result = reviewSlice.reducer(
      initialState,
      setReviewsFetchStatus(FetchStatus.SUCCESS),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct set reviews', () => {
    const initialState = {
      reviewsFetchStatus: FetchStatus.INITIAL,
    };

    const reviews = makeReviews();

    const expectedState = { ...initialState, reviews };

    const result = reviewSlice.reducer(initialState, setReviews(reviews));

    expect(result).toEqual(expectedState);
  });
});
