import { City, CityName } from './types';

export const cities: Record<CityName, City> = {
  Amsterdam: {
    name: 'Amsterdam',
    latitude: 52.374,
    longitude: 4.89,
  },
  Brussels: {
    name: 'Brussels',
    latitude: 50.8476,
    longitude: 4.3572,
  },
  Cologne: {
    name: 'Cologne',
    latitude: 50.9384,
    longitude: 6.95997,
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    latitude: 51.2254,
    longitude: 6.7763,
  },
  Hamburg: {
    name: 'Hamburg',
    latitude: 53.5503,
    longitude: 10.0007,
  },
  Paris: {
    name: 'Paris',
    latitude: 48.8566,
    longitude: 2.3515,
  },
};
