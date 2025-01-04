import classNames from 'classnames';
import { useState } from 'react';

import { OfferCard, OfferCardEntity } from '@/entities/offer-card';

type OffersListProps = {
  offers: OfferCardEntity[];
  containerStyles?: string;
};

export const OffersList = (props: OffersListProps) => {
  const { offers, containerStyles } = props;

  const [, setActiveOfferId] = useState<OfferCardEntity['id'] | null>(null);

  return (
    <div
      className={classNames('places__list', 'tabs__content', containerStyles)}
    >
      {offers.map((place) => (
        <OfferCard
          {...place}
          key={place.name}
          onMouseOver={() => {
            setActiveOfferId(place.id);
          }}
          onMouseLeave={() => {
            setActiveOfferId(null);
          }}
        />
      ))}
    </div>
  );
};
