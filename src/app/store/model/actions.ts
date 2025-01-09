import { createAction } from '@reduxjs/toolkit';

import { City } from '@/entities/city';
import { OfferMaximum, OfferPreview } from '@/entities/offer-card';
import { CommentGet } from '@/entities/review';
import { AuthInfo } from '@/entities/user';
import { AuthorizationStatus, FetchStatus } from '@/shared/model/enums';

export const setCity = createAction<City>('city/set');

export const setUser = createAction<AuthInfo | undefined>('user/set');
export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus',
);

export const setOffers = createAction<OfferPreview[]>('offers/set');
export const clearOffers = createAction('offers/clear');
export const setOffersLoadingStatus = createAction<FetchStatus>(
  'offers/setLoadingStatus',
);

export const setOffer = createAction<OfferMaximum>('offer/set');
export const clearOffer = createAction('offer/clear');
export const setOfferLoadingStatus = createAction<FetchStatus>(
  'offer/setLoadingStatus',
);

export const setReviews = createAction<CommentGet[]>('reviews/set');
export const clearReviews = createAction('reviews/clear');
export const setReviewsLoadingStatus = createAction<FetchStatus>(
  'reviews/setLoadingStatus',
);

export const setActiveOfferId = createAction<string | undefined>(
  'ui/setActiveOfferId',
);
