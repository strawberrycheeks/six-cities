import classNames from 'classnames';
import { useState } from 'react';

import { OfferCard, OfferCardEntity } from '@/entities/OfferCard';

type OffersListProps = {
  offers: OfferCardEntity[];
  className?: string;
};

export const OffersList = ({ offers, className }: OffersListProps) => {
  const [, setActiveOfferId] = useState<OfferCardEntity['id'] | null>(null);

  return (
    <div className={classNames('places__list', 'tabs__content', className)}>
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
