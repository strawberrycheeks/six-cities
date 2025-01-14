import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getIsAuthenticated } from '@/entities/user';
import { AppRoute } from '@/shared/model/constants';
import { Rating } from '@/shared/ui/rating';

import { setIsOfferFavorite } from '..';
import { OfferPreview } from '../types';

type OfferCardProps = {
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  mode?: 'full' | 'compact';
  imgAlt?: string;
} & OfferPreview;

const imagesSize = {
  full: {
    width: 260,
    height: 200,
  },
  compact: {
    width: 150,
    height: 110,
  },
};

export const OfferCard = ({
  id,
  isPremium,
  previewImage,
  rating = 0,
  imgAlt = 'Place image',
  price,
  title,
  type,
  onMouseOver,
  onMouseLeave,
  mode = 'full',
  isFavorite,
}: OfferCardProps) => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(getIsAuthenticated);

  const onFavoriteClick = () => {
    dispatch(
      setIsOfferFavorite({
        offerId: id,
        isFavorite: !isFavorite,
        context: 'offers',
      }),
    );
  };

  if (!id) return null;

  const isFullMode = mode === 'full';

  return (
    <article
      className={classNames(
        isFullMode ? 'cities__card' : 'favorites__card',
        'place-card',
      )}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      data-offer-id={id}
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
        <Link to={`${AppRoute.OFFER}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imagesSize[mode].width}
            height={imagesSize[mode].height}
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
          {isAuthenticated && (
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
          <Link to={`${AppRoute.OFFER}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};
