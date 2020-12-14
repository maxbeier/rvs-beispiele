import React from 'react';
import { useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFavs } from './FavouritesContext';
import { useUser } from './UserContext';
import Product from './Product';

const ConnectedProduct = ({ id }) => {
  const { isLoggedIn } = useUser();
  const { toggleFavourite, isFavourite } = useFavs();
  const { isLoading, error, data: product } = useQuery(`products/${id}`);

  if (!product || isLoading)
    return (
      <Box textAlign="center" mt={2}>
        <CircularProgress />
      </Box>
    );

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <Product
      {...product}
      isLoggedIn={isLoggedIn}
      isFavourite={isFavourite(id)}
      toggleFavourite={() => toggleFavourite(id)}
    />
  );
};

export default ConnectedProduct;
