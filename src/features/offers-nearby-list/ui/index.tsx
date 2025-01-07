import { OfferPreview } from '@/entities/offer-card';
import { OffersList } from '@/features/offers-list';

type OffersNearbyListProps = {
  offers: OfferPreview[];
};

export const OffersNearbyList = (props: OffersNearbyListProps) => {
  const { offers } = props;

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <OffersList offers={offers} containerStyles="near-places__list" />
    </section>
  );
};
