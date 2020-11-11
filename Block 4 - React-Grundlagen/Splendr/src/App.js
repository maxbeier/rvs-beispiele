import React from 'react';
import ProductForm from './ProductForm';
import Product from './Product';
import './App.css';

const API_URL = 'http://localhost:3001/';
const fetchProducts = () =>
  fetch(API_URL)
    .then((result) => result.json())
    .then((json) => json.data);

function App() {
  const [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div className="container">
      <ProductForm />

      <div className="row list-group products-list">
        {products?.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default App;
