import { USER_LOGIN, USER_LOGOUT } from './actions';

const initialUserState = {
  // isLoggedIn: false,
  isLoggedIn: true,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return { isLoggedIn: true };
    }
    case USER_LOGOUT: {
      return { isLoggedIn: false };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
