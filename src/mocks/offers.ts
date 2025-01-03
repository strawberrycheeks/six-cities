import { OfferCardEntity } from '@/entities/OfferCard';

export const offers: OfferCardEntity[] = [
  {
    id: 0,
    isPremium: true,
    imgSrc: 'img/apartment-01.jpg',
    price: 120,
    rating: 4,
    name: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
    city: 'Amsterdam',
  },
  {
    id: 1,
    imgSrc: 'img/room.jpg',
    price: 80,
    rating: 4,
    name: 'Wood and stone place',
    type: 'Room',
    city: 'Amsterdam',
  },
  {
    id: 2,
    imgSrc: 'img/apartment-02.jpg',
    price: 132,
    rating: 4,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    city: 'Amsterdam',
  },
  {
    id: 3,
    isPremium: true,
    imgSrc: 'img/apartment-03.jpg',
    price: 180,
    rating: 4,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    city: 'Amsterdam',
  },
  {
    id: 4,
    imgSrc: 'img/room.jpg',
    price: 80,
    rating: 4,
    name: 'Wood and stone plact',
    type: 'Room',
    city: 'Amsterdam',
  },
];