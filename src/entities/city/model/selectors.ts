import { State } from '@/app/store/types';
import { NameSpace } from '@/shared/model/constants';

export const getCity = (state: State) => state[NameSpace.CITY].city;
