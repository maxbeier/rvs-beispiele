export const selectIsFavourite = (id) => (state) =>
  state.favourites.some((favId) => favId === id);

export const selectProductById = (id) => (state) => state.products.data[id];
