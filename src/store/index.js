import { createStore, applyMiddleware, compose, } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function initializeStore() {
  const currentUser = null;
  const store = createStore(
    reducers,
    { currentUser, },
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
