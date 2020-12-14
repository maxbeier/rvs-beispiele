import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { makeStyles } from '@material-ui/core/styles';

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

const Product = ({
  id,
  image,
  title,
  excerpt,
  price,
  isLoggedIn,
  toggleFavourite,
  isFavourite,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <RouteLink to={`/products/${id}`}>
        <CardMedia className={classes.cardMedia} image={image} title={title} />
      </RouteLink>
      <CardContent className={classes.cardContent}>
        <Link component={RouteLink} to={`/products/${id}`}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </Link>
        <Typography>{excerpt}</Typography>
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
        <Typography>{price}</Typography>
      </CardActionsSt>
    </Card>
  );
};

Product.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  price: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  toggleFavourite: PropTypes.func,
  isFavourite: PropTypes.bool,
};

export default Product;
