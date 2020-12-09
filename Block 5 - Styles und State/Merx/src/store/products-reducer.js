import {
  PRODUCTS_LOAD,
  PRODUCTS_ERROR,
  PRODUCTS_LOADED,
  PRODUCT_LOAD,
  PRODUCT_ERROR,
  PRODUCT_LOADED,
} from './actions';

const initialState = {
  isLoading: false,
  error: null,
  data: {},
  // vorher: [{ id: '1' }, { id: '2' }, { id: '3' }]
  // nacher: { 1: { id: '1' }, 2: { id: '2' }, 3: { id: '3' } }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOAD: {
      return { ...state, isLoading: true };
    }

    case PRODUCTS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case PRODUCTS_LOADED: {
      const productMap = action.payload.reduce(
        (obj, p) => ((obj[p.id] = p), obj), // eslint-disable-line no-sequences
        {},
      );
      return { isLoading: false, data: { ...productMap, ...state.data } };
    }

    case PRODUCT_LOAD: {
      const newProduct = {
        [action.id]: { ...state.data[action.id], isLoading: true },
      };
      return { ...state, data: { ...state.data, ...newProduct } };
    }

    case PRODUCT_ERROR: {
      const newProduct = {
        [action.id]: {
          ...state.data[action.id],
          isLoading: false,
          error: action.payload,
        },
      };
      return { ...state, data: { ...state.data, ...newProduct } };
    }

    case PRODUCT_LOADED: {
      const newProduct = { [action.id]: action.payload };
      return { ...state, data: { ...state.data, ...newProduct } };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
