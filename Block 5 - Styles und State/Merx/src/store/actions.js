export const FAVOURITE_ADD = 'FAVOURITE_ADD';
export const FAVOURITE_REMOVE = 'FAVOURITE_REMOVE';
export const FAVOURITE_REMOVE_ALL = 'FAVOURITE_REMOVE_ALL';

export const USER_LOAD = 'USER_LOAD';
export const USER_ERROR = 'USER_ERROR';
export const USER_LOADED = 'USER_LOADED';
export const USER_LOGOUT = 'USER_LOGOUT';

export const PRODUCTS_LOAD = 'PRODUCTS_LOAD';
export const PRODUCTS_ERROR = 'PRODUCTS_ERROR';
export const PRODUCTS_LOADED = 'PRODUCTS_LOADED';

export const PRODUCT_LOAD = 'PRODUCT_LOAD';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';
export const PRODUCT_LOADED = 'PRODUCT_LOADED';

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

export const loadProducts = (dispatch) => {
  dispatch({ type: PRODUCTS_LOAD });

  fetch('http://localhost:3001/products')
    .then((response) => response.json())
    .then((json) => {
      if (json.success) dispatch({ type: PRODUCTS_LOADED, payload: json.data });
      else dispatch({ type: PRODUCTS_ERROR, payload: json.error });
    });
};

export const loadProduct = (id) => (dispatch) => {
  dispatch({ type: PRODUCT_LOAD, id });

  fetch(`http://localhost:3001/products/${id}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.success)
        dispatch({ type: PRODUCT_LOADED, id, payload: json.data });
      else dispatch({ type: PRODUCT_ERROR, id, payload: json.error });
    });
};
