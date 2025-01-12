import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { initAsyncActionsStore } from '@/app/lib/mocks';
import { makeUser } from '@/entities/user/lib/mocks';
import { AuthorizationStatus, NameSpace } from '@/shared/model/enums';

import { Header } from '.';

describe('<Header />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  it('should render with contexts correctly', () => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
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
