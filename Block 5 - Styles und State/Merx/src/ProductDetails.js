import React from 'react';
import { useQuery } from 'react-query';
import { Link as RouteLink } from 'react-router-dom';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Product from './Product';
import { useFavs } from './FavouritesContext';
import { useUser } from './UserContext';

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const CardActionsSt = styled(CardActions)`
  justify-content: space-between;
  padding-right: 1rem;
`;

const ProductDetails = ({ id }) => {
  const classes = useStyles();
  const { isLoggedIn } = useUser();
  const { toggleFavourite, isFavourite } = useFavs();
  const { isLoading, isFetching, error, data: product, refetch } = useQuery(
    `products/${id}`,
  );

  React.useEffect(() => {
    if (!product?.bodyHtml) refetch();
  }, [product?.bodyHtml, refetch]);

  if (isLoading)
    return (
      <Box textAlign="center" mt={2}>
        <CircularProgress />
      </Box>
    );

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <RouteLink to={`/products/${id}`}>
        <CardMedia
          className={classes.cardMedia}
          image={product.image}
          title={product.title}
        />
      </RouteLink>
      <CardActionsSt>
        {isLoggedIn ? (
          <IconButton onClick={() => toggleFavourite(id)} color="primary">
            {isFavourite(id) ? (
              <FavoriteOutlinedIcon color="primary" />
            ) : (
              <FavoriteBorderOutlinedIcon color="primary" />
            )}
          </IconButton>
        ) : (
          <span />
        )}
        <Typography>{product.price}</Typography>
      </CardActionsSt>
      <CardContent className={classes.cardContent}>
        <Link component={RouteLink} to={`/products/${id}`}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
        </Link>
        <Typography
          dangerouslySetInnerHTML={{
            __html: product.bodyHtml || product.excerpt,
          }}
        />
      </CardContent>

      {isFetching && (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {product.related && (
        <Grid container spacing={4}>
          {product.related.map((id) => (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <Product id={id} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ProductDetails;
