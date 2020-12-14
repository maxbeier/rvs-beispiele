import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ConnectedProduct from './ConnectedProduct';
import { useFavs } from './FavouritesContext';

const Favourites = () => {
  const { favourites, removeAll } = useFavs();

  if (!favourites.length) {
    return <h1>Aktuell keine Favoriten vorhanden</h1>;
  }

  return (
    <>
      <h1>
        Favourites{' '}
        <Button onClick={removeAll} color="primary" variant="outlined">
          Lösche alle Favoriten
        </Button>
      </h1>
      <Grid container spacing={4}>
        {favourites.map((id) => (
          <Grid item key={id} xs={12} sm={6} md={4}>
            <ConnectedProduct id={id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Favourites;
