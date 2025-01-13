import { CITY_LIST } from '../constants';
import { citySlice, setCity } from './reducer';

describe('city slice', () => {
  it('should correct change city', () => {
    const initialState = { city: CITY_LIST.Paris };
    const expectedState = { city: CITY_LIST.Brussels };

    const result = citySlice.reducer(initialState, setCity(CITY_LIST.Brussels));

    expect(result).toEqual(expectedState);
  });
});
