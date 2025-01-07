import { Link } from 'react-router-dom';

import { logout } from '@/app/store/model/async-thunks';
import { AuthorizationStatus } from '@/app/store/model/enums';
import { useAppDispatch, useAppSelector } from '@/app/store/model/hooks';
import { AppRoutes } from '@/shared/model/app-routes';

type HeaderProps = {
  isOnlyLogo?: boolean;
};

export const Header = (props: HeaderProps) => {
  const { isOnlyLogo } = props;

  const dispatch = useAppDispatch();

  const isAuthorizated = useAppSelector(
    (state) => state.authorizationStatus === AuthorizationStatus.AUTH,
  );

  const user = useAppSelector((state) => state.user);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoutes.HOME} className="header__logo-link">
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
                {isAuthorizated && (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoutes.FAVORITES}
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
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                )}

                {isAuthorizated ? (
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={() => {
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
                      to={AppRoutes.LOGIN}
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
