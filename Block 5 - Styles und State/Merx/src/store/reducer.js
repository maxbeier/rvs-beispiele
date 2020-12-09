import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user-reducer';
import favouritesReducer from './favourites-reducer';
import productsReducer from './products-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favourites', 'user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  favourites: favouritesReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
