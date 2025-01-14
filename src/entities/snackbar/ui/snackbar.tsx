import { useAppDispatch } from '@/app/store/hooks';

import { removeSnackbarItem } from '../model/reducer';
import { SnackbarItem } from '../types';
import styles from './styles.module.css';

export const Snackbar = ({ id, message }: SnackbarItem) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(removeSnackbarItem(id));
  };

  return (
    <div data-snackbar-id={id} className={styles.item}>
      {message}
      <button onClick={handleClose}>Close</button>
    </div>
  );
};
