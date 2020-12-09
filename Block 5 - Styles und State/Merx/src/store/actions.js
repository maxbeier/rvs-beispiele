export const FAVOURITE_ADD = 'FAVOURITE_ADD';
export const FAVOURITE_REMOVE = 'FAVOURITE_REMOVE';
export const FAVOURITE_REMOVE_ALL = 'FAVOURITE_REMOVE_ALL';

export const USER_LOAD = 'USER_LOAD';
export const USER_ERROR = 'USER_ERROR';
export const USER_LOADED = 'USER_LOADED';
export const USER_LOGOUT = 'USER_LOGOUT';

export const login = (credentials) => (dispatch) => {
  const body = JSON.stringify(credentials);
  const headers = { 'Content-Type': 'application/json; charset=UTF-8' };

  dispatch({ type: USER_LOAD });

  fetch('http://localhost:3001/login', { method: 'POST', headers, body })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) dispatch({ type: USER_LOADED, payload: json.data });
      else dispatch({ type: USER_ERROR, payload: json.error });
    });
};
