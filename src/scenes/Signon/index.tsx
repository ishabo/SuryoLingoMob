import * as React from 'react';
import { connect } from 'react-redux';
import { BackHandler, TextInputProperties, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '@sl/styles/colors';
import I18n from '@sl/i18n';
import { IInitialState } from '@sl/services/reducers';
import * as signon from '@sl/services/signon';
import * as profile from '@sl/services/profile';

import {
  GSContainer,
  GSTabs,
  GSContent,
  GSTabButton,
  GSLink,
  GSButtonText,
  GSInput,
  GSForm,
  GSItem,
  GSLebel,
  GSTitle,
  GSIcon,
  GSErrorText,
  GSSeparator,
  GSSeperatorText,
  GSSeperatorLine
} from './index.styles';

import { GSCustomText } from '@sl/styles/text';
import { FBLoginButton, NextButton, DrawerItem, Loading } from '@sl/components';
import { isEmpty } from 'lodash';
import { NavigationScreenProp } from 'react-navigation';
import { getActiveCourse } from '@sl/services/selectors';
import { ICourse } from '@sl/services/courses';
import { exitApp, TAlertSubject, showAlert } from '@sl/helpers';
import { Dispatch } from 'redux';
import { Analytics } from '@sl/config/firebase';

interface IState {
  signUpOrIn: signon.TSignonType;
  focusOn: 'name' | 'email' | 'password';
  keyboardOn: boolean;
  showPassword: boolean;
}

interface IProps {
  profile: profile.IProfile;
  signon: signon.ISignonState;
  submitSignon: (signUpOrIn: signon.TSignonType) => void;
  captureSignon: (data: signon.ISignonFormData) => void;
  setError: (errors: signon.ISignonFormErrors) => void;
  navigation: NavigationScreenProp<any, any>;
  activeCourse: ICourse;
}

class Signon extends React.Component<IProps, IState> {
  private keyboardDidShowListener;
  private keyboardDidHideListener;

  static navigationOptions = {
    title: I18n.t('signon.title'),
    header: null,
    drawerLabel: <DrawerItem label={I18n.t('signon.title')} icon="signon" />
  };

  state = {
    signUpOrIn: 'signup',
    focusOn: null,
    keyboardOn: false,
    showPassword: false
  };

  handleBackPress() {
    exitApp();
    return false;
  }

  private keyboardDidHide = () => {
    this.setState({ keyboardOn: false });
  };

  private keyboardDidShow = () => {
    this.setState({ keyboardOn: true });
  };

  componentDidMount() {
    Analytics.setCurrentScreen(this.constructor.name);
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidUpdate(prevProps: Partial<IProps>) {
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

  private resetErrors = () => {
    this.props.setError(signon.reducers.initialState.errors);
  };

  private setSignin = () => {
    this.setState({ signUpOrIn: 'signin' }, this.resetErrors);
  };

  private setSignup = () => {
    this.setState({ signUpOrIn: 'signup' }, this.resetErrors);
  };

  private isSignin = () => this.state.signUpOrIn === 'signin';
  private isSignup = () => this.state.signUpOrIn === 'signup';

  private setField = (field: string) => (value: string) => {
    const data = { ...this.props.signon.item };
    data[field] = value.trim();
    if (field === 'email') {
      data[field] = data[field].toLowerCase();
    }
    this.props.captureSignon(data);
  };

  private skipToNext = () => {
    Keyboard.dismiss();
    const { activeCourse, navigation, profile } = this.props;
    const routeName = activeCourse ? 'Skills' : 'Courses';
    navigation.navigate(routeName, profile);
  };

  private submitSignon = () => {
    Keyboard.dismiss();
    this.resetErrors();
    this.props.captureSignon({ ...this.props.signon.item, viaFacebook: false });
    this.props.submitSignon(this.state.signUpOrIn);
  };

  private focusOn = (field: string) => () => {
    try {
      this[field].getRenderedComponent().focus();
    } catch (error) {
      console.log(error);
    }
  };

  private renderTabs = () => (
    <GSTabs>
      <GSTabButton full selected={this.isSignup()} onPress={this.setSignup}>
        <GSButtonText
          large={this.isSignup()}
          color={this.isSignup() ? 'white' : 'gray'}
        >
          {I18n.t('signon.form.signUp')}
        </GSButtonText>
      </GSTabButton>
      <GSTabButton full selected={this.isSignin()} onPress={this.setSignin}>
        <GSButtonText
          large={this.isSignin()}
          color={this.isSignin() ? 'white' : 'gray'}
        >
          {I18n.t('signon.form.signIn')}
        </GSButtonText>
      </GSTabButton>
    </GSTabs>
  );

  private hasError = (name: string): boolean => !isEmpty(this.getError(name));
  private getError = (name: string): string => this.props.signon.errors[name];

  private renderInput = (
    name: string,
    props?: TextInputProperties,
    afterInput = null
  ) => (
    <>
      <GSItem inlineLabel error={this.hasError(name)}>
        <GSLebel>
          <GSCustomText onPress={this.focusOn(name)}>
            {I18n.t(`signon.form.fields.${name}`)}
          </GSCustomText>
        </GSLebel>
        <GSInput
          ref={c => (this[name] = c)}
          dir="ltr"
          autoCapitalize={name === 'name' ? 'words' : 'none'}
          autoFocus={this.state.focusOn === name}
          {...props}
          onChangeText={this.setField(name)}
        />
        {afterInput}
      </GSItem>
      {this.hasError(name) && (
        <GSErrorText>
          {I18n.t(`signon.form.errors.${this.getError(name)}`)}
        </GSErrorText>
      )}
    </>
  );

  private showPassword = () => this.state.showPassword && this.isSignup();

  private toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword }, () => {
      this.focusOn('password');
    });
  };

  private renderForm = () => (
    <GSForm>
      {this.isSignup() &&
        this.renderInput(
          'name',
          {
            defaultValue: this.props.signon.item.name,
            onSubmitEditing: this.focusOn('email'),
            returnKeyType: 'next'
          },
          this.renderBulb('signupName')
        )}

      {this.renderInput(
        'email',
        {
          defaultValue: this.props.signon.item.email,
          onSubmitEditing: this.focusOn('password'),
          returnKeyType: 'next'
        },
        this.renderBulb(this.isSignin ? 'signinEmail' : 'signupEmail')
      )}

      {this.renderInput(
        'password',
        {
          secureTextEntry: !this.showPassword(),
          onSubmitEditing: this.submitSignon,
          returnKeyType: 'go'
        },
        this.renderShowPasswordIcon()
      )}
      {this.renderRecoverPasswordLink()}
    </GSForm>
  );

  private renderShowPasswordIcon = () =>
    (this.isSignup() && (
      <GSIcon
        name={this.state.showPassword ? 'eye-off' : 'eye'}
        onPress={this.toggleShowPassword}
      />
    )) ||
    this.renderBulb('signinPassword');

  private renderRecoverPasswordLink = () =>
    this.isSignin() && (
      <GSLink
        onPress={() => this.props.navigation.navigate('PasswordRecovery')}
      >
        <GSCustomText>
          {I18n.t('passwordRecovery.links.recoverPassword')}
        </GSCustomText>
      </GSLink>
    );

  private renderButtons = () => {
    return (
      <>
        <GSSeparator margin={4} />
        <NextButton
          onPress={this.submitSignon}
          text={I18n.t(
            `signon.form.submit.${this.isSignin() ? 'signin' : 'signup'}`
          )}
          lang={'cl-ara'}
        />

        <GSLink onPress={this.skipToNext}>
          <GSCustomText>{I18n.t('signon.form.skip')}</GSCustomText>
        </GSLink>
      </>
    );
  };

  private renderBulb = (subject: TAlertSubject) => (
    <GSIcon name="bulb" onPress={() => showAlert('signon', subject)} />
  );

  private renderTitle = () => (
    <GSTitle lang={'cl-ara'}>
      {I18n.t(`signon.form.${this.isSignin() ? 'signinTitle' : 'signupTitle'}`)}{' '}
      {this.renderBulb(this.isSignin() ? 'signinReason' : 'signupReason')}
    </GSTitle>
  );

  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: Colors.white }}>
        <GSContainer>
          {this.renderTitle()}
          <GSContent>
            {this.renderTabs()}

            <FBLoginButton signon={this.state.signUpOrIn} />

            <GSSeparator margin={10}>
              <GSSeperatorLine />
              <GSSeperatorText>{I18n.t('signon.form.orElse')}</GSSeperatorText>
            </GSSeparator>

            {this.renderForm()}
            {this.renderButtons()}
          </GSContent>
        </GSContainer>
        <Loading />
      </KeyboardAwareScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  submitSignon: (signUpOrIn: signon.TSignonType) =>
    dispatch(signon.actions.submitSignon(signUpOrIn)),
  captureSignon: (data: signon.ISignonFormData) =>
    dispatch(signon.actions.captureSignon(data)),
  setError: (errors: signon.ISignonFormErrors) =>
    dispatch(signon.actions.setErrors(errors))
});

const mapStateToDispatch = (state: IInitialState): Partial<IProps> => ({
  signon: state.signon,
  profile: state.profile,
  activeCourse: getActiveCourse(state)
});

export default connect(
  mapStateToDispatch,
  mapDispatchToProps
)(Signon);
