import '../config/reactotron';
import React from 'react';
import { I18nManager, View } from 'react-native';
import { Provider } from 'react-redux';
import Routes from '../routes';
import Store from '../services/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { setOrigin as setApiOrigin } from '../services/api';
import {
  setCustomText,
} from 'react-native-global-props';

setApiOrigin('http://localhost:3000');

setCustomText({
  style: {
    fontFamily: 'FontAwesome',
  },
});

I18nManager.forceRTL(true);

const reduxStore = new Store();
const store = reduxStore.getStore();
const persistor = reduxStore.persistStore();

export default class extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}
          loading={<View />}
        >
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}	
