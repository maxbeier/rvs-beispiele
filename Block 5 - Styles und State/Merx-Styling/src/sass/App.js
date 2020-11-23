import React from 'react';
import Heart from './Heart';
import Cart from './Cart';
import Products from './Products';

import './App.scss';

const App = (props) => {
  return (
    <div className="wrapper">
      <header>
        <div className="container header">
          <h1 className="title">Merx</h1>
          <nav className="spread">
            <Heart />
            <Cart />
            <a href="/login">Login</a>
          </nav>
        </div>
      </header>
      <main className="container">
        <Products />
      </main>
      <footer>
        <div className="container footer">
          <span>&copy; 2020</span>
          <a href="/">Impressum</a>
          <a href="/">Datenschutz</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
