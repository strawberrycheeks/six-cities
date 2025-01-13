import faker from 'faker';

import { CITY_LIST, CityNames } from '@/entities/city';

import { OfferMaximum, OfferPreview } from '../types';

export const makeOfferPreview = (): OfferPreview => ({
  id: faker.datatype.uuid(),
  title: faker.random.word(),
  type: 'Apartment',
  price: faker.datatype.number(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number(),
  location: {
    latitude: faker.datatype.number(),
    longitude: faker.datatype.number(),
    zoom: faker.datatype.number(),
  },
  previewImage: faker.image.imageUrl(),
  city: {
    name: CITY_LIST[faker.random.arrayElement(CityNames)].name,
    location: {
      latitude: faker.datatype.number(),
      longitude: faker.datatype.number(),
      zoom: faker.datatype.number(),
    },
  },
});

export const makeOfferMaximum = (): OfferMaximum => ({
  ...makeOfferPreview(),
  images: faker.datatype.array().map(() => faker.image.imageUrl()),
  bedrooms: faker.datatype.number(),
  maxAdults: faker.datatype.number(),
  description: faker.lorem.paragraph(),
  goods: faker.datatype.array().map((el) => el.toString()),
  host: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.imageUrl(),
    isPro: faker.datatype.boolean(),
  },
});

export const makeOffers = () => faker.datatype.array().map(makeOfferPreview);
