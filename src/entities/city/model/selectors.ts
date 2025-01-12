import { State } from '@/app/store/model/types';
import { NameSpace } from '@/shared/model/enums';

export const getCity = (state: State) => state[NameSpace.CITY].city;
