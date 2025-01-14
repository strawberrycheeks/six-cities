import { State } from '@/app/store/types';
import { NameSpace } from '@/shared/model/constants';

export const getSnackbarItems = (state: State) =>
  state[NameSpace.SNACKBAR].items;
