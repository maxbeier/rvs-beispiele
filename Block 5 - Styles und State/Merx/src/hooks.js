import React from 'react';

const safeJsonParse = (string) => {
  try {
    return JSON.parse(string);
  } catch {
    return string;
  }
};

export function useLocalStorageState(key, defaultValue) {
  const [state, setState] = React.useState(
    () => safeJsonParse(window.localStorage.getItem(key)) || defaultValue,
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}
