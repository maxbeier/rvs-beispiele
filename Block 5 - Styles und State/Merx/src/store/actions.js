export const FAVOURITE_ADD = 'FAVOURITE_ADD';
export const FAVOURITE_REMOVE = 'FAVOURITE_REMOVE';
export const FAVOURITE_REMOVE_ALL = 'FAVOURITE_REMOVE_ALL';

export const USER_LOADING = 'USER_LOADING';
export const USER_ERROR = 'USER_ERROR';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';

// TODO Actions für LOADING, ERROR und SUCCESS
export const PRODUCTS_ADD = 'PRODUCTS_ADD';

export const login = (credentials) => (dispatch) => {
  const body = JSON.stringify(credentials);
  const headers = { 'Content-Type': 'application/json; charset=UTF-8' };

  dispatch({ type: USER_LOADING });

  fetch('http://localhost:3001/login', { method: 'POST', headers, body })
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) dispatch({ type: USER_ERROR, payload: json.error });
      else dispatch({ type: USER_SUCCESS, payload: json.data });
    });
};

export const loadProducts = () => (dispatch) => {
  dispatch({ type: /* ??? */ });

  fetch('http://localhost:3001/products')
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) dispatch({ type: /* ??? */, payload: json.error });
      else dispatch({ type: /* ??? */, payload: json.data });
    });
};
