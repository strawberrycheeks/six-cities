import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { initAsyncActionsStore } from '@/app/lib/mocks';
import { makeOffers } from '@/entities/offer-card/lib/mocks';
import { AuthorizationStatus, NameSpace } from '@/shared/model/enums';

import { OffersNearbyList } from '.';

describe('<OffersNearbyList />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });
  });

  it('should render offers list and title inside of it', () => {
    const offers = makeOffers();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <OffersNearbyList offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    expect(container.querySelector('.places__list')).toBeInTheDocument();
    expect(
      screen.getByText('Other places in the neighbourhood'),
    ).toBeInTheDocument();
  });
});
