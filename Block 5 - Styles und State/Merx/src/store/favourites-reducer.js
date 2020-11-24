import { ADD_FAVOURITE, REMOVE_FAVOURITE, EMPTY_FAVOURITE } from './actions';

const initialFavouritesState = [];

const favouritesReducer = (state = initialFavouritesState, action) => {
  switch (action.type) {
    case ADD_FAVOURITE: {
      return [...state, action.id];
    }

    case REMOVE_FAVOURITE: {
      return state.filter((id) => id !== action.id);
    }

    case EMPTY_FAVOURITE: {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default favouritesReducer;
