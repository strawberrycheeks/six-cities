import classNames from 'classnames';

type RatingProps = {
  rating: number;
  mode?: 'compact' | 'full';
  containerStyles?: string;
  starsStyles?: string;
};

export const Rating = (props: RatingProps) => {
  const { rating, mode = 'full', containerStyles, starsStyles } = props;

  const isFullMode = mode === 'full';

  return (
    <div className={classNames(containerStyles, 'rating')}>
      <div className={classNames(starsStyles, 'rating__stars')}>
        <span style={{ width: `${20 * Math.trunc(rating)}%` }}></span>
        <span className="visually-hidden">Rating {rating}</span>
      </div>
      {Boolean(isFullMode) && (
        <span className="offer__rating-value rating__value">{rating}</span>
      )}
    </div>
  );
};
