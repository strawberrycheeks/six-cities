import { Provider } from 'react-redux';

import { UserContextProvider } from '@/entities/user';
import { AppRouter } from './router/app-router';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </Provider>
  );
};
