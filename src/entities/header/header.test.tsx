import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { initAsyncActionsStore } from '@/app/lib/mocks';
import {
  AuthorizationStatus,
  FetchStatus,
  NameSpace,
} from '@/shared/model/constants';

import { makeUser } from '../user/lib/mocks';
import { Header } from './header';

describe('<Header />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  it('should render with contexts correctly', () => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      [NameSpace.OFFER]: {
        favoriteOffers: [],
        favoriteOffersFetchStatus: FetchStatus.SUCCESS,
      },
    });

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    expect(container).toBeInTheDocument();
  });

  it('should render authenticated user correctly', () => {
    const user = makeUser();

    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user,
      },
      [NameSpace.OFFER]: {
        favoriteOffers: [],
        favoriteOffersFetchStatus: FetchStatus.SUCCESS,
      },
    });

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    render(component);

    expect(screen.getByText(user.email)).toBeInTheDocument();
  });
});
