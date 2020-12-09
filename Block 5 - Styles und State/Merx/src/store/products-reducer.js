import { PRODUCTS_ADD, PRODUCTS_REMOVE } from './actions';
import products from '../products.json';

const initialState = products;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case FAVOURITE_ADD: {
    //   return [...state, action.id];
    // }

    // case FAVOURITE_REMOVE: {
    //   return state.filter((id) => id !== action.id);
    // }

    // case FAVOURITE_REMOVE_ALL: {
    //   return [];
    // }

    default: {
      return state;
    }
  }
};

export default reducer;
