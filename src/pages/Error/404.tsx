import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';
import { AppRoutes } from '@/app/routes';

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
