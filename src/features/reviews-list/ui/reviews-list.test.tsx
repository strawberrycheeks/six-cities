import { render } from '@testing-library/react';

import { makeReviews } from '@/entities/review/lib/mocks';

import { ReviewsList } from '.';

describe('<ReviewsList />', () => {
  it('should render all given reviews', () => {
    const reviews = makeReviews();

    const component = <ReviewsList reviews={reviews} />;

    const { container } = render(component);

    expect(container.querySelectorAll('.reviews__item').length).toBe(
      reviews.length,
    );
  });
});
