import { Action } from '@reduxjs/toolkit';

import { ApiRoute } from '@/app/api/routes';
import { initAsyncActionsStore } from '@/app/lib/mocks';
import { FetchStatus, NameSpace } from '@/shared/model/constants';

import {
  setFavoriteOffers,
  setFavoriteOffersLoadingStatus,
  setOffer,
  setOfferLoadingStatus,
  setOffers,
  setOffersLoadingStatus,
} from '../model/reducer';
import {
  fetchFavoriteOffers,
  fetchOffer,
  fetchOffers,
  fetchOffersNearby,
  setIsOfferFavorite,
} from './api-actions';

const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('async review actions', () => {
  const { mockAxiosAdapter, mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.OFFER]: {
        offerFetchStatus: FetchStatus.INITIAL,
        offersFetchStatus: FetchStatus.INITIAL,
      },
    });
  });

  it('should dispatch "fetchOffers.pending", "setOffersLoadingStatus"x2, "setOffers" and "fetchOffers.fulfilled" with thunk "fetchOffers" on 200', async () => {
    mockAxiosAdapter.onGet(ApiRoute.OFFERS).reply(200);

    await store.dispatch(fetchOffers());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOffers.pending.type,
      setOffersLoadingStatus.type,
      setOffersLoadingStatus.type,
      setOffers.type,
      fetchOffers.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchOffer.pending", "setOfferLoadingStatus"x2, "setOffer" and "fetchOffer.fulfilled" with thunk "fetchOffer" on 200', async () => {
    mockAxiosAdapter.onGet(`${ApiRoute.OFFERS}/1`).reply(200);

    await store.dispatch(fetchOffer('1'));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOffer.pending.type,
      setOfferLoadingStatus.type,
      setOfferLoadingStatus.type,
      setOffer.type,
      fetchOffer.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchOffersNearby.pending", "setOffersLoadingStatus"x2, "setOffers" and "fetchOffersNearby.fulfilled" with thunk "fetchOffersNearby" on 200', async () => {
    mockAxiosAdapter.onGet(`${ApiRoute.OFFERS}/1/nearby`).reply(200);

    await store.dispatch(fetchOffersNearby('1'));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOffersNearby.pending.type,
      setOffersLoadingStatus.type,
      setOffersLoadingStatus.type,
      setOffers.type,
      fetchOffersNearby.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchFavoriteOffers.pending", "setFavoriteOffersLoadingStatus"x2, "setFavoriteOffers" and "fetchFavoriteOffers.fulfilled" with thunk "fetchFavoriteOffers" on 200', async () => {
    mockAxiosAdapter.onGet(ApiRoute.FAVORITE).reply(200);

    await store.dispatch(fetchFavoriteOffers());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchFavoriteOffers.pending.type,
      setFavoriteOffersLoadingStatus.type,
      setFavoriteOffersLoadingStatus.type,
      setFavoriteOffers.type,
      fetchFavoriteOffers.fulfilled.type,
    ]);
  });

  it('should dispatch "setIsOfferFavorite.pending" and "setIsOfferFavorite.fulfilled" with thunk "setIsOfferFavorite" on 200', async () => {
    mockAxiosAdapter.onPost(`${ApiRoute.FAVORITE}/1/0`).reply(200);

    await store.dispatch(
      setIsOfferFavorite({ offerId: '1', isFavorite: false, context: 'offer' }),
    );
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      setIsOfferFavorite.pending.type,
      setIsOfferFavorite.fulfilled.type,
    ]);
  });
});
