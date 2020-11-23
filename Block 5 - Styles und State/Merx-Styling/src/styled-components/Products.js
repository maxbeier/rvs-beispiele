import styled from 'styled-components';
import products from './products.json';
import Product from './Product';

const ProductsSt = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  grid-gap: 1rem;
`;

const Products = ({ className }) => {
  return (
    <ProductsSt>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ProductsSt>
  );
};

export default Products;
