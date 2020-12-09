export const selectFavouriteProducts = (state) =>
  state.products.filter((product) => state.favourites.includes(product.id));

export const selectIsFavourite = (id) => (state) =>
  state.favourites.some((favId) => favId === id);
