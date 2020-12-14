import React from 'react';
import { useMutation } from 'react-query';
import { useLocalStorageState } from './hooks';

export const loginMutation = (credentials) => {
  const body = JSON.stringify(credentials);
  const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
  const options = { method: 'POST', headers, body };
  return fetch('http://localhost:3001/login', options)
    .then((response) => response.json())
    .then((json) => {
      if (json.success) return json.data;
      throw json.error;
    });
};

const UserContext = React.createContext();

export const useUser = () => React.useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorageState('login', false);
  const onSuccessRef = React.useRef();
  const [login, { isLoading, error, data }] = useMutation(loginMutation, {
    onSuccess: onSuccessRef.current,
  });
  const logout = () => setIsLoggedIn(false);
  onSuccessRef.current = () => setIsLoggedIn(true);

  const contextValue = {
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
    ...data,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
