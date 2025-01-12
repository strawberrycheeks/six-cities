import classNames from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/store/model/hooks';
import { cities } from '@/entities/city';
import {
  clearOffer,
  clearOffers,
  fetchOffer,
  fetchOffersNearby,
  getOffer,
  getOfferFetchStatus,
  getOffers,
  getOffersFetchStatus,
  setActiveOfferId,
  setIsOfferFavorite,
} from '@/entities/offer-card';
import {
  addOfferReview,
  clearReviews,
  fetchOfferReviews,
  getLatest10Reviews,
  getReviewsFetchStatus,
} from '@/entities/review';
import { getIsAuthenticated } from '@/entities/user';
import { Header } from '@/features/header';
import { Map } from '@/features/map';
import { OffersNearbyList } from '@/features/offers-nearby-list';
import { ReviewForm } from '@/features/review-form';
import { ReviewsList } from '@/features/reviews-list';
import { FetchStatus } from '@/shared/model/enums';
import { Rating } from '@/shared/ui/rating';
import { Spinner } from '@/shared/ui/spinner';

import styles from './styles.module.css';

export const OfferPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const offer = useAppSelector(getOffer);
  const offerFetchStatus = useAppSelector(getOfferFetchStatus);

  const offers = useAppSelector(getOffers);
  const offersFetchStatus = useAppSelector(getOffersFetchStatus);

  const reviews = useAppSelector(getLatest10Reviews);
  const reviewsFetchStatus = useAppSelector(getReviewsFetchStatus);

  const isAuthenticated = useAppSelector(getIsAuthenticated);

  const firstThreeOffers = useMemo(
    () => (offer ? [offer, ...(offers?.slice(0, 3) ?? [])] : []),
    [offer, offers],
  );

  useEffect(() => {
    if (!id) return;

    dispatch(fetchOffer(id));
    dispatch(setActiveOfferId(id));

    return () => {
      dispatch(clearOffer());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!id || !offer) return;

    dispatch(fetchOffersNearby(id));
    dispatch(fetchOfferReviews(id));

    return () => {
      dispatch(clearOffers());
      dispatch(clearReviews());
    };
  }, [dispatch, id, offer]);

  const onReviewSubmit = useCallback(
    ({ rating, comment }: { comment: string; rating: number }) => {
      if (!offer) return;
      dispatch(
        addOfferReview({
          offerId: offer.id,
          rating,
          comment,
        }),
      );
    },
    [dispatch, offer],
  );

  const onFavoriteClick = () => {
    if (!offer) return;

    dispatch(
      setIsOfferFavorite({
        offerId: offer.id,
        isFavorite: !offer.isFavorite,
        context: 'offer',
      }),
    );
  };

  if (!id || (offerFetchStatus === FetchStatus.FAILURE && !offer)) {
    return <Navigate to={'/404'} />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        {offerFetchStatus !== FetchStatus.SUCCESS || !offer ? (
          <Spinner />
        ) : (
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images?.map((image) => (
                  <div className="offer__image-wrapper" key={`${image}`}>
                    <img className="offer__image" src={image} />
                  </div>
                ))}
              </div>
            </div>

            <div
              className={classNames(
                'offer__container',
                'container',
                styles.offerContainer,
              )}
            >
              <div className="offer__wrapper">
                {offer.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1
                    className="offer__name"
                    dangerouslySetInnerHTML={{ __html: offer.title }}
                  />

                  {isAuthenticated && (
                    <button
                      className={classNames(
                        'offer__bookmark-button',
                        'button',
                        {
                          ['offer__bookmark-button--active']: offer.isFavorite,
                        },
                      )}
                      type="button"
                      onClick={onFavoriteClick}
                    >
                      <svg
                        className="offer__bookmark-icon"
                        width="31"
                        height="33"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  )}
                </div>

                <Rating
                  rating={offer.rating}
                  containerStyles="offer__rating"
                  starsStyles="offer__stars"
                />

                <ul className="offer__features">
                  <li
                    className={classNames(
                      'offer__feature',
                      'offer__feature--entire',
                      styles.capitalized,
                    )}
                  >
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedroom{offer.bedrooms > 1 ? 's' : ''}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adult{offer.maxAdults > 1 ? 's' : ''}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>

                {reviewsFetchStatus !== FetchStatus.SUCCESS || !reviews ? (
                  <Spinner />
                ) : (
                  <ReviewsList
                    reviews={reviews}
                    containerStyles="offer__reviews"
                  />
                )}

                {isAuthenticated && <ReviewForm onSubmit={onReviewSubmit} />}
              </div>
            </div>
            <section
              className={classNames('map', 'container', styles.offerMap)}
            >
              <Map city={cities[offer.city.name]} points={firstThreeOffers} />
            </section>
          </section>
        )}
        <div className="container">
          {offersFetchStatus !== FetchStatus.SUCCESS || !offers ? (
            <Spinner />
          ) : (
            <OffersNearbyList offers={offers} />
          )}
        </div>
      </main>
    </div>
  );
};
