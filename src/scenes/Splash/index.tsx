import * as React from 'react';
import { NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { hasNetworkError, getActiveCourse } from 'services/selectors';
import images from 'assets/images';
import * as exceptions from 'services/exceptions';
import { GSContainer, GSLogo, GSVersion } from './index.styles';
import { exitApp, alertConnection } from 'helpers';
import * as starter from 'services/starter';
import VersionNumber from 'react-native-version-number';
import { Dispatch } from 'redux';
import { IInitialState } from 'services/reducers';
import { ICourse } from 'services/courses';
import { Analytics, Messaging } from 'config/firebase';

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
// const fetchDelayTime = 1000;

const logos = [images.logo.arabic, images.logo.syriac, images.logo.english];
const logo = logos[Math.floor(Math.random() * logos.length)];

class Splash extends React.Component<IProps, IState> {
  private messageListener;

  static navigationOptions = {
    header: null
  };

  state = {
    hasAlert: false,
    isConnected: false
  };

  private handleFirstConnectivityChange = isConnected => {
    this.setState(
      {
        isConnected
      },
      () => {
        if (!isConnected) {
          this.props.addException({
            name: 'NETWORK_ERROR',
            message: 'Not connected to the internet',
            report: false
          });
        } else if (isConnected) {
          this.props.firstFetch();
        }
        // NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
      }
    );
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

  componentDidMount() {
    Analytics.setAnalyticsCollectionEnabled(true);

    Analytics.setCurrentScreen(this.constructor.name);

    this.messageListener = Messaging.onMessage(res => {
      console.warn('Message received', res);
    });
    this.checkConnection();
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.props.firstFetch();
      } else {
      }
    });
  }

  componentDidUpdate(_, prevState: Partial<IState>) {
    if (this.state.isConnected && !prevState.isConnected) {
      // Force close alert before calling this function
      this.props.firstFetch();
    }
  }

  componentWillUnmount() {
    this.messageListener();
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
  }

  checkConnection = () => {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);
  };

  componentWillReceiveProps(newProps: Partial<IProps>) {
    if (newProps.hasNetworkError && !this.props.activeCourse) {
      this.alertConnection();
    }
  }

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
  addException: (payload: exceptions.IExceptionPayload) => dispatch(exceptions.actions.add(payload))
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  hasNetworkError: hasNetworkError(state),
  activeCourse: getActiveCourse(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
