import 'config/reactotron';
import React from 'react';
import { I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './Navigation';
import Store from 'services/store';
import * as exceptions from 'services/exceptions';
import Fabric from 'react-native-fabric';
import RNRestart from 'react-native-restart';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { setApiOrigin } from 'services/api';
import { setCustomText } from 'react-native-global-props';
import config from 'config/';
import { Alert, Loading } from 'components';

const { Crashlytics } = Fabric;

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
exceptions.setCrashReporter(Crashlytics);

export default class App extends React.Component {

  componentWillMount () {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
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
