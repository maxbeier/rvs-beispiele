import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { FavouritesProvider } from './FavouritesContext';
import { UserProvider } from './UserContext';

import 'fontsource-roboto/300.css';
import 'fontsource-roboto/400.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/700.css';

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
      <UserProvider>
        <FavouritesProvider>
          <Router>
            <App />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </Router>
        </FavouritesProvider>
      </UserProvider>
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
