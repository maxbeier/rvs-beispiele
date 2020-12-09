import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import { Link as RouteLink, useParams } from 'react-router-dom';
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
import products from './products.json';

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

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  favourites: state.favourites,
});

const mapDispatchToProps = (dispatch) => ({
  addFavourite: (id) => dispatch({ type: FAVOURITE_ADD, id }),
  removeFavourite: (id) => dispatch({ type: FAVOURITE_REMOVE, id }),
});

const Product = (props = {}) => {
  const classes = useStyles();
  const params = useParams();

  const id = props.id || params.id;
  const product = products.find((product) => product.id === id);
  const { isLoggedIn, favourites, addFavourite, removeFavourite } = props;

  const isFavourite = favourites.some((id) => id === product.id);

  const toggleFavourite = (product) => {
    if (isFavourite) removeFavourite(product.id);
    else addFavourite(product.id);
  };

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
        <Typography>{product.body}</Typography>
      </CardContent>
      <CardActionsSt>
        {isLoggedIn ? (
          <IconButton onClick={() => toggleFavourite(product)} color="primary">
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
