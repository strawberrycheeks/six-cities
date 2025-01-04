import React from 'react';

const reviewStarsSpec = [
  { rating: 5, title: 'Perfect' },
  { rating: 4, title: 'Good' },
  { rating: 3, title: 'Not bad' },
  { rating: 2, title: 'Badly' },
  { rating: 1, title: 'Terribly' },
];

type ReviewRatingProps = {
  value: number;
  onChange: (value: number) => void;
};

export const ReviewRating = ({ value, onChange }: ReviewRatingProps) => (
  <div className="reviews__rating-form form__rating">
    {reviewStarsSpec.map(({ rating, title }) => (
      <React.Fragment key={title}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          id={`${rating}-stars`}
          type="radio"
          checked={value === rating}
          onChange={() => onChange(rating)}
        />
        <label
          htmlFor={`${rating}-stars`}
          className="reviews__rating-label form__rating-label"
          title={title}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </React.Fragment>
    ))}
  </div>
);
