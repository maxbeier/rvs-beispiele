import {
  FAVOURITE_ADD,
  FAVOURITE_REMOVE,
  FAVOURITE_REMOVE_ALL,
} from './actions';

const initialFavouritesState = ['1', '2', '3'];

const favouritesReducer = (state = initialFavouritesState, action) => {
  switch (action.type) {
    case FAVOURITE_ADD: {
      return [...state, action.id];
    }

    case FAVOURITE_REMOVE: {
      return state.filter((id) => id !== action.id);
    }

    case FAVOURITE_REMOVE_ALL: {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default favouritesReducer;
