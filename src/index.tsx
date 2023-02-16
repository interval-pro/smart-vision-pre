import React from 'react';
import ReactDOM from 'react-dom/client';
import './@style/index.scss';

import { LandingPage } from './@pages/langing-page/landing-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);
