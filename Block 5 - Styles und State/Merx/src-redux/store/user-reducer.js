import { USER_LOAD, USER_ERROR, USER_LOADED, USER_LOGOUT } from './actions';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOAD: {
      return { isLoggedIn: false, isLoading: true };
    }
    case USER_ERROR: {
      return { isLoggedIn: false, isLoading: false, error: action.payload };
    }
    case USER_LOADED: {
      return { isLoggedIn: true, isLoading: false, ...action.payload };
    }
    case USER_LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
