import classNames from 'classnames';

import { useAppDispatch } from '@/app/store/hooks';

import { OfferCard, OfferPreview, setActiveOfferId } from '..';

type OffersListProps = {
  offers: OfferPreview[];
  containerStyles?: string;
  shouldUpdateActiveOffer?: boolean;
};

export const OffersList = ({
  offers,
  containerStyles,
  shouldUpdateActiveOffer,
}: OffersListProps) => {
  const dispatch = useAppDispatch();

  const changeActiveOffer = (id?: OfferPreview['id']) => {
    if (!shouldUpdateActiveOffer) return;
    dispatch(setActiveOfferId(id));
  };

  return (
    <div
      className={classNames('places__list', 'tabs__content', containerStyles)}
    >
      {offers.length === 0 ? (
        <p>No places to stay available</p>
      ) : (
        offers.map((place) => (
          <OfferCard
            {...place}
            key={place.id}
            onMouseOver={() => {
              changeActiveOffer(place.id);
            }}
            onMouseLeave={() => {
              changeActiveOffer();
            }}
          />
        ))
      )}
    </div>
  );
};
