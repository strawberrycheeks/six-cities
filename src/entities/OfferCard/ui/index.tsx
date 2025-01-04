import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';

import { Rating } from '@/shared/ui/Rating';
import { OfferCardEntity } from '../model/types';

type OfferCardMode = 'full' | 'compact';

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

type OfferCardProps = OfferCardEntity & {
  mode?: OfferCardMode;
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
};

export const OfferCard = (props: OfferCardProps) => {
  const {
    id,
    name,
    rating,
    price,
    type,
    imgSrc,
    imgAlt = 'Place image',
    isBookmarked,
    isPremium,
    mode = 'full',
    onMouseOver,
    onMouseLeave,
  } = props;

  const isFullMode = mode === 'full';

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
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={imgSrc}
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
          <button
            className={classNames('place-card__bookmark-button', 'button', {
              ['place-card__bookmark-button--active']: Boolean(isBookmarked),
            })}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <Rating
          rating={rating}
          mode="compact"
          containerStyles="place-card__rating"
          starsStyles="place-card__stars"
        />
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};
