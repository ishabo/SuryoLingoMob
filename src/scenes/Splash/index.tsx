import React from 'react';
import { NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { hasNetworkError } from 'services/selectors';
import { NavigationScreenProp } from 'react-navigation';
import images from 'assets/images';
import * as exceptions from 'services/exceptions';
import { GSContainer, GSLogo, GSVersion } from './index.styles';
import { exitApp, alertConnection } from 'helpers';
import * as starter from 'services/starter';
import VersionNumber from 'react-native-version-number';

export interface IProps {
  navigation: NavigationScreenProp<any, any>;
  firstFetch: () => void;
  addException: (payload: exceptions.IExceptionPayload) => void;
  hasNetworkError: () => boolean;
}

interface IState {
  hasAlert: boolean;
}

const alertDelayTime = 1000;
const fetchDelayTime = 1000;
class Splash extends React.Component<IProps, IState> {

  static navigationOptions = {
    header: null,
  };

  state = {
    hasAlert: false,
  };

  private handleFirstConnectivityChange = (isConnected) => {
    if (!isConnected) {
      this.props.addException({
        name: 'NETWORK_ERROR',
        message: 'Not connected to the internet',
        report: false,
      });
    } else if (isConnected) {
      this.props.firstFetch();
    }

    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );
  }

  setAlertDismissed = () => {
    this.setState({ hasAlert: false });
  }

  alertConnection = () => {

    console.warn(this.state.hasAlert);

    if (this.state.hasAlert) {
      return;
    }

    setTimeout(() => {
      this.setState({ hasAlert: true }, () => {
        alertConnection(this.props.firstFetch, exitApp, this.setAlertDismissed);
      });
    },         alertDelayTime);
  }

  componentDidMount () {
    setTimeout(this.props.firstFetch, fetchDelayTime);
    setTimeout(this.checkConnection, alertDelayTime);
  }

  checkConnection = () => {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );
  }

  componentWillReceiveProps () {
    if (this.props.hasNetworkError) {
      this.alertConnection();
    }
  }

  render () {
    return (
      <GSContainer>
        <GSLogo source={images.logo.splash} />
        <GSVersion>v{VersionNumber.appVersion}</GSVersion>
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  firstFetch: () => dispatch(starter.actions.firstFetch()),
  addException: (payload: exceptions.IExceptionPayload) =>
    dispatch(exceptions.actions.add(payload)),
});

const mapStateToProps = (state: any) => ({
  hasNetworkError: hasNetworkError(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
