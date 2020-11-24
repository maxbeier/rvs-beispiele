import styled from 'styled-components';
// import Link from '@material-ui/core/Link';
import {
  Link,
  useLocation,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
// import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { makeStyles } from '@material-ui/core/styles';
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

const Product = (props = {}) => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const id = props.id || params.id;
  const { image, title, body, price } = products.find(
    (product) => product.id === id,
  );
  const onClick = () => history.push(`/products/${+id + 1}`);

  return (
    <Card className={classes.card}>
      <Link to={`/products/${id}`}>
        <CardMedia className={classes.cardMedia} image={image} title={title} />
      </Link>
      <CardContent className={classes.cardContent}>
        <Link to={`/products/${id}`}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </Link>
        <Typography>{body}</Typography>
      </CardContent>
      <CardActionsSt>
        <IconButton onClick={onClick} color="primary">
          <FavoriteBorderOutlinedIcon color="primary" />
        </IconButton>
        <Typography>{price}</Typography>
      </CardActionsSt>
    </Card>
  );
};

export default Product;
