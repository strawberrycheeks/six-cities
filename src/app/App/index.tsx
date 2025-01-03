import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { OfferCardEntity } from '@/entities/OfferCard';
import { UserContextProvider } from '@/entities/User';
import { LoggedRoute } from '@/features/LoggedRoute';
import { Error404Page } from '@/pages/Error';
import { FavoritesPage } from '@/pages/Favorites';
import { LoginPage } from '@/pages/Login';
import { MainPage } from '@/pages/Main';
import { OfferPage } from '@/pages/Offer';

type AppProps = {
  favorites: OfferCardEntity['id'][];
  offers: OfferCardEntity[];
};

export const App = ({ favorites, offers }: AppProps) => (
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <LoggedRoute>
              <FavoritesPage
                offers={offers.filter((offer) => favorites.includes(offer.id))}
              />
            </LoggedRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
);
