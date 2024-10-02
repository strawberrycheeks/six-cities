import { FC } from 'react';
import { PlaceCardEntity } from '../../entities/PlaceCard';
import { MainPage } from '../../pages/Main';

type AppProps = {
  places: PlaceCardEntity[];
};

export const App: FC<AppProps> = ({ places }) => <MainPage places={places} />;
