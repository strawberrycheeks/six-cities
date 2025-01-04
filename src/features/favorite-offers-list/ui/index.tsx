import { useMemo } from 'react';

import { CityName, CityNames } from '@/entities/city';
import { OfferCard, OfferCardEntity } from '@/entities/offer-card';

type FavoriteOffersListProps = { offers: OfferCardEntity[] };

export const FavoriteOffersList = (props: FavoriteOffersListProps) => {
  const { offers } = props;

  const cityToOffersMap = useMemo(() => {
    const citiesMap: Partial<Record<CityName, OfferCardEntity[]>> = {};

    offers.forEach((offer) => {
      const city = offer.city.name;

      if (!CityNames.includes(city)) return;

      if (!citiesMap[city]) {
        citiesMap[city] = [];
      }

      citiesMap[city]?.push(offer);
    });

    return citiesMap;
  }, [offers]);

  return (
    <ul className="favorites__list">
      {Object.entries(cityToOffersMap).map(([cityName, cityOffers]) => (
        <li className="favorites__locations-items" key={cityName}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{cityName}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <OfferCard {...offer} mode="compact" key={offer.id} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};
