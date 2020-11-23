import React from 'react';
import cx from 'classnames';
import Heart from './Heart';
import Cart from './Cart';
import Products from './Products';
import styles from './App.module.css';

const App = (props) => {
  const [counter, setCounter] = React.useState(0);
  return (
    <div className={styles.wrapper}>
      <header onClick={() => setCounter(counter + 1)}>
        <div className={cx(styles.container, styles.header)}>
          <h1 className={styles.title}>Merx</h1>
          <nav className={cx(styles.nav, styles.spread)}>
            <Heart />
            <Cart />
            <a href="/login">Login</a>
          </nav>
        </div>
      </header>
      <main className={styles.container}>
        <Products />
      </main>
      <footer>
        <div className={cx(styles.container, styles.footer)}>
          <span>&copy; 2020</span>
          <a href="/">Impressum</a>
          <a href="/">Datenschutz</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
