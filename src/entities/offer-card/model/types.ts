import { CityName } from '@/entities/city';

export type OfferType = 'Apartment' | 'Room';

export type OfferCardEntity = {
  id: number;
  name: string;
  rating: number;
  price: number;
  type: OfferType;
  city: CityName;
  latitude: number;
  longitude: number;
  imgSrc: string;
  imgAlt?: string;
  isBookmarked?: boolean;
  isPremium?: boolean;
};
