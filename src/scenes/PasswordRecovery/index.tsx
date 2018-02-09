import React from 'react';
import { connect } from 'react-redux';
import { GSContainer } from './index.styles';
import { Dispatch } from 'redux';
import I18n from 'I18n';
import * as signon from 'services/signon';
import { GSInput, GSNextButtons, GSForm } from 'styles/forms';
import { NextButton } from 'components';
import { GSTitle, GSAlert, GSCustomText } from 'styles/text';
import { IInitialState } from 'services/reducers';
import { IApiStatus } from 'services/api/reducers';
import { Item } from 'native-base';
export interface IProps {
  recoverPassword: (email: string) => void;
  apiStatus: IApiStatus;
}

export interface IState {
  email: string;
}

class PasswordRecovery extends React.Component<IProps, IState> {

  state = {
    email: '',
  };

  static navigationOptions = {
    title: null,
  };

  componentWillReceiveProps (nextProps: Partial<IProps>) {
    if (nextProps.apiStatus !== this.props.apiStatus) {
      if (nextProps.apiStatus.success) {
        this.setState({ email: '' });
      }
    }
  }

  renderForm () {
    return (
      <GSForm>
        <GSTitle lang={'cl-ara'}>{I18n.t('passwordRecovery.title')}</GSTitle>
        <Item fixedLabel >
          <GSCustomText>{I18n.t(`passwordRecovery.form.fields.email`)}</GSCustomText>
          <GSInput
            dir="ltr"
            autoCapitalize="none"
            autoFocus={true}
            returnKeyType="go"
            value={this.state.email}
            onChangeText={(email: string) => this.setState({ email })} />
        </Item>
        <GSNextButtons>
          <NextButton
            onPress={() => this.props.recoverPassword(this.state.email)}
            text={I18n.t('passwordRecovery.form.submit')}
            restProps={{ primary: true, wide: true }}
          />
        </GSNextButtons>
      </GSForm>
    );
  }
  render () {
    const { success, message } = this.props.apiStatus;
    return (
      <GSContainer>
        {message && <GSAlert success={success} lang={'cl-ara'}>
          {I18n.t(`passwordRecovery.result.${success ? 'success' : 'failure'}`)}
        </GSAlert>}
        {this.props.apiStatus.success || this.renderForm()}
      </GSContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  recoverPassword: (email: string) => dispatch(signon.actions.recoverPassword(email)),
});

const mapStateToProps = (state: IInitialState) => ({
  apiStatus: state.api,
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
