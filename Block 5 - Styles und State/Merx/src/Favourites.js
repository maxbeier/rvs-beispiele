import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import { FAVOURITE_REMOVE_ALL } from './store/actions';

const Favourites = ({ favourites, products }) => {
  const dispatch = useDispatch();
  const emptyFavourite = () => dispatch({ type: FAVOURITE_REMOVE_ALL });

  if (!favourites.length) {
    return <h1>Aktuell keine Favoriten vorhanden</h1>;
  }

  const filteredProducts = products.filter((product) =>
    favourites.includes(product.id),
  );

  return (
    <Grid container spacing={4}>
      <h1>
        Favourites{' '}
        <Button onClick={emptyFavourite} color="primary" variant="outlined">
          Lösche alle Favoriten
        </Button>
      </h1>
      {filteredProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Product {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Favourites;
