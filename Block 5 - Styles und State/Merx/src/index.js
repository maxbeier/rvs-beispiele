import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store, persistor } from './store/store';

import 'fontsource-roboto/300.css';
import 'fontsource-roboto/400.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/700.css';

window.store = store;

const fetchFromServer = (path) =>
  fetch(`http://localhost:3001/${path}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.success) return json.data;
      else throw new Error(json.error);
    });

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      staleTime: 5000,
      queryFn: fetchFromServer,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <App />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </Router>
        </PersistGate>
      </Provider>
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
