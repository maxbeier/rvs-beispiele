import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Product from './Product';

const noop = () => {};

export default {
  title: 'Example/Product',
  component: Product,
};

const Template = (args) => (
  <MemoryRouter>
    <Product {...args} />
  </MemoryRouter>
);

export const Full = Template.bind({});
Full.args = {
  id: '1',
  image:
    'https://www.salzburger-lagerhaus.at/cc-bilder/bilder-shop-2016-10-17-werkzeug2/image-thumb__15939__ccProduct/71420-akku-bohrschrauber-ddf343she.png',
  price: '169,00 €',
  related: ['17', '18', '2', '3'],
  title: 'Akku-Bohrschrauber Makita DDF343SYE',
  excerpt:
    'Der Akku-Bohrschrauber für exakte Bohr- und Schraubarbeiten mit zwei Akkus (Li-Ion 14,4 V / 1,3 Ah)',
  isLoggedIn: true,
  toggleFavourite: noop,
  isFavourite: true,
};
