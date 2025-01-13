import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/app/store/hooks';
import { AppRoute } from '@/shared/model/constants';

import { getCity } from './model/selectors';
import { CityNames } from './types';

export const CitiesList = () => {
  const currentCity = useAppSelector(getCity);

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
            to={`${AppRoute.HOME}#${cityName}`}
          >
            <span>{cityName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
