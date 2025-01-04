import classNames from 'classnames';
import { useEffect } from 'react';

import { setCity, setOffers } from '@/app/store/actions';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { cities } from '@/entities/city';
import { CitiesList } from '@/features/cities-list';
import { Header } from '@/features/header';
import { Map } from '@/features/map';
import { OffersList } from '@/features/offers-list';
import { offers as mockOffers } from '@/mocks/offers';

import styles from './styles.module.css';

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
          </section>{' '}
        </div>
        <div className="cities">
          <div
            className={classNames(
              'cities__places-container',
              'container',
              styles.gridContainer,
            )}
          >
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {offers.length} places to stay in {city.name}
              </b>

              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>

              <OffersList
                offers={offers}
                containerStyles="cities__places-list"
              />
            </section>

            <div className="cities__right-section">
              <Map city={city} points={offers} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
