import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PrivateRoute } from '@/app/router/private-route';
import { checkLogin, getAuthorizationStatus } from '@/entities/user';
import { Error404Page } from '@/pages/error';
import { FavoritesPage } from '@/pages/favorites';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { OfferPage } from '@/pages/offer';
import { AppRoutes } from '@/shared/model/app-routes';
import { AuthorizationStatus } from '@/shared/model/enums';
import { Spinner } from '@/shared/ui/spinner';

import { useAppDispatch, useAppSelector } from '../store/model/hooks';

export const AppRouter = () => {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  return authorizationStatus === AuthorizationStatus.UNKNOWN ? (
    <Spinner />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<MainPage />} />
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route
          path={AppRoutes.FAVORITES}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoutes.OFFER}/:id`} element={<OfferPage />} />
        <Route path={AppRoutes.NOT_FOUND} element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};
