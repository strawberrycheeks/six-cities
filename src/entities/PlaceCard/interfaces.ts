export type PlaceType = 'Apartment' | 'Room';

export type PlaceCardEntity = {
  name: string;
  type: PlaceType;
  imgSrc: string;
  imgAlt?: string;
  price: number;
  isPremium?: boolean;
  rating: 1 | 2 | 3 | 4 | 5;
};
