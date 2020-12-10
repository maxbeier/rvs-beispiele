import React from 'react';
import { useMutation } from 'react-query';
import { useLocalStorageState } from './hooks';

export const loginMutation = (credentials) => {
  const body = JSON.stringify(credentials);
  const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
  return fetch('http://localhost:3001/login', {
    method: 'POST',
    headers,
    body,
  }).then((response) => response.json());
  // .then((json) => {
  //   if (json.success) return json.data;
  //   else throw new Error(json.error);
  // });
};

const UserContext = React.createContext();

export const useUser = () => React.useContext(UserContext);

// TODO: loginMutation sollte resolven/rejected und entsprechend react-query
// TODO: Login funktioniert nicht mit geöffneten DevTools

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorageState('login', false);
  const [login, { isLoading, error, data }] = useMutation(loginMutation, {
    onSuccess: (json) => setIsLoggedIn(json.success),
  });
  const logout = () => setIsLoggedIn(false);

  const contextValue = {
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
    ...data?.data,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
