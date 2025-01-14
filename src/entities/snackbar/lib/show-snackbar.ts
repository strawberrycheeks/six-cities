import { store } from '@/app/store';
import { getRandomId } from '@/shared/lib/get-random-id';

import { SNACKBAR_TIMEOUT } from '../constants';
import { addSnackbarItem, removeSnackbarItem } from '../model/reducer';
import { SnackbarItem } from '../types';

export const showSnackbar = (message: SnackbarItem['message']) => {
  const id = getRandomId();

  store.dispatch(addSnackbarItem({ message, id }));

  setTimeout(() => {
    store.dispatch(removeSnackbarItem(id));
  }, SNACKBAR_TIMEOUT);
};
