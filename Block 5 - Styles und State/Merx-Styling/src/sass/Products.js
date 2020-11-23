import products from './products.json';
import Product from './Product';

const Products = () => {
  return (
    <div className="products">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;
