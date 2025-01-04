import classNames from 'classnames';

import { OfferCard, OfferCardEntity } from '@/entities/offer-card';

type OffersListProps = {
  offers: OfferCardEntity[];
  changeActiveOffer?: (id: OfferCardEntity['id'] | null) => void;
  containerStyles?: string;
};

export const OffersList = (props: OffersListProps) => {
  const { offers, changeActiveOffer, containerStyles } = props;

  return (
    <div
      className={classNames('places__list', 'tabs__content', containerStyles)}
    >
      {offers.map((place) => (
        <OfferCard
          {...place}
          key={place.id}
          onMouseOver={() => {
            changeActiveOffer?.(place.id);
          }}
          onMouseLeave={() => {
            changeActiveOffer?.(null);
          }}
        />
      ))}
    </div>
  );
};
