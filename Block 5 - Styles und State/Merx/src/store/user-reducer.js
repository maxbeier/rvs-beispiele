import { LOGIN_USER, LOGOUT_USER } from './actions';

const initialUserState = {
  // isLoggedIn: false,
  isLoggedIn: true,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return { isLoggedIn: true };
    }
    case LOGOUT_USER: {
      return { isLoggedIn: false };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
