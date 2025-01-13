import { components } from '@/../types/schema';

export type User = Required<components['schemas']['AuthInfo']>;

export type UserDto = Required<components['schemas']['User']>;
