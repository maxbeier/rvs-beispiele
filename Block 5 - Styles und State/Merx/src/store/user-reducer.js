import { USER_LOADING, USER_ERROR, USER_SUCCESS, USER_LOGOUT } from './actions';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING: {
      return { isLoggedIn: false, isLoading: true };
    }
    case USER_ERROR: {
      return { isLoggedIn: false, isLoading: false, error: action.payload };
    }
    case USER_SUCCESS: {
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
