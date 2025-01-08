import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/app/store/model/hooks';
import { CityNames } from '@/entities/city';
import { AppRoutes } from '@/shared/model/app-routes';

export const CitiesList = () => {
  const currentCity = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {CityNames.map((cityName) => (
        <li className="locations__item" key={cityName}>
          <Link
            className={classNames(
              'locations__item-link',
              'tabs__item',
              currentCity.name === cityName && 'tabs__item--active',
            )}
            to={`${AppRoutes.HOME}#${cityName}`}
          >
            <span>{cityName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
