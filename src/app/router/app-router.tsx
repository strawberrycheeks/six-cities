import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PrivateRoute } from '@/app/router/private-route';
import { Error404Page } from '@/pages/error';
import { FavoritesPage } from '@/pages/favorites';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { OfferPage } from '@/pages/offer';
import { favorites as mockFavorites } from '@/mocks/favorites';
import { offers as mockOffers } from '@/mocks/offers';
import { AppRoutes } from './routes';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.HOME} element={<MainPage />} />
      <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
      <Route
        path={AppRoutes.FAVORITES}
        element={
          <PrivateRoute>
            <FavoritesPage
              offers={mockOffers.filter((offer) =>
                mockFavorites.includes(offer.id),
              )}
            />
          </PrivateRoute>
        }
      />
      <Route path={`${AppRoutes.OFFER}/:id`} element={<OfferPage />} />
      <Route path={AppRoutes.NOT_FOUND} element={<Error404Page />} />
    </Routes>
  </BrowserRouter>
);
