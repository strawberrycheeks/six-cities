import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { AppRoute } from '@/shared/model/constants';

import { getFavoriteOffers } from '../offer-card';
import { getIsAuthenticated, getUser, logout } from '../user';

type HeaderProps = {
  isOnlyLogo?: boolean;
};

export const Header = ({ isOnlyLogo }: HeaderProps) => {
  const dispatch = useAppDispatch();

  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const isAuthenticated = useAppSelector(getIsAuthenticated);

  const user = useAppSelector(getUser);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.HOME} className="header__logo-link">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          {!isOnlyLogo && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthenticated && (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.FAVORITES}
                    >
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{
                          backgroundImage: `url(${user?.avatarUrl})`,
                        }}
                      />
                      <span className="header__user-name user__name">
                        {user?.email}
                      </span>
                      <span className="header__favorite-count">
                        {favoriteOffers?.length ?? 0}
                      </span>
                    </Link>
                  </li>
                )}

                {isAuthenticated ? (
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(logout());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                ) : (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.LOGIN}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
