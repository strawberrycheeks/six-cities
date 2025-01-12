import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/model/hooks';
import {
  clearOffers,
  fetchFavoriteOffers,
  getOffers,
  getOffersFetchStatus,
} from '@/entities/offer-card';
import { FavoriteOffersList } from '@/features/favorite-offers-list';
import { Footer } from '@/features/footer';
import { Header } from '@/features/header';
import { FetchStatus } from '@/shared/model/enums';
import { Spinner } from '@/shared/ui/spinner';

export const FavoritesPage = () => {
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const offersFetchStatus = useAppSelector(getOffersFetchStatus);

  useEffect(() => {
    dispatch(fetchFavoriteOffers());

    return () => {
      dispatch(clearOffers());
    };
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {offersFetchStatus !== FetchStatus.SUCCESS || !offers ? (
              <Spinner />
            ) : (
              <FavoriteOffersList offers={offers} />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
