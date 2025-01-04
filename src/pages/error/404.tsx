import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@/shared/model/app-routes';

import styles from './styles.module.css';

export const Error404Page = () => (
  <div className={classNames('page', styles.errorPage)}>
    <h1 className={styles.pageTitle}>404 — Page not found</h1>
    <Link
      to={AppRoutes.HOME}
      className={classNames('button', styles.buttonLink)}
    >
      Go to Main Page
    </Link>
  </div>
);
