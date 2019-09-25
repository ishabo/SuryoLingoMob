import * as React from "react";
import { I18nManager } from "react-native";
import { Provider } from "react-redux";
import Navigation from "./Navigation";
import { setStore, setCrashReporter } from "../services/exceptions";
import { setApiOrigin } from "../services/api";
import RNRestart from "react-native-restart";
import { PersistGate } from "redux-persist/lib/integration/react";
import GlobalFont from "react-native-global-font";

import config from "@sl/config";
import { Alert } from "@sl/components";
import { getFont } from "@sl/assets/fonts";
import { logError } from "@sl/helpers";
import { getStoreInstance } from "../services/store";

setCrashReporter(logError);
setApiOrigin(config.apiHost);

I18nManager.forceRTL(true);

const reduxStore = getStoreInstance();
const store = reduxStore.getStore();
const persistor = reduxStore.persistStore();

setStore(store);

export default class App extends React.Component {
  componentDidMount() {
    GlobalFont.applyGlobal(getFont("cl-ara", "regular"));

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
