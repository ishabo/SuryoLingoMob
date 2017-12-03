import '../config/reactotron';
import React from 'react';
import { I18nManager, View } from 'react-native';
import { Provider } from 'react-redux';
import Routes from '../routes';
import Store from '../services/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {
  setCustomText,
} from 'react-native-global-props';
// import fonts from '../assets/fonts';

setCustomText({
  style: {
    fontFamily: 'FontAwesome',
  }
});

I18nManager.forceRTL(true);

const ReduxStore = new Store();
const store = ReduxStore.getStore();
const persistor = ReduxStore.persistStore();

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
