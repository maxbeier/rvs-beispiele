import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import { FAVOURITE_REMOVE_ALL } from './store/actions';

const Favourites = () => {
  const dispatch = useDispatch();
  const emptyFavourite = () => dispatch({ type: FAVOURITE_REMOVE_ALL });
  const favIds = useSelector((state) => state.favourites);

  if (!favIds.length) {
    return <h1>Aktuell keine Favoriten vorhanden</h1>;
  }

  return (
    <>
      <h1>
        Favourites{' '}
        <Button onClick={emptyFavourite} color="primary" variant="outlined">
          Lösche alle Favoriten
        </Button>
      </h1>
      <Grid container spacing={4}>
        {favIds.map((id) => (
          <Grid item key={id} xs={12} sm={6} md={4}>
            <Product id={id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Favourites;
