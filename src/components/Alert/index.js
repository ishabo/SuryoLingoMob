import * as React from 'react';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import { connect } from 'react-redux';
import I18n from 'I18n';
import { getLatestException } from 'services/selectors';
import config from 'config';
import * as signon from 'services/signon';
import * as exceptions from 'services/exceptions';
const durationToHide = 2000;
let doAlert = true;
let title;
let message;
let alertType = 'warning';
class Alert extends React.Component {
    componentDidMount() {
        MessageBarManager.registerMessageBar(this.alert);
    }
    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }
    componentWillReceiveProps(nextProps) {
        const exception = nextProps.lastException;
        if (exception) {
            alertType = config.alerts[exception.name] ? config.alerts[exception.name].alertType : 'error';
            title = I18n.t(`alert.${exception.name}.title`);
            message = I18n.t(`alert.${exception.name}.message`);
            doAlert = !exception.silent;
            if (exception.name === 'INVALID_TOKEN') {
                this.props.signout();
            }
        }
        else if (nextProps.apiStatus !== this.props.apiStatus) {
            doAlert = nextProps.apiStatus.alert && nextProps.apiStatus.message !== null;
            alertType = nextProps.apiStatus.success ? 'success' : 'warning';
            title = I18n.t(`alert.GENERAL_API.title`);
            message = I18n.t(`alert.GENERAL_API.messages.${nextProps.apiStatus.message}`);
        }
        if (doAlert) {
            if (exception) {
                this.props.removeException(exception.id);
            }
            MessageBarManager.showAlert({
                alertType,
                title,
                message,
                durationToHide,
                position: 'bottom',
                onHide: () => { }
            });
        }
    }
    render() {
        return React.createElement(MessageBar, { ref: (c) => (this.alert = c) });
    }
}
const mapStateToDispatch = (dispatch) => ({
    signout: () => dispatch(signon.actions.signout()),
    removeException: (id) => dispatch(exceptions.actions.remove(id)),
    removeAll: () => dispatch(exceptions.actions.removeAll())
});
const mapStateToProps = (state) => ({
    lastException: getLatestException(state),
    apiStatus: state.api
});
export default connect(mapStateToProps, mapStateToDispatch)(Alert);
//# sourceMappingURL=index.js.map