import { OffersList } from '..';
import { OfferPreview } from '../types';

type OtherPlacesNearbyProps = {
  offers: OfferPreview[];
};

export const OtherPlacesNearby = ({ offers }: OtherPlacesNearbyProps) => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>

    <OffersList offers={offers} containerStyles="near-places__list" />
  </section>
);
