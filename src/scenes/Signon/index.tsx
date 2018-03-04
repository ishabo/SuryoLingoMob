import React from 'react';
import { connect } from 'react-redux';
import {
  BackHandler, TextInputProperties,
  Keyboard, Alert, View,
} from 'react-native';
import I18n from 'I18n';
import { IInitialState } from 'services/reducers';
import * as signon from 'services/signon';
import * as profile from 'services/profile';
import {
  GSContainer, GSTabs, GSTabButton,
  GSForgotPassword,
  GSButtonText, GSInput,
  GSForm, GSItem, GSLebel,
  GSNextButtons, GSTitle,
  GSIcon, GSErrorText,
} from './index.styles';
import { GSCustomText } from 'styles/text';

import { GSHeader } from 'styles/layouts';
import { NextButton } from 'components';
import { isEmpty } from 'lodash';
import { NavigationScreenProp } from 'react-navigation';
import { getActiveCourse } from 'services/selectors';
import { ICourse } from 'services/courses';
import { exitApp } from 'helpers';

type TAlertSubject = 'signupReason' | 'signupName' | 'signupEmail' | 'signinReason' | 'signinEmail' | 'signinPassword';

interface IState {
  signUpOrIn: signon.TSignon;
  focusOn: 'name' | 'email' | 'password';
  keyboardOn: boolean;
  showPassword: boolean;
}

interface IProps {
  profile: profile.IProfile;
  signon: signon.ISignonState;
  submitSignon: (signUpOrIn: signon.TSignon) => void;
  captureSignon: (data: signon.ISignonFormData) => void;
  setError: (errors: signon.ISignonFormErrors) => void;
  navigation: NavigationScreenProp<any, any>;
  activeCourse: ICourse;
}

class Signon extends React.Component<IProps, IState> {

  private keyboardDidShowListener;
  private keyboardDidHideListener;

  state = {
    signUpOrIn: 'signup',
    focusOn: null,
    keyboardOn: false,
    showPassword: false,
  };

  static navigationOptions = {
    header: null,
  };

  handleBackPress () {
    exitApp();
    return false;
  }

  private keyboardDidHide = () => {
    this.setState({ keyboardOn: false });
  }

  private keyboardDidShow = () => {
    this.setState({ keyboardOn: true });
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  private showAlert (subject: TAlertSubject) {
    Alert.alert(
      I18n.t(`profile.alerts.${subject}.title`),
      I18n.t(`profile.alerts.${subject}.description`),
      [{ text: I18n.t('general.close'), onPress: () => { } }],
      { cancelable: false },
    );
  }

  private resetErrors = () => {
    this.props.setError(signon.reducers.initialState.errors);
  }

  private setSignin = () => {
    this.setState({ signUpOrIn: 'signin' }, this.resetErrors);
  }

  private setSignup = () => {
    this.setState({ signUpOrIn: 'signup' }, this.resetErrors);
  }

  private isSignin = () => this.state.signUpOrIn === 'signin';
  private isSignup = () => this.state.signUpOrIn === 'signup';

  private setField = (field: string) => (value: string) => {
    const data = { ...this.props.signon.item };
    data[field] = value.trim();
    if (field === 'email') {
      data[field] = data[field].toLowerCase();
    }
    this.props.captureSignon(data);
  }

  private skipToNext = () => {
    const { activeCourse, navigation, profile } = this.props;
    const routeName = activeCourse ? 'Skills' : 'Courses';
    navigation.navigate(routeName, profile);
  }

  private submitSignon = () => {
    this.props.submitSignon(this.state.signUpOrIn);
  }

  private focusOn = (field: string) => () => {
    try {
      this[field].getRenderedComponent().focus();
    } catch (error) {
      console.log(error);
    }
  }

  private renderTabs = () =>
    <GSTabs>
      <GSTabButton full primary={this.isSignup()} light={this.isSignin()}
        onPress={this.setSignup}>
        <GSButtonText large={this.isSignup()} color={this.isSignup() ? 'white' : 'gray'}>
          {I18n.t('profile.form.signUp')}
        </GSButtonText>
      </GSTabButton>
      <GSTabButton full primary={this.isSignin()} light={this.isSignup()}
        onPress={this.setSignin}>
        <GSButtonText large={this.isSignin()} color={this.isSignin() ? 'white' : 'gray'}>
          {I18n.t('profile.form.signIn')}
        </GSButtonText>
      </GSTabButton>
    </GSTabs>

  private hasError = (name: string): boolean => !isEmpty(this.getError(name));
  private getError = (name: string): string => this.props.signon.errors[name];

  private renderInput = (name: string, props?: TextInputProperties, afterInput = null) =>
    <View>
      <GSItem inlineLabel error={this.hasError(name)}>
        <GSLebel>
          <GSCustomText onPress={this.focusOn(name)}>
            {I18n.t(`profile.form.fields.${name}`)}
          </GSCustomText>
        </GSLebel>
        <GSInput ref={c => this[name] = c}
          dir="ltr"
          autoCapitalize={name === 'name' ? 'words' : 'none'}
          autoFocus={this.state.focusOn === name}
          {...props}
          onChangeText={this.setField(name)} />
        {afterInput}
      </GSItem>
      {this.hasError(name) && <GSErrorText>
        {I18n.t(`profile.form.errors.${this.getError(name)}`)}
      </GSErrorText>}
    </View>;

  private showPassword = () =>
    this.state.showPassword && this.isSignup()

  private toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword }, () => {
      this.focusOn('password');
    });
  }

  private renderForm = () =>
    <GSForm>

      {this.isSignup() && this.renderInput('name', {
        defaultValue: this.props.signon.item.name,
        onSubmitEditing: this.focusOn('email'),
        returnKeyType: 'next'
      }, this.renderBulb('signupName')
      )}

      {this.renderInput(
        'email',
        { onSubmitEditing: this.focusOn('password'), returnKeyType: 'next' },
        this.renderBulb(this.isSignin ? 'signinEmail' : 'signupEmail')
      )}

      {this.renderInput(
        'password',
        {
          secureTextEntry: !this.showPassword(),
          onSubmitEditing: this.submitSignon,
          returnKeyType: 'go',
        },
        this.renderShowPasswordIcon(),
      )}

      {<GSNextButtons>
        {this.renderSubmitButton()}
        {this.renderSkipButton()}
      </GSNextButtons>}

      {this.renderRecoverPasswordLink()}
    </GSForm>

  private renderShowPasswordIcon = () =>
    this.isSignup() && <GSIcon
      name={this.state.showPassword ? 'eye-off' : 'eye'}
      onPress={this.toggleShowPassword} /> || this.renderBulb('signinPassword')

  private renderRecoverPasswordLink = () =>
    this.isSignin() &&
    <GSForgotPassword onPress={() => this.props.navigation.navigate('PasswordRecovery')}>
      <GSCustomText>
        {I18n.t(`passwordRecovery.links.recoverPassword`)}
      </GSCustomText>
    </GSForgotPassword>

  private renderSubmitButton = () =>
    <NextButton
      onPress={this.submitSignon}
      text={I18n.t(`profile.form.submit.${this.isSignin() ? 'signin' : 'signup'}`)}
      restProps={{ success: true, narrow: true }}
      lang={'cl-ara'}
    />

  private renderSkipButton = () =>
    <NextButton
      onPress={this.skipToNext}
      text={I18n.t('profile.form.skip')}
      restProps={{ primry: true, narrow: true }}
      lang={'cl-ara'}
    />

  private renderBulb = (subject: TAlertSubject) => <GSIcon name="bulb"
    onPress={() => this.showAlert(subject)} />

  private renderTitle = () =>
    <GSTitle lang={'cl-ara'}>
      {I18n.t(`profile.form.${this.isSignin() ? 'signinTitle' : 'signupTitle'}`)}
      {' '}
      {this.renderBulb(this.isSignin() ? 'signinReason' : 'signupReason')}
    </GSTitle>

  render () {
    return (
      <GSContainer behavior="position">
        <GSHeader>
          {this.renderTitle()}
          {this.renderTabs()}
        </GSHeader>
        {this.renderForm()}
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  submitSignon: (signUpOrIn: signon.TSignon) =>
    dispatch(signon.actions.submitSignon(signUpOrIn)),
  captureSignon: (data: signon.ISignonFormData) =>
    dispatch(signon.actions.captureSignon(data)),
  setError: (errors: signon.ISignonFormErrors) => dispatch(signon.actions.setErrors(errors)),
});

const mapStateToDispatch = (state: IInitialState): Partial<IProps> => ({
  signon: state.signon,
  profile: state.profile,
  activeCourse: getActiveCourse(state),
});

export default connect(mapStateToDispatch, mapDispatchToProps)(Signon);
