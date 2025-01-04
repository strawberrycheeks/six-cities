import classNames from 'classnames';
import { useMemo, useState } from 'react';

import { City } from '@/entities/city';
import { OfferCardEntity } from '@/entities/offer-card';
import { Map } from '@/features/map';
import { OffersList } from '@/features/offers-list';
import { Select } from '@/shared/ui/select';

import { sortVariants } from '../model/consts';
import { SortVariant } from '../model/types';
import styles from './styles.module.css';

type CityPlacesListProps = { offers: OfferCardEntity[]; city: City };

export const CityPlacesList = (props: CityPlacesListProps) => {
  const { offers, city } = props;

  const [activeOfferId, setActiveOfferId] = useState<
    OfferCardEntity['id'] | null
  >(null);
  const [sortVariant, setSortVariant] = useState<SortVariant>(
    SortVariant.POPULAR,
  );

  const sortedOffers = useMemo(() => {
    switch (sortVariant) {
      case SortVariant.TOP_RATED:
        return offers.toSorted((a, b) => b.rating - a.rating);
      case SortVariant.HIGH_TO_LOW:
        return offers.toSorted((a, b) => b.price - a.price);
      case SortVariant.LOW_TO_HIGH:
        return offers.toSorted((a, b) => a.price - b.price);
      default:
        return offers;
    }
  }, [offers, sortVariant]);

  return (
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
          <Select
            value={sortVariant}
            options={sortVariants}
            onChange={setSortVariant}
            label="Sort by"
          />
          <OffersList
            offers={sortedOffers}
            containerStyles="cities__places-list"
            changeActiveOffer={setActiveOfferId}
          />
        </section>
        <div className="cities__right-section">
          <Map
            city={city}
            points={offers}
            selectedPointId={activeOfferId ?? undefined}
          />
        </div>
      </div>
    </div>
  );
};
