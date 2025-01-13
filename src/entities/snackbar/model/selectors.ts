import { State } from '@/app/store/model/types';
import { NameSpace } from '@/shared/model/enums';

export const getSnackbarItems = (state: State) =>
  state[NameSpace.SNACKBAR].items;
