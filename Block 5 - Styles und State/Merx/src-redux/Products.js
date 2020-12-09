import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Product from './Product';
import { loadProducts } from './store/actions';

const Products = () => {
  const dispatch = useDispatch();
  const { isLoading, error, data } = useSelector((state) => state.products);

  const ids = Object.keys(data);

  React.useEffect(() => {
    dispatch(loadProducts);
  }, [dispatch]);

  if (isLoading)
    return (
      <Box textAlign="center" mt={2}>
        <CircularProgress />
      </Box>
    );

  if (error) return <h1>Error: {error.message}</h1>;

  if (!ids.length) return <h1>Keine Produkte vorhanden</h1>;

  return (
    <Grid container spacing={4}>
      {ids.map((id) => (
        <Grid item key={id} xs={12} sm={6} md={4}>
          <Product id={id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
