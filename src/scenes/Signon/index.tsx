import React from 'react';
import { connect } from 'react-redux';
import { BackHandler, TextInputProperties, Text, Keyboard, Alert } from 'react-native';
import I18n from 'I18n';
import { IInitialState } from 'services/reducers';
import * as signon from 'services/signon';
import {
  GSContainer,
  GSTabs, GSTabButton,
  GSButtonText, GSInput,
  GSForm, GSItem, GSLebel,
  GSNextButtons, GSTitle,
  GSIcon,
} from './index.styles';
import { GSHeader } from 'styles/layout';
import NextButton from 'components/NextButton';
import { isEmpty } from 'lodash';
import { NavigationScreenProp } from 'react-navigation';
import { getActiveCourse } from 'services/selectors';
import { ICourse } from 'services/courses';
import { exitApp } from 'helpers';

interface IState {
  signUpOrIn: signon.TSignon;
  focusOn: string | 'name' | 'email' | 'password';
  keyboardOn: boolean;
}

interface IProps {
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
      I18n.t('profile.title'),
      I18n.t('profile.description'),
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
    const { activeCourse, navigation } = this.props;
    const routeName = activeCourse ? 'Skills' : 'Courses';
    navigation.navigate(routeName);
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
          {I18n.t('profile.signIn')}
        </GSButtonText>
      </GSTabButton>
      <GSTabButton full primary={this.isSignup()} light={this.isSignin()}
        onPress={this.setSignup}>
        <GSButtonText color={this.isSignup() ? 'white' : 'black'}>
          {I18n.t('profile.signUp')}
        </GSButtonText>
      </GSTabButton>
    </GSTabs>

  private renderInput = (name: string, props?: TextInputProperties) =>
    <GSItem inlineLabel error={!isEmpty(this.props.signon.errors[name])}>
      <GSLebel>
        <Text onPress={this.focusOn(name)}>
          {I18n.t(`profile.form.${name}`)}
        </Text>
      </GSLebel>
      <GSInput ref={c => this[name] = c}
        autoFocus={this.state.focusOn === name}
        {...props}
        onChangeText={this.setField(name)} />
    </GSItem>

  private renderForm = () =>
    <GSForm>
      {this.isSignup() && this.renderInput('name', {
        defaultValue: this.props.signon.item.name,
        onSubmitEditing: this.focusOn('email'),
        returnKeyType: 'next',
      })}

      {this.renderInput('email', {
        onSubmitEditing: this.focusOn('password'),
        returnKeyType: 'next',
      })}

      {this.renderInput('password', {
        secureTextEntry: true,
        onSubmitEditing: this.submitSignon,
        returnKeyType: 'go',
      })}

      {<GSNextButtons>
        {this.renderSubmitButton()}
        {this.renderSkipButton()}
      </GSNextButtons>}
    </GSForm>

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
      {I18n.t('profile.title')} <GSIcon name="bulb" onPress={this.alert} />
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

const mapStateToDispatch = (state: IInitialState) => ({
  signon: state.signon,
  activeCourse: getActiveCourse(state),
});

export default connect(mapStateToDispatch, mapDispatchToProps)(Signon);
