import { State } from '@/app/store/types';
import { NameSpace } from '@/shared/model/constants';

export const getLatest10Reviews = (state: State) =>
  state[NameSpace.REVIEW].reviews
    ?.toSorted(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    ?.slice(0, 10);

export const getReviewsFetchStatus = (state: State) =>
  state[NameSpace.REVIEW].reviewsFetchStatus;
