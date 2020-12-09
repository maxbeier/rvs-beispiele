import React from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { FAVOURITE_ADD, FAVOURITE_REMOVE } from './store/actions';
import { selectIsFavourite, selectProductById } from './store/selectors';
import { loadProduct } from './store/actions';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
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

const Product = ({ id }) => {
  const classes = useStyles();

  const { isLoggedIn } = useSelector((state) => state.user);
  const isFavourite = useSelector(selectIsFavourite(id));
  const dispatch = useDispatch();
  const addFavourite = () => dispatch({ type: FAVOURITE_ADD, id });
  const removeFavourite = () => dispatch({ type: FAVOURITE_REMOVE, id });
  const toggleFavourite = isFavourite ? removeFavourite : addFavourite;

  const { isLoading, error, data: product } = useQuery(`products/${id}`);

  if (!product || isLoading)
    return (
      <Box textAlign="center" mt={2}>
        <CircularProgress />
      </Box>
    );

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <Card className={classes.card}>
      <RouteLink to={`/products/${id}`}>
        <CardMedia
          className={classes.cardMedia}
          image={product.image}
          title={product.title}
        />
      </RouteLink>
      <CardContent className={classes.cardContent}>
        <Link component={RouteLink} to={`/products/${id}`}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
        </Link>
        <Typography>{product.excerpt}</Typography>
      </CardContent>
      <CardActionsSt>
        {isLoggedIn ? (
          <IconButton onClick={toggleFavourite} color="primary">
            {isFavourite ? (
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
    </Card>
  );
};

export default Product;
