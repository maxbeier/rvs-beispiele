import { PRODUCTS_ADD, PRODUCTS_REMOVE } from './actions';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // TOOD
    // case PRODUCTS_LOADING: {
    //   return ???
    // }

    // case PRODUCTS_SUCCESS: {
    //   return ???
    // }

    // case PRODUCTS_ERROR: {
    //   return ???
    // }

    default: {
      return state;
    }
  }
};

export default reducer;
