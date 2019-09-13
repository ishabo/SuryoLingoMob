import * as React from 'react';
import { I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './Navigation';
import { setStore, setCrashReporter } from '../services/exceptions';
import { setApiOrigin } from '../services/api';
import RNRestart from 'react-native-restart';
import { PersistGate } from 'redux-persist/lib/integration/react';
import GlobalFont from 'react-native-global-font';
import config from 'config/';
import { Alert } from 'components';
import { getFont } from 'assets/fonts';
import { logError } from 'helpers';
import { getStoreInstance } from '../services/store';
setCrashReporter(logError);
setApiOrigin(config.apiHost);
I18nManager.forceRTL(true);
const reduxStore = getStoreInstance();
const store = reduxStore.getStore();
const persistor = reduxStore.persistStore();
setStore(store);
export default class App extends React.Component {
    componentDidMount() {
        GlobalFont.applyGlobal(getFont('cl-ara', 'regular'));
        if (!I18nManager.isRTL) {
            I18nManager.forceRTL(true);
            RNRestart.Restart();
        }
    }
    render() {
        return (React.createElement(Provider, { store: store },
            React.createElement(PersistGate, { persistor: persistor, loading: null },
                React.createElement(Navigation, null),
                React.createElement(Alert, null))));
    }
}
//# sourceMappingURL=index.js.map