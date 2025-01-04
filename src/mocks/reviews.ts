import { ReviewEntity } from '@/entities/Review';

export const reviews: ReviewEntity[] = [
  {
    userName: 'Max',
    userAvatarSrc: 'img/avatar-max.jpg',
    rating: 4,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: new Date('2019-04-24'),
  },
];
