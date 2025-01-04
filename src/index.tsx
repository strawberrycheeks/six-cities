import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { favorites } from './mocks/favorites';
import { offers } from './mocks/offers';
import { cities } from './mocks/cities';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offers={offers} favorites={favorites} cities={cities} />
  </React.StrictMode>,
);
