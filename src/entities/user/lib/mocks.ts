import faker from 'faker';

import { AuthInfo } from '..';

export const makeUser = (): AuthInfo => ({
  name: faker.name.firstName(),
  avatarUrl: faker.image.imageUrl(),
  isPro: faker.datatype.boolean(),
  email: faker.internet.email(),
});
