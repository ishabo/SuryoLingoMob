import * as React from 'react';
import { connect } from 'react-redux';
import { BackHandler, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from 'styles/colors';
import I18n from 'I18n';
import * as signon from 'services/signon';
import { GSContainer, GSTabs, GSContent, GSTabButton, GSLink, GSButtonText, GSInput, GSForm, GSItem, GSLebel, GSTitle, GSIcon, GSErrorText, GSSeparator, GSSeperatorText, GSSeperatorLine, } from './index.styles';
import { GSCustomText } from 'styles/text';
import { NextButton, DrawerItem, Loading } from 'components';
import { isEmpty } from 'lodash';
import { getActiveCourse } from 'services/selectors';
import { exitApp, showAlert } from 'helpers';
import { FBLoginButton } from 'components';
import { Analytics } from 'config/firebase';
class Signon extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            signUpOrIn: 'signup',
            focusOn: null,
            keyboardOn: false,
            showPassword: false,
        };
        this.keyboardDidHide = () => {
            this.setState({ keyboardOn: false });
        };
        this.keyboardDidShow = () => {
            this.setState({ keyboardOn: true });
        };
        this.resetErrors = () => {
            this.props.setError(signon.reducers.initialState.errors);
        };
        this.setSignin = () => {
            this.setState({ signUpOrIn: 'signin' }, this.resetErrors);
        };
        this.setSignup = () => {
            this.setState({ signUpOrIn: 'signup' }, this.resetErrors);
        };
        this.isSignin = () => this.state.signUpOrIn === 'signin';
        this.isSignup = () => this.state.signUpOrIn === 'signup';
        this.setField = (field) => (value) => {
            const data = Object.assign({}, this.props.signon.item);
            data[field] = value.trim();
            if (field === 'email') {
                data[field] = data[field].toLowerCase();
            }
            this.props.captureSignon(data);
        };
        this.skipToNext = () => {
            Keyboard.dismiss();
            const { activeCourse, navigation, profile } = this.props;
            const routeName = activeCourse ? 'Skills' : 'Courses';
            navigation.navigate(routeName, profile);
        };
        this.submitSignon = () => {
            Keyboard.dismiss();
            this.resetErrors();
            this.props.captureSignon(Object.assign({}, this.props.signon.item, { viaFacebook: false }));
            this.props.submitSignon(this.state.signUpOrIn);
        };
        this.focusOn = (field) => () => {
            try {
                this[field].getRenderedComponent().focus();
            }
            catch (error) {
                console.log(error);
            }
        };
        this.renderTabs = () => (React.createElement(GSTabs, null,
            React.createElement(GSTabButton, { full: true, selected: this.isSignup(), onPress: this.setSignup },
                React.createElement(GSButtonText, { large: this.isSignup(), color: this.isSignup() ? 'white' : 'gray' }, I18n.t('signon.form.signUp'))),
            React.createElement(GSTabButton, { full: true, selected: this.isSignin(), onPress: this.setSignin },
                React.createElement(GSButtonText, { large: this.isSignin(), color: this.isSignin() ? 'white' : 'gray' }, I18n.t('signon.form.signIn')))));
        this.hasError = (name) => !isEmpty(this.getError(name));
        this.getError = (name) => this.props.signon.errors[name];
        this.renderInput = (name, props, afterInput = null) => (React.createElement(React.Fragment, null,
            React.createElement(GSItem, { inlineLabel: true, error: this.hasError(name) },
                React.createElement(GSLebel, null,
                    React.createElement(GSCustomText, { onPress: this.focusOn(name) }, I18n.t(`signon.form.fields.${name}`))),
                React.createElement(GSInput, Object.assign({ ref: c => (this[name] = c), dir: "ltr", autoCapitalize: name === 'name' ? 'words' : 'none', autoFocus: this.state.focusOn === name }, props, { onChangeText: this.setField(name) })),
                afterInput),
            this.hasError(name) && (React.createElement(GSErrorText, null, I18n.t(`signon.form.errors.${this.getError(name)}`)))));
        this.showPassword = () => this.state.showPassword && this.isSignup();
        this.toggleShowPassword = () => {
            this.setState({ showPassword: !this.state.showPassword }, () => {
                this.focusOn('password');
            });
        };
        this.renderForm = () => (React.createElement(GSForm, null,
            this.isSignup() &&
                this.renderInput('name', {
                    defaultValue: this.props.signon.item.name,
                    onSubmitEditing: this.focusOn('email'),
                    returnKeyType: 'next',
                }, this.renderBulb('signupName')),
            this.renderInput('email', {
                defaultValue: this.props.signon.item.email,
                onSubmitEditing: this.focusOn('password'),
                returnKeyType: 'next',
            }, this.renderBulb(this.isSignin ? 'signinEmail' : 'signupEmail')),
            this.renderInput('password', {
                secureTextEntry: !this.showPassword(),
                onSubmitEditing: this.submitSignon,
                returnKeyType: 'go',
            }, this.renderShowPasswordIcon()),
            this.renderRecoverPasswordLink()));
        this.renderShowPasswordIcon = () => (this.isSignup() && (React.createElement(GSIcon, { name: this.state.showPassword ? 'eye-off' : 'eye', onPress: this.toggleShowPassword }))) ||
            this.renderBulb('signinPassword');
        this.renderRecoverPasswordLink = () => this.isSignin() && (React.createElement(GSLink, { onPress: () => this.props.navigation.navigate('PasswordRecovery') },
            React.createElement(GSCustomText, null, I18n.t('passwordRecovery.links.recoverPassword'))));
        this.renderButtons = () => {
            return (React.createElement(React.Fragment, null,
                React.createElement(GSSeparator, { margin: 4 }),
                React.createElement(NextButton, { onPress: this.submitSignon, text: I18n.t(`signon.form.submit.${this.isSignin() ? 'signin' : 'signup'}`), lang: 'cl-ara' }),
                React.createElement(GSLink, { onPress: this.skipToNext },
                    React.createElement(GSCustomText, null, I18n.t('signon.form.skip')))));
        };
        this.renderBulb = (subject) => (React.createElement(GSIcon, { name: "bulb", onPress: () => showAlert('signon', subject) }));
        this.renderTitle = () => (React.createElement(GSTitle, { lang: 'cl-ara' },
            I18n.t(`signon.form.${this.isSignin() ? 'signinTitle' : 'signupTitle'}`),
            ' ',
            this.renderBulb(this.isSignin() ? 'signinReason' : 'signupReason')));
    }
    handleBackPress() {
        exitApp();
        return false;
    }
    componentDidMount() {
        Analytics.setCurrentScreen(this.constructor.name);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentDidUpdate(prevProps) {
        if (this.props.signon.errors !== prevProps.signon.errors) {
            if (this.props.signon.errors.facebook) {
                showAlert('signon', this.props.signon.errors.facebook);
            }
        }
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    render() {
        return (React.createElement(KeyboardAwareScrollView, { style: { backgroundColor: Colors.white } },
            React.createElement(GSContainer, null,
                this.renderTitle(),
                React.createElement(GSContent, null,
                    this.renderTabs(),
                    React.createElement(FBLoginButton, { signon: this.state.signUpOrIn }),
                    React.createElement(GSSeparator, { margin: 10 },
                        React.createElement(GSSeperatorLine, null),
                        React.createElement(GSSeperatorText, null, I18n.t('signon.form.orElse'))),
                    this.renderForm(),
                    this.renderButtons())),
            React.createElement(Loading, null)));
    }
}
Signon.navigationOptions = {
    title: I18n.t('signon.title'),
    header: null,
    drawerLabel: React.createElement(DrawerItem, { label: I18n.t('signon.title'), icon: "signon" }),
};
const mapDispatchToProps = (dispatch) => ({
    submitSignon: (signUpOrIn) => dispatch(signon.actions.submitSignon(signUpOrIn)),
    captureSignon: (data) => dispatch(signon.actions.captureSignon(data)),
    setError: (errors) => dispatch(signon.actions.setErrors(errors)),
});
const mapStateToDispatch = (state) => ({
    signon: state.signon,
    profile: state.profile,
    activeCourse: getActiveCourse(state),
});
export default connect(mapStateToDispatch, mapDispatchToProps)(Signon);
//# sourceMappingURL=index.js.map