import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { CITY_LIST } from '@/entities/city';
import { makeOfferMaximum, makeOffers } from '@/entities/offer-card/lib/mocks';
import { makeReviews } from '@/entities/review/lib/mocks';
import { makeUser } from '@/entities/user/lib/mocks';
import {
  AuthorizationStatus,
  FetchStatus,
  NameSpace,
} from '@/shared/model/constants';
import { AppRoute } from '@/shared/model/constants';

import { App } from './app';
import { HistoryRouter } from './history-router';
import { initAsyncActionsStore } from './lib/mocks';

describe('<App />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  let mockHistory: MemoryHistory;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: makeUser(),
      },
      [NameSpace.CITY]: {
        city: CITY_LIST.Paris,
      },
      [NameSpace.OFFER]: {
        offers: makeOffers(),
        offersFetchStatus: FetchStatus.SUCCESS,
        favoriteOffers: makeOffers(),
        favoriteOffersFetchStatus: FetchStatus.SUCCESS,
        offer: makeOfferMaximum(),
        offerFetchStatus: FetchStatus.SUCCESS,
      },
      [NameSpace.REVIEW]: {
        reviews: makeReviews(),
        reviewsFetchStatus: FetchStatus.SUCCESS,
      },
      [NameSpace.SNACKBAR]: {
        items: [],
      },
    });

    mockHistory = createMemoryHistory();
  });

  it('should render MainPage correctly', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoute.HOME);

    const { container } = render(component);

    expect(container.querySelector('.header')).toBeInTheDocument();
    expect(container.querySelector('.locations__list')).toBeInTheDocument();
    expect(container.querySelector('.cities')).toBeInTheDocument();
  });

  it('should render LoginPage correctly', () => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      [NameSpace.OFFER]: {
        favoriteOffers: [],
        favoriteOffersFetchStatus: FetchStatus.SUCCESS,
      },
      [NameSpace.SNACKBAR]: {
        items: [],
      },
    });

    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoute.LOGIN);

    const { container } = render(component);

    expect(container.querySelector('form.login__form')).toBeInTheDocument();
    expect(container.querySelectorAll('input').length).toBe(2);
  });

  it('should render LoginPage instead of FavoritesPage due to user is not authenticated', () => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      [NameSpace.OFFER]: {
        favoriteOffers: [],
        favoriteOffersFetchStatus: FetchStatus.SUCCESS,
      },
      [NameSpace.SNACKBAR]: {
        items: [],
      },
    });

    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoute.FAVORITES);

    const { container } = render(component);

    expect(container.querySelector('form.login__form')).toBeInTheDocument();
    expect(container.querySelectorAll('input').length).toBe(2);
  });

  it('should render FavoritesPage correctly', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoute.FAVORITES);

    const { container } = render(component);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(container.querySelector('.favorites__list')).toBeInTheDocument();
  });

  it('should render OfferPage correctly', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(`${AppRoute.OFFER}/1`);

    const { container } = render(component);

    expect(container.querySelector('.page__main--offer')).toBeInTheDocument();
  });

  it('should render Error404Page if offer was not provided', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoute.OFFER);

    render(component);

    expect(screen.getByText('404 — Page not found')).toBeInTheDocument();
  });

  it('should render Error404Page route does not exist', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push('/123');

    render(component);

    expect(screen.getByText('404 — Page not found')).toBeInTheDocument();
  });
});
