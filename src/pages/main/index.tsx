import classNames from 'classnames';
import { useEffect, useMemo } from 'react';

import { fetchOffers } from '@/app/store/model/async-thunks';
import { useAppDispatch, useAppSelector } from '@/app/store/model/hooks';
import { CitiesList } from '@/features/cities-list';
import { CityPlacesList } from '@/features/city-places-list';
import { Header } from '@/features/header';
import { Spinner } from '@/shared/ui/spinner';

export const MainPage = () => {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const isLoading = useAppSelector((state) => state.isOffersLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const offersByCity = useMemo(
    () => (offers ?? []).filter((offer) => offer.city.name === city.name),
    [city, offers],
  );

  return (
    <div className={classNames('page', 'page--gray', 'page--main')}>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <CityPlacesList offers={offersByCity} city={city} />
        )}
      </main>
    </div>
  );
};
