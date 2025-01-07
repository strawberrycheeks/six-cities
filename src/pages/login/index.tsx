import { FormEventHandler } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { login } from '@/app/store/model/async-thunks';
import { AuthorizationStatus } from '@/app/store/model/enums';
import { useAppDispatch, useAppSelector } from '@/app/store/model/hooks';
import { User } from '@/entities/user';
import { Header } from '@/features/header';
import { AppRoutes } from '@/shared/model/app-routes';

export const LoginPage = () => {
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.authorizationStatus === AuthorizationStatus.AUTH,
  );

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      user[key] = value;
    }

    dispatch(login(user as User));
  };

  if (isAuthorized) {
    return <Navigate to={AppRoutes.HOME} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header isOnlyLogo />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={onSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoutes.HOME}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
