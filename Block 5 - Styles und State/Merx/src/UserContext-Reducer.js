import React from 'react';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOAD': {
      return { isLoggedIn: false, isLoading: true };
    }
    case 'USER_ERROR': {
      return { isLoggedIn: false, isLoading: false, error: action.payload };
    }
    case 'USER_LOADED': {
      return { isLoggedIn: true, isLoading: false, ...action.payload };
    }
    case 'USER_LOGOUT': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const login = (credentials, dispatch) => {
  const body = JSON.stringify(credentials);
  const headers = { 'Content-Type': 'application/json; charset=UTF-8' };

  dispatch({ type: 'USER_LOAD' });

  fetch('http://localhost:3001/login', { method: 'POST', headers, body })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) dispatch({ type: 'USER_LOADED', payload: json.data });
      else dispatch({ type: 'USER_ERROR', payload: json.error });
    });
};

const UserContext = React.createContext();

export const useUser = () => React.useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(initialState);

  const [state, dispatch] = React.useReducer(userReducer, initialState);

  const contextValue = {
    ...state,
    dispatch,
    login,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
