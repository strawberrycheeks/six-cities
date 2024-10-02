import { FC } from 'react';
import { PlaceCardEntity } from '../../entities/PlaceCard';
import { MainPage } from '../../pages/Main';

type Props = {
  places: PlaceCardEntity[];
};

export const App: FC<Props> = ({ places }) => <MainPage places={places} />;
