import {createStore, applyMiddleware, compose} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { isTokenExpiredError, resetTokenAndReattemptRequest } from './utils/user';

import reducer from './reducers';
/* axios.create({
    baseURL: 'http://soc/api/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  }); */

/*   axios.interceptors.response.use(null, (error) => {
    if (isTokenExpiredError()) {
      return resetTokenAndReattemptRequest(error);
    }
    return Promise.reject(error);
  });
  const apiMiddlewareDefault = [axiosMiddleware(axios)];

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...apiMiddlewareDefault),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
   const store = createStore(
    reducer,
    compose(
      applyMiddleware(...apiMiddlewareDefault),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
store.subscribe(() => {
    console.log(store.getState(), "GET STATE");

}); */
const store = createStore(
    reducer
);
export default store;
