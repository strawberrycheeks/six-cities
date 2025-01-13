import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/shared/model/constants';

import styles from './styles.module.css';

export const Error404Page = () => (
  <div className={classNames('page', styles.errorPage)}>
    <h1 className={styles.pageTitle}>404 — Page not found</h1>
    <Link
      to={AppRoute.HOME}
      className={classNames('button', styles.buttonLink)}
    >
      Go to Main Page
    </Link>
  </div>
);
