import * as tslib_1 from "tslib";
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
import { Analytics, Messaging } from 'config/firebase';
import config from 'config';
const { isWorkingOffline } = config;
const alertDelayTime = 1000;
const logos = [images.logo.arabic, images.logo.syriac, images.logo.english];
const logo = logos[Math.floor(Math.random() * logos.length)];
class Splash extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasAlert: false,
            isConnected: false,
        };
        this.handleFirstConnectivityChange = (isConnected) => {
            this.setState({ isConnected }, () => {
                if (!isConnected) {
                    this.props.addException({
                        name: 'NETWORK_ERROR',
                        message: 'Not connected to the internet',
                        report: false,
                    });
                }
                else if (isConnected) {
                    this.props.firstFetch();
                }
                NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
            });
        };
        this.setAlertDismissed = () => {
            this.setState({ hasAlert: false });
        };
        this.firstFetch = () => {
            this.setAlertDismissed();
            this.props.firstFetch();
        };
        this.alertConnection = () => {
            if (this.state.hasAlert) {
                return;
            }
            setTimeout(() => {
                this.setState({ hasAlert: true }, () => {
                    alertConnection(() => {
                        this.setState({ hasAlert: false }, this.alertConnection);
                    }, exitApp, this.setAlertDismissed);
                });
            }, alertDelayTime);
        };
        this.checkConnection = () => {
            NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);
        };
    }
    componentDidMount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            Analytics.setCurrentScreen(this.constructor.name);
            this.messageListener = Messaging.onMessage(res => {
                console.warn('Message received', res);
            });
            if (!isWorkingOffline) {
                Analytics.setAnalyticsCollectionEnabled(true);
            }
            if (!isWorkingOffline) {
                this.checkConnection();
                if (yield NetInfo.isConnected.fetch()) {
                    this.props.firstFetch();
                }
                else {
                }
            }
            else {
                this.props.firstFetch();
            }
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isConnected && !prevState.isConnected) {
            // Force close alert before calling this function
            this.props.firstFetch();
        }
        if (this.props.hasNetworkError &&
            !prevProps.activeCourse &&
            !isWorkingOffline) {
            this.alertConnection();
        }
    }
    componentWillUnmount() {
        this.messageListener();
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
    }
    render() {
        return (React.createElement(GSContainer, null,
            React.createElement(GSLogo, { source: logo }),
            React.createElement(GSVersion, null,
                "v",
                VersionNumber.appVersion)));
    }
}
Splash.navigationOptions = {
    header: null,
};
const mapDispatchToProps = (dispatch) => ({
    firstFetch: () => dispatch(starter.actions.firstFetch()),
    addException: (payload) => dispatch(exceptions.actions.add(payload)),
});
const mapStateToProps = (state) => ({
    hasNetworkError: hasNetworkError(state),
    activeCourse: getActiveCourse(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
//# sourceMappingURL=index.js.map