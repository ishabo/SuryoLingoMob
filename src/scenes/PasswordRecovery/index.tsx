import * as React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { GSContainer } from './index.styles';
import { Dispatch } from 'redux';
import I18n from '@sl/i18n';
import * as signon from '@sl/services/signon';
import { GSInput, GSForm } from '@sl/styles/forms';
import { NextButton } from '@sl/components';
import { GSTitle, GSAlert, GSCustomText } from '@sl/styles/text';
import { IInitialState } from '@sl/services/reducers';
import { IApiStatus } from '@sl/services/api/reducers';
import { Item } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { GSSeparator } from '@sl/styles/layouts';
import { Analytics } from '@sl/config/firebase';

export interface IProps {
  recoverPassword: (email: string) => void;
  apiStatus: IApiStatus;
  navigation: NavigationScreenProp<any, any>;
}

export interface IState {
  email: string;
}

class PasswordRecovery extends React.Component<IProps, IState> {
  state = {
    email: ''
  };

  static navigationOptions = {
    title: I18n.t('passwordRecovery.title')
  };

  componentDidMount() {
    Analytics.setCurrentScreen(this.constructor.name);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }

  setEmail = (email: string) => {
    this.setState({ email: email.trim().toLocaleLowerCase() });
  }

  static getDerivedStateFromProps(props) {
    if (props.apiStatus.success) {
      return { email: '' };
    }
    return {};
  }

  renderForm() {
    return (
      <GSForm>
        <GSTitle lang={'cl-ara'}>{I18n.t('passwordRecovery.title')}</GSTitle>
        <Item fixedLabel>
          <GSCustomText>{I18n.t('passwordRecovery.form.fields.email')}</GSCustomText>
          <GSInput
            dir="ltr"
            autoCapitalize="none"
            autoFocus={true}
            returnKeyType="go"
            value={this.state.email}
            onChangeText={this.setEmail}
          />
        </Item>
        <GSSeparator />
        <NextButton
          onPress={() => this.props.recoverPassword(this.state.email)}
          text={I18n.t('passwordRecovery.form.submit')}
          restProps={{ success: true, wide: true }}
          lang={'cl-ara'}
        />
      </GSForm>
    );
  }
  render() {
    const { success, message } = this.props.apiStatus;
    return (
      <GSContainer>
        {message && (
          <GSAlert success={success} lang={'cl-ara'}>
            {I18n.t(`passwordRecovery.result.${success ? 'success' : 'failure'}`)}
          </GSAlert>
        )}
        {this.props.apiStatus.success || this.renderForm()}
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  recoverPassword: (email: string) => dispatch(signon.actions.recoverPassword(email))
});

const mapStateToProps = (state: IInitialState) => ({
  apiStatus: state.api
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecovery);
