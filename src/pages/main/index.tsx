import classNames from 'classnames';
import { useEffect, useMemo } from 'react';

import { fetchOffers } from '@/app/store/api-actions';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { CitiesList } from '@/features/cities-list';
import { CityPlaces } from '@/features/city-places';
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
    () => (offers ?? []).filter((offer) => offer.city.name === city?.name),
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
          <CityPlaces offers={offersByCity} city={city} />
        )}
      </main>
    </div>
  );
};
