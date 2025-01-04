import classNames from 'classnames';

import { Review, ReviewEntity } from '@/entities/Review';

type ReviewsListProps = {
  reviews: ReviewEntity[];
  containerStyles?: string;
};

export const ReviewsList = (props: ReviewsListProps) => {
  const { reviews, containerStyles } = props;

  return (
    <section className={classNames('reviews', containerStyles)}>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.date.toString()} {...review} />
        ))}
      </ul>
    </section>
  );
};
