import {
  dateToMonthWordYear,
  dateToYearMonthDay,
} from '@/shared/ui/date-formatter';
import { Rating } from '@/shared/ui/rating';

import { CommentGet } from '../model/types';

type ReviewProps = CommentGet;

export const Review = (props: ReviewProps) => {
  const {
    comment,
    date,
    rating,
    user: { name: userName, avatarUrl: userAvatarUrl },
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={userAvatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <Rating
          rating={rating}
          containerStyles="reviews__rating"
          starsStyles="reviews__stars"
          mode="compact"
        />

        <p className="reviews__text">{comment}</p>
        <time
          className="reviews__time"
          dateTime={dateToYearMonthDay(new Date(date))}
        >
          {dateToMonthWordYear(new Date(date))}
        </time>
      </div>
    </li>
  );
};
