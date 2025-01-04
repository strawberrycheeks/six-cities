import classNames from 'classnames';
import { useEffect } from 'react';

import { setCity, setOffers } from '@/app/store/actions';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { cities } from '@/entities/city';
import { CitiesList } from '@/features/cities-list';
import { CityPlaces } from '@/features/city-places';
import { Header } from '@/features/header';
import { offers as mockOffers } from '@/mocks/offers';

export const MainPage = () => {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCity(cities.Paris));
    dispatch(setOffers(mockOffers));
  }, [dispatch]);

  if (!city || !offers) {
    return null;
  }

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
        <CityPlaces city={city} offers={offers} />
      </main>
    </div>
  );
};
