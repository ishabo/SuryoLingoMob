import 'config/reactotron';
import React from 'react';
import { I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './Navigation';
import Loading from './Loading';
import Store from 'services/store';
import * as exceptions from 'services/exceptions';

import { PersistGate } from 'redux-persist/lib/integration/react';
import { setApiOrigin } from 'services/api';
import { setCustomText } from 'react-native-global-props';
import config from 'config/';
import Alert from 'components/Alert';

setApiOrigin(config.apiHost);
setCustomText({
  style: {
    fontFamily: 'FontAwesome',
  },
});

I18nManager.forceRTL(true);

const reduxStore = new Store();
const store = reduxStore.getStore();
const persistor = reduxStore.persistStore();
exceptions.setStore(store);

export default class App extends React.Component {

  componentWillMount () {
    I18nManager.forceRTL(true);
  }

  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Loading />
          <Navigation />
          <Alert />
        </PersistGate>
      </Provider>
    );
  }
}
