import classNames from 'classnames';

import { CommentGet, Review } from '@/entities/review';

type ReviewsListProps = {
  reviews: CommentGet[];
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
          <Review key={`${review.user.name}-${review.date}`} {...review} />
        ))}
      </ul>
    </section>
  );
};
