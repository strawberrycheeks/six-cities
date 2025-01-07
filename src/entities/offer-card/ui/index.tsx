import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { setIsOfferFavorite } from '@/app/store/model/async-thunks';
import { AuthorizationStatus } from '@/app/store/model/enums';
import { useAppDispatch, useAppSelector } from '@/app/store/model/hooks';
import { AppRoutes } from '@/shared/model/app-routes';
import { Rating } from '@/shared/ui/rating';

import { OFFER_IMAGE_SIZE } from '../model/consts';
import { OfferCardMode, OfferPreview } from '../model/types';

type OfferCardProps = OfferPreview & {
  imgAlt?: string;
  mode?: OfferCardMode;
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
};

export const OfferCard = (props: OfferCardProps) => {
  const {
    id,
    title,
    rating = 0,
    price,
    type,
    previewImage,
    imgAlt = 'Place image',
    isFavorite,
    isPremium,
    mode = 'full',
    onMouseOver,
    onMouseLeave,
  } = props;

  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.authorizationStatus === AuthorizationStatus.AUTH,
  );

  const isFullMode = mode === 'full';

  const onFavoriteClick = () => {
    dispatch(
      setIsOfferFavorite({
        offerId: id,
        isFavorite: !isFavorite,
        context: 'offers',
      }),
    );
  };

  return (
    <article
      className={classNames(
        isFullMode ? 'cities__card' : 'favorites__card',
        'place-card',
      )}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {Boolean(isPremium) && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={classNames(
          isFullMode ? 'cities__image-wrapper' : 'favorites__image-wrapper',
          'place-card__image-wrapper',
        )}
      >
        <Link to={`${AppRoutes.OFFER}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={OFFER_IMAGE_SIZE[mode].width}
            height={OFFER_IMAGE_SIZE[mode].height}
            alt={imgAlt}
          />
        </Link>
      </div>
      <div
        className={classNames(
          {
            ['favorites__card-info']: !isFullMode,
          },
          'place-card__info',
        )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro; {price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {isAuthorized && (
            <button
              className={classNames('place-card__bookmark-button', 'button', {
                ['place-card__bookmark-button--active']: isFavorite,
              })}
              type="button"
              onClick={onFavoriteClick}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          )}
        </div>
        <Rating
          rating={rating}
          mode="compact"
          containerStyles="place-card__rating"
          starsStyles="place-card__stars"
        />
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.OFFER}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};
