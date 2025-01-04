import { components } from '@/../types/schema';
import { CityName } from '@/entities/city';

export type OfferCardMode = 'full' | 'compact';

export type OfferType = 'Apartment' | 'Room';

export type OfferPreview = Required<components['schemas']['OfferPreview']> & {
  location: Required<
    Exclude<components['schemas']['OfferPreview']['location'], undefined>
  >;
  city: Required<
    Exclude<components['schemas']['OfferPreview']['city'], undefined>
  > & {
    name: CityName;
  };
};

export type OfferMaximum = Required<components['schemas']['OfferMaximum']> &
  OfferPreview;
