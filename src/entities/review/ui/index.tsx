import { dateToMonthWordYear, dateToYearMonthDay } from '@/shared/lib/date';
import { Rating } from '@/shared/ui/rating';

import { ReviewEntity } from '../model/types';

export const Review = (props: ReviewEntity) => {
  const { text, date, rating, userName, userAvatarSrc } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={userAvatarSrc}
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

        <p className="reviews__text">{text}</p>
        <time className="reviews__time" dateTime={dateToYearMonthDay(date)}>
          {dateToMonthWordYear(date)}
        </time>
      </div>
    </li>
  );
};
