import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker.js';
import 'typeface-neucha';
import 'typeface-patrick-hand-sc';
import './paper.css';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
