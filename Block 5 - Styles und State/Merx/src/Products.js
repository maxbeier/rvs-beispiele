import Grid from '@material-ui/core/Grid';
import Product from './Product';
import products from './products.json';

const Products = () => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Product {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
