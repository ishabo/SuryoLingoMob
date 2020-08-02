import * as React from 'react';
import NetInfo from '@react-native-community/netinfo';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import { connect } from 'react-redux';
import { hasNetworkError, getActiveCourse } from '@sl/services/selectors';
import images from '@sl/assets/images';
import * as exceptions from '@sl/services/exceptions';
import { GSContainer, GSLogo, GSVersion } from './index.styles';
import { exitApp, alertConnection } from '@sl/helpers';
import * as starter from '@sl/services/starter';
import VersionNumber from 'react-native-version-number';
import { Dispatch } from 'redux';
import { IInitialState } from '@sl/services/reducers';
import { ICourse } from '@sl/services/courses';
import config from '@sl/config';

const { isWorkingOffline } = config;

export interface IProps {
  hasNetworkError: boolean;
  activeCourse: ICourse;
  firstFetch: () => void;
  addException: (payload: exceptions.IExceptionPayload) => void;
}

interface IState {
  hasAlert: boolean;
  isConnected: boolean;
}

const alertDelayTime = 1000;

const logos = [images.logo.arabic, images.logo.syriac, images.logo.english];
const logo = logos[Math.floor(Math.random() * logos.length)];

class Splash extends React.Component<IProps, IState> {
  private messageListener;

  static navigationOptions = {
    header: null,
  };

  state = {
    hasAlert: false,
    isConnected: false,
  };

  private handleFirstConnectivityChange = (isConnected: boolean) => {
    this.setState({ isConnected }, () => {
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
        this.handleFirstConnectivityChange
      );
    });
  };

  setAlertDismissed = () => {
    this.setState({ hasAlert: false });
  };

  firstFetch = () => {
    this.setAlertDismissed();
    this.props.firstFetch();
  };

  alertConnection = () => {
    if (this.state.hasAlert) {
      return;
    }

    setTimeout(() => {
      this.setState({ hasAlert: true }, () => {
        alertConnection(
          () => {
            this.setState({ hasAlert: false }, this.alertConnection);
          },
          exitApp,
          this.setAlertDismissed
        );
      });
    }, alertDelayTime);
  };

  async componentDidMount() {
    analytics().setCurrentScreen(this.constructor.name);

    this.messageListener = messaging().onMessage((res) => {
      console.warn('Message received', res);
    });

    if (!isWorkingOffline) {
      analytics().setAnalyticsCollectionEnabled(true);
    }

    if (!isWorkingOffline) {
      this.checkConnection();
      if (await NetInfo.isConnected.fetch()) {
        this.props.firstFetch();
      } else {
      }
    } else {
      this.props.firstFetch();
    }
  }

  componentDidUpdate(prevProps: Partial<IProps>, prevState: Partial<IState>) {
    if (this.state.isConnected && !prevState.isConnected) {
      // Force close alert before calling this function
      this.props.firstFetch();
    }

    if (
      this.props.hasNetworkError &&
      !prevProps.activeCourse &&
      !isWorkingOffline
    ) {
      this.alertConnection();
    }
  }

  componentWillUnmount() {
    this.messageListener();
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  checkConnection = () => {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  };

  render() {
    return (
      <GSContainer>
        <GSLogo source={logo} />
        <GSVersion>v{VersionNumber.appVersion}</GSVersion>
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  firstFetch: () => dispatch(starter.actions.firstFetch()),
  addException: (payload: exceptions.IExceptionPayload) =>
    dispatch(exceptions.actions.add(payload)),
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  hasNetworkError: hasNetworkError(state),
  activeCourse: getActiveCourse(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
