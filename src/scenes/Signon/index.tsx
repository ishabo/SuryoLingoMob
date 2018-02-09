import React from 'react';
import { connect } from 'react-redux';
import {
  BackHandler, TextInputProperties,
  Text, Keyboard, Alert, View,
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

interface IState {
  signUpOrIn: signon.TSignon;
  focusOn: 'name' | 'email' | 'password';
  keyboardOn: boolean;
}

interface IProps {
  profile: profile.IProfile;
  signon: signon.ISignonState;
  submitSignon: (signUpOrIn: signon.TSignon) => void;
  captureSignon: (data: signon.ISignonFormData) => void;
  navigation: NavigationScreenProp<any, any>;
  activeCourse: ICourse;
}

class Signon extends React.Component<IProps, IState> {

  private keyboardDidShowListener;
  private keyboardDidHideListener;

  state = {
    signUpOrIn: 'signin',
    focusOn: null,
    keyboardOn: false,
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

  private alert () {
    Alert.alert(
      I18n.t('profile.form.title'),
      I18n.t('profile.form.description'),
      [{ text: I18n.t('general.close'), onPress: () => { } }],
      { cancelable: false },
    );
  }

  private setSignin = () => {
    this.setState({ signUpOrIn: 'signin' });
  }

  private setSignup = () => {
    this.setState({ signUpOrIn: 'signup' });
  }

  private isSignin = () => this.state.signUpOrIn === 'signin';
  private isSignup = () => this.state.signUpOrIn === 'signup';

  private setField = (field: string) => (value: string) => {
    const data = { ...this.props.signon.item };
    data[field] = value;
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
      this[field]._root.focus();
    } catch (error) {
      console.log(error);
    }
  }

  private renderTabs = () =>
    <GSTabs>
      <GSTabButton full primary={this.isSignin()} light={this.isSignup()}
        onPress={this.setSignin}>
        <GSButtonText color={this.isSignin() ? 'white' : 'black'}>
          {I18n.t('profile.form.signIn')}
        </GSButtonText>
      </GSTabButton>
      <GSTabButton full primary={this.isSignup()} light={this.isSignin()}
        onPress={this.setSignup}>
        <GSButtonText color={this.isSignup() ? 'white' : 'black'}>
          {I18n.t('profile.form.signUp')}
        </GSButtonText>
      </GSTabButton>
    </GSTabs>

  private hasError = (name: string): boolean => !isEmpty(this.props.signon.errors[name]);

  private renderInput = (name: string, props?: TextInputProperties, afterInput = null) => {
    const error = this.props.signon.errors[name];
    return <View>
      <GSItem inlineLabel error={this.hasError(name)}>
        <GSLebel>
          <Text onPress={this.focusOn(name)}>
            {I18n.t(`profile.form.fields.${name}`)}
          </Text>
        </GSLebel>
        <GSInput ref={c => this[name] = c}
          autoCapitalize="none"
          dir="ltr"
          autoFocus={this.state.focusOn === name}
          {...props}
          onChangeText={this.setField(name)} />
        {afterInput}
      </GSItem>
      <GSErrorText visible={this.hasError(name)}>
        {error === `${name}_invalid`
          && I18n.t(`profile.form.hints.${name}`)
          || I18n.t(`profile.form.errors.${error}`)}
      </GSErrorText>
    </View>;
  }

  private renderForm = () =>
    <GSForm>
      {this.isSignup() && this.renderInput('name', {
        defaultValue: this.props.signon.item.name,
        onSubmitEditing: this.focusOn('email'),
        returnKeyType: 'next',
      })}

      {this.renderInput(
        'email',
        { onSubmitEditing: this.focusOn('password'), returnKeyType: 'next' },
      )}

      {this.renderInput(
        'password',
        {
          secureTextEntry: true,
          onSubmitEditing: this.submitSignon,
          returnKeyType: 'go',
        })}

      {<GSNextButtons>
        {this.renderSubmitButton()}
        {this.renderSkipButton()}
      </GSNextButtons>}

      {this.renderRecoverPasswordLink()}

    </GSForm>

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
      text={I18n.t('profile.form.submit')}
      restProps={{ success: true, narrow: true }}
    />

  private renderSkipButton = () =>
    <NextButton
      onPress={this.skipToNext}
      text={I18n.t('profile.form.skip')}
      restProps={{ primry: true, narrow: true }} />

  private renderTitle = () =>
    <GSTitle lang={'cl-ara'}>
      {I18n.t('profile.form.title')} <GSIcon name="bulb" onPress={this.alert} />
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
});

const mapStateToDispatch = (state: IInitialState): Partial<IProps> => ({
  signon: state.signon,
  profile: state.profile,
  activeCourse: getActiveCourse(state),
});

export default connect(mapStateToDispatch, mapDispatchToProps)(Signon);
