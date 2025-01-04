import { Provider } from 'react-redux';

import { AppRouter } from './router';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
