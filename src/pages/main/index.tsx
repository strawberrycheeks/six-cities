import classNames from 'classnames';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/store/model/hooks';
import { cities, CityName, CityNames, getCity, setCity } from '@/entities/city';
import {
  clearOffers,
  fetchOffers,
  getOffers,
  getOffersFetchStatus,
} from '@/entities/offer-card';
import { CitiesList } from '@/features/cities-list';
import { CityPlaces } from '@/features/city-places';
import { Header } from '@/features/header';
import { FetchStatus } from '@/shared/model/enums';
import { Spinner } from '@/shared/ui/spinner';

export const MainPage = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const city = useAppSelector(getCity);

  const offers = useAppSelector(getOffers);
  const offersFetchStatus = useAppSelector(getOffersFetchStatus);

  useEffect(() => {
    const cityToSet = location.hash.slice(1) as CityName;

    if (!CityNames.includes(cityToSet)) return;

    dispatch(setCity(cities[cityToSet]));
  }, [dispatch, location.hash]);

  useEffect(() => {
    dispatch(fetchOffers());

    return () => {
      dispatch(clearOffers());
    };
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
        {offersFetchStatus === FetchStatus.LOADING ? (
          <Spinner />
        ) : (
          <CityPlaces offers={offersByCity} city={city} />
        )}
      </main>
    </div>
  );
};
