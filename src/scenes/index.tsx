import * as React from 'react';
import { I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './Navigation';
import Store from '../services/store';
import { setStore } from '../services/exceptions';
import { setApiOrigin } from '../services/api';
// import Fabric from 'react-native-fabric';
import RNRestart from 'react-native-restart';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { setCustomText } from 'react-native-global-props';
import config from 'config/';
import { Alert } from 'components';
import { getFont } from 'assets/fonts';

// const { Crashlytics } = Fabric;

setApiOrigin(config.apiHost());
setCustomText({
  style: {
    fontFamily: getFont('cl-ara', 'regular')
  }
});

I18nManager.forceRTL(true);

const reduxStore = new Store();
const store = reduxStore.getStore();
const persistor = reduxStore.persistStore();

setStore(store);

export default class App extends React.Component {
  componentWillMount() {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Navigation />
          <Alert />
        </PersistGate>
      </Provider>
    );
  }
}
