import React from 'react'
import { hydrateRoot } from 'react-dom/client';
import App from './app.jsx';
import { listeners } from './helper'

listeners.forEach((listener) => listener());

hydrateRoot(
  document.getElementById('root'),
  <App />
);
