import { combineReducers } from 'redux';

import userReducer from './user-reducer';
import favouritesReducer from './favourites-reducer';

const rootReducer = combineReducers({
  user: userReducer,
  favourites: favouritesReducer,
});

export default rootReducer;
