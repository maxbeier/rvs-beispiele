import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import Product from './Product';

const props = {
  id: '1',
  image:
    'https://www.salzburger-lagerhaus.at/cc-bilder/bilder-shop-2016-10-17-werkzeug2/image-thumb__15939__ccProduct/71420-akku-bohrschrauber-ddf343she.png',
  price: '169,00 €',
  related: ['17', '18', '2', '3'],
  title: 'Akku-Bohrschrauber Makita DDF343SYE',
  excerpt:
    'Der Akku-Bohrschrauber für exakte Bohr- und Schraubarbeiten mit zwei Akkus (Li-Ion 14,4 V / 1,3 Ah)',
  isLoggedIn: true,
  isFavourite: true,
};

test('product renders without crashing', () => {
  const spy = jest.fn();

  const { container } = render(
    <MemoryRouter>
      <Product {...props} toggleFavourite={spy} />
    </MemoryRouter>,
  );

  expect(container.textContent.includes(props.title)).toBe(true);

  expect(container.textContent.includes(props.excerpt)).toBe(true);
  expect(container.innerHTML.includes(props.image)).toBe(true);
  expect(container.textContent.includes(props.title)).toBe(true);

  const button = document.querySelector('button');

  console.log('1', spy.mock.calls.length);

  button.click();

  console.log('2', spy.mock.calls.length);

  const event = new MouseEvent('click', { bubbles: true, cancelable: true });

  button.dispatchEvent(event);

  console.log('3', spy.mock.calls.length);

  expect(spy).toHaveBeenCalled();
});
