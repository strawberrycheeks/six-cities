import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { City, CityName } from '@/entities/City';
import { OfferCardEntity } from '@/entities/OfferCard';
import { UserContextProvider } from '@/entities/User';
import { LoggedRoute } from '@/features/LoggedRoute';
import { Error404Page } from '@/pages/Error';
import { FavoritesPage } from '@/pages/Favorites';
import { LoginPage } from '@/pages/Login';
import { MainPage } from '@/pages/Main';
import { OfferPage } from '@/pages/Offer';
import { AppRoutes } from '../routes';

type AppProps = {
  cities: Record<CityName, City>;
  favorites: OfferCardEntity['id'][];
  offers: OfferCardEntity[];
};

export const App = (props: AppProps) => {
  const { cities, favorites, offers } = props;

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoutes.HOME}
            element={<MainPage offers={offers} cities={cities} />}
          />
          <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
          <Route
            path={AppRoutes.FAVORITES}
            element={
              <LoggedRoute>
                <FavoritesPage
                  offers={offers.filter((offer) =>
                    favorites.includes(offer.id),
                  )}
                />
              </LoggedRoute>
            }
          />
          <Route path={`${AppRoutes.OFFER}/:id`} element={<OfferPage />} />
          <Route path={AppRoutes.NOT_FOUND} element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};
