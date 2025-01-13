import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SnackbarContainer } from '@/entities/snackbar';
import { checkLogin, getAuthorizationStatus } from '@/entities/user';
import { Error404Page } from '@/pages/error';
import { FavoritesPage } from '@/pages/favorites';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { OfferPage } from '@/pages/offer';
import { AppRoute } from '@/shared/model/constants';
import { AuthorizationStatus } from '@/shared/model/constants';
import { Spinner } from '@/shared/ui/spinner';

import { PrivateRoute } from './private-route';
import { useAppDispatch, useAppSelector } from './store/hooks';

export const App = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  return authorizationStatus === AuthorizationStatus.UNKNOWN ? (
    <Spinner />
  ) : (
    <>
      <Routes>
        <Route path={AppRoute.HOME} element={<MainPage />} />
        <Route path={AppRoute.LOGIN} element={<LoginPage />} />
        <Route
          path={AppRoute.FAVORITES}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.OFFER}/:id`} element={<OfferPage />} />
        <Route path={AppRoute.NOT_FOUND} element={<Error404Page />} />
      </Routes>
      <SnackbarContainer />
    </>
  );
};
