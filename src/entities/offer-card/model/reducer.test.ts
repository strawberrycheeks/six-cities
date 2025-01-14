import { FetchStatus } from '@/shared/model/constants';

import { makeOfferMaximum, makeOffers } from '../lib/mocks';
import {
  clearFavoriteOffers,
  clearOffer,
  clearOffers,
  offerCardSlice,
  setActiveOfferId,
  setFavoriteOffers,
  setFavoriteOffersLoadingStatus,
  setOffer,
  setOfferLoadingStatus,
  setOffers,
  setOffersLoadingStatus,
} from './reducer';

const commonInitialState = {
  favoriteOffersFetchStatus: FetchStatus.INITIAL,
  offersFetchStatus: FetchStatus.INITIAL,
  offerFetchStatus: FetchStatus.INITIAL,
};

describe('offer card slice', () => {
  it('should correct change offer', () => {
    const offer = makeOfferMaximum();

    const expectedState = {
      ...commonInitialState,
      offer,
    };

    const result = offerCardSlice.reducer(commonInitialState, setOffer(offer));

    expect(result).toEqual(expectedState);
  });

  it('should correct change offers', () => {
    const offers = makeOffers();

    const expectedState = {
      ...commonInitialState,
      offers,
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setOffers(offers),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct change favorite offers', () => {
    const favoriteOffers = makeOffers();

    const expectedState = {
      ...commonInitialState,
      favoriteOffers,
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setFavoriteOffers(favoriteOffers),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct change offer fetch status', () => {
    const expectedState = {
      ...commonInitialState,
      offerFetchStatus: FetchStatus.SUCCESS,
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setOfferLoadingStatus(FetchStatus.SUCCESS),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct change offers fetch status', () => {
    const expectedState = {
      ...commonInitialState,
      offersFetchStatus: FetchStatus.SUCCESS,
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setOffersLoadingStatus(FetchStatus.SUCCESS),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct change favorite offers fetch status', () => {
    const expectedState = {
      ...commonInitialState,
      favoriteOffersFetchStatus: FetchStatus.SUCCESS,
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setFavoriteOffersLoadingStatus(FetchStatus.SUCCESS),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct clear offer', () => {
    const initialState = {
      ...commonInitialState,
      offer: makeOfferMaximum(),
      offerFetchStatus: FetchStatus.SUCCESS,
    };

    const expectedState = {
      ...commonInitialState,
      offer: undefined,
      offerFetchStatus: FetchStatus.INITIAL,
    };

    const result = offerCardSlice.reducer(initialState, clearOffer());

    expect(result).toEqual(expectedState);
  });

  it('should correct clear offers', () => {
    const initialState = {
      ...commonInitialState,
      offers: makeOffers(),
      offersFetchStatus: FetchStatus.SUCCESS,
    };

    const expectedState = {
      ...commonInitialState,
      offers: undefined,
      offersFetchStatus: FetchStatus.INITIAL,
    };

    const result = offerCardSlice.reducer(initialState, clearOffers());

    expect(result).toEqual(expectedState);
  });

  it('should correct clear favorite offers', () => {
    const initialState = {
      ...commonInitialState,
      favoriteOffers: makeOffers(),
      favoriteOffersFetchStatus: FetchStatus.SUCCESS,
    };

    const expectedState = {
      ...commonInitialState,
      favoriteOffers: undefined,
      favoriteOffersFetchStatus: FetchStatus.INITIAL,
    };

    const result = offerCardSlice.reducer(initialState, clearFavoriteOffers());

    expect(result).toEqual(expectedState);
  });

  it('should correct set active offer id', () => {
    const expectedState = {
      ...commonInitialState,
      activeOfferId: '1',
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setActiveOfferId('1'),
    );

    expect(result).toEqual(expectedState);
  });
});
