import React from 'react';
import cx from 'classnames';
import Heart from './Heart';
import Cart from './Cart';
import Products from './Products';
import Product from './Product';
import { Flex, Box } from './variables';
import styles from './App.module.css';
import products from './products.json';

const App = (props) => {
  const { pathname } = window.location;
  let product = null;

  if (pathname.startsWith('/products/')) {
    const id = pathname.replace('/products/', '');
    product = products.find((product) => product.id === id);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <div className={cx(styles.container, styles.header)}>
          <Box as="h1" m={0} lineHeight="1">
            Merx
          </Box>
          <Flex as="nav" justifyContent="space-between" alignItems="center">
            <Box mr={3}>
              <Heart />
            </Box>
            <Box mr={3}>
              <Cart />
            </Box>
            <a href="/login">Login</a>
          </Flex>
        </div>
      </header>
      <Box as="main" p={3} className={styles.container}>
        {product ? <Product {...product} /> : <Products />}}
      </Box>
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
