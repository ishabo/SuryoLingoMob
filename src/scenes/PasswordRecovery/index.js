import * as React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { GSContainer } from './index.styles';
import I18n from 'I18n';
import * as signon from 'services/signon';
import { GSInput, GSForm } from 'styles/forms';
import { NextButton } from 'components';
import { GSTitle, GSAlert, GSCustomText } from 'styles/text';
import { Item } from 'native-base';
import { GSSeparator } from 'styles/layouts';
import { Analytics } from 'config/firebase';
class PasswordRecovery extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            email: ''
        };
        this.handleBackPress = () => {
            this.props.navigation.goBack();
            return true;
        };
        this.setEmail = (email) => {
            this.setState({ email: email.trim().toLocaleLowerCase() });
        };
    }
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.apiStatus !== this.props.apiStatus) {
            if (nextProps.apiStatus.success) {
                this.setState({ email: '' });
            }
        }
    }
    renderForm() {
        return (React.createElement(GSForm, null,
            React.createElement(GSTitle, { lang: 'cl-ara' }, I18n.t('passwordRecovery.title')),
            React.createElement(Item, { fixedLabel: true },
                React.createElement(GSCustomText, null, I18n.t(`passwordRecovery.form.fields.email`)),
                React.createElement(GSInput, { dir: "ltr", autoCapitalize: "none", autoFocus: true, returnKeyType: "go", value: this.state.email, onChangeText: this.setEmail })),
            React.createElement(GSSeparator, null),
            React.createElement(NextButton, { onPress: () => this.props.recoverPassword(this.state.email), text: I18n.t('passwordRecovery.form.submit'), restProps: { success: true, wide: true }, lang: 'cl-ara' })));
    }
    render() {
        const { success, message } = this.props.apiStatus;
        return (React.createElement(GSContainer, null,
            message && (React.createElement(GSAlert, { success: success, lang: 'cl-ara' }, I18n.t(`passwordRecovery.result.${success ? 'success' : 'failure'}`))),
            this.props.apiStatus.success || this.renderForm()));
    }
}
PasswordRecovery.navigationOptions = {
    title: I18n.t('passwordRecovery.title')
};
const mapDispatchToProps = (dispatch) => ({
    recoverPassword: (email) => dispatch(signon.actions.recoverPassword(email))
});
const mapStateToProps = (state) => ({
    apiStatus: state.api
});
export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
//# sourceMappingURL=index.js.map