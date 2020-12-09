import React from 'react';
import { useQuery, useQueryCache } from 'react-query';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Product from './Product';

const Products = () => {
  const queryCache = useQueryCache();
  const { isLoading, error, data } = useQuery('products', {
    onSuccess: (data) =>
      data.forEach((product) =>
        queryCache.setQueryData(`products/${product.id}`, (oldData) => ({
          ...oldData,
          ...product,
        })),
      ),
  });

  if (isLoading)
    return (
      <Box textAlign="center" mt={2}>
        <CircularProgress />
      </Box>
    );

  if (error) return <h1>Error: {error.message}</h1>;

  if (!data.length) return <h1>Keine Produkte vorhanden</h1>;

  return (
    <Grid container spacing={4}>
      {data.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Product id={product.id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
