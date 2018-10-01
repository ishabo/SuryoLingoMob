import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootSagas from './sagas';
import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import { Platform } from 'react-native';
import storage from 'redux-persist/es/storage';

import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

let storeInstance;

const config = {
  storage,
  key: 'root',
  // stateReconciler: true,
  blacklist: ['api', 'nav', 'exceptions', 'signon']
};

const reducer = persistReducer(config, rootReducer);

interface IContainsDevtools {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => void;
}

const hasDevTools = (item: IContainsDevtools | Window): item is IContainsDevtools => {
  return (<IContainsDevtools>item).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== undefined;
};

/**
 * Redux/Sagas Store configuration
 *
 * @class Store
 */

export default class Store {
  private store: any;
  private sagaMiddleware = createSagaMiddleware();

  constructor() {
    this.configure();
  }

  public getStore() {
    this.sagaMiddleware.run(rootSagas);
    return this.store;
  }

  public persistStore() {
    return persistStore(this.store);
  }

  private configure() {
    const reactNavMiddleWare = createReactNavigationReduxMiddleware('root', state => state.nav);

    const middlewares = applyMiddleware(this.sagaMiddleware, reduxImmutableStateInvariant(), reactNavMiddleWare);

    let composeEnhancers = compose;

    if (__DEV__) {
      composeEnhancers =
        (hasDevTools(window) && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        composeWithDevTools({
          name: Platform.OS,
          ...require('../../package.json').remotedev
        });
    }

    const enhancer = composeEnhancers(middlewares);

    this.store = createStore(reducer, enhancer);
  }
}

export const getStoreInstance = () => {
  if (!storeInstance) {
    storeInstance = new Store();
  }

  return storeInstance;
};
