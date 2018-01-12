import React from 'react';
import { connect } from 'react-redux';
import {
  BackHandler, KeyboardAvoidingView,
  Platform, View, TextInputProperties, Text,
} from 'react-native';
import I18n from 'I18n';
import { IInitialState } from 'services/reducers';
import * as signon from 'services/signon';
import {
  GSContainer,
  GSTabs, GSTabButton,
  GSButtonText, GSInput,
  GSForm, GSItem, GSLebel,
  GSNextButtons, GSTitle, GSDescription,
} from './index.styles';
import { GSHeader, GSBody, GSFooter } from 'styles/layout';
import NextButton from 'components/NextButton';
import { isEmpty } from 'lodash';
import { NavigationScreenProp } from 'react-navigation';
import { getActiveCourse } from 'services/selectors';
import { ICourse } from 'services/courses';

interface IState {
  signUpOrIn: signon.TSignon;
  focusOn: string | 'name' | 'email' | 'password';
}

interface IProps {
  signon: signon.ISignonState;
  submitSignon: (signUpOrIn: signon.TSignon) => void;
  captureSignon: (data: signon.ISignonFormData) => void;
  navigation: NavigationScreenProp<any, any>;
  activeCourse: ICourse;
}

class Signon extends React.Component<IProps, IState> {

  state = {
    signUpOrIn: 'signin',
    focusOn: null,
  };

  static navigationOptions = {
    header: null,
  };

  handleBackPress () {
    BackHandler.exitApp();
    return false;
  }

  componentDidMount () {

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
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
        <Text onPress={() => { this.setState({ focusOn: name }); }}>
          {I18n.t(`profile.form.${name}`)}
        </Text>
      </GSLebel>
      <GSInput ref={name}
        autoFocus={this.state.focusOn === name}
        {...props}
        onChangeText={this.setField(name)} />
    </GSItem>

  private renderForm = () =>
    <GSForm>
      {this.isSignup() && this.renderInput('name', { defaultValue: this.props.signon.item.name })}
      {this.renderInput('email')}
      {this.renderInput('password', { secureTextEntry: true })}
    </GSForm>

  private renderSubmitButton = () =>
    <NextButton
      onPress={this.submitSignon}
      text={I18n.t('profile.form.submit')} />

  private renderSkipButton = () =>
    <NextButton
      onPress={this.skipToNext}
      text={I18n.t('profile.form.skip')} restProps={{ primry: true }} />

  private renderTitle = () =>
    <GSTitle lang={'cl-ara'}>
      {I18n.t('profile.title')}
    </GSTitle>

  private renderDescription = () =>
    <GSDescription>
      {I18n.t('profile.description')}
    </GSDescription>

  render () {
    const ViewWrapper = Platform.OS === 'android' ? View : KeyboardAvoidingView;
    return (
      <GSContainer>
        <GSHeader>
          {this.renderTitle()}
          {this.renderDescription()}
          {this.renderTabs()}
        </GSHeader>
        <ViewWrapper style={{ flex: 1 }}>
          <GSBody>
            {this.renderForm()}
          </GSBody>
          <GSFooter>
            <GSNextButtons>
              {this.renderSubmitButton()}
              {this.renderSkipButton()}
            </GSNextButtons>
          </GSFooter>
        </ViewWrapper>
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
