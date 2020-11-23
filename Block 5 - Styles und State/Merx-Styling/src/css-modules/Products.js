import products from './products.json';
import Product from './Product';
import styles from './Product.module.css';

const Products = () => {
  return (
    <div className={styles.products}>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;
