import React from 'react';
import { render } from 'react-dom';

import './extensions/';

import App from './components/App/';

const rootElement = document.getElementById('root');

fetch("./config.json")
    .then(res => res.json())
    .then(config => render(<App config={config} />, rootElement));