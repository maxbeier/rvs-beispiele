import React from 'react';
import { useLocalStorageState } from './hooks';

const defaultValue = [];
const FavouritesContext = React.createContext();

export const useFavs = () => React.useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorageState(
    'favourites',
    defaultValue,
  );

  const add = (id) => setFavourites([...favourites, id]);
  const remove = (id) =>
    setFavourites(favourites.filter((favId) => favId !== id));
  const removeAll = () => setFavourites(defaultValue);
  const isFavourite = (id) => favourites.some((favId) => favId === id);
  const toggleFavourite = (id) => (isFavourite(id) ? remove : add)(id);

  const contextValue = {
    favourites,
    add,
    remove,
    removeAll,
    isFavourite,
    toggleFavourite,
  };

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};
